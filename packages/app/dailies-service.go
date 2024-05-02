package main

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

var DuplicateCommission = errors.New("duplicate commission")
var CommissionNotFound = errors.New("commission not found")
var CommissionAlreadyCompleted = errors.New("commission already completed")

type Commission struct {
	ID          int    `json:"id"`
	Description string `json:"description"`
	Realm       string `json:"realm"`
	Completed   bool   `json:"completed"`
	Rewards     string `json:"rewards"`
}

type DailiesService struct {
}

func (s *DailiesService) LoadCommissionsForDate(dateMs int64) ([]Commission, error) {
	dueDate := convertDateMsToDueDate(dateMs)
	var tasks []TaskEntity
	taskDb, err := InitDb(TaskEntity{})
	if err != nil {
		return nil, err
	}
	taskDb.Where("deleted = ?", false).Find(&tasks)

	historyDb, err := InitDb(HistoryEntity{})
	if err != nil {
		return nil, err
	}

	commissions := make([]Commission, len(tasks))
	for i, task := range tasks {
		var historyForTask HistoryEntity
		tx := historyDb.Where("task_id = ? AND due_date < ?", task.ID, dueDate).First(&historyForTask)
		if tx.Error != nil {
			if tx.Error == gorm.ErrRecordNotFound {
				historyDb.Create(&HistoryEntity{
					TaskId:    task.ID,
					DueDate:   dateMs,
					Completed: false,
					Deleted:   false,
				})
				commissions[i] = Commission{
					ID:          task.ID,
					Description: task.Description,
					Rewards:     task.Rewards,
					Realm:       task.Realm,
				}
			}
			return nil, tx.Error
		} else {
			commissions[i] = Commission{
				ID:          task.ID,
				Description: task.Description,
				Completed:   historyForTask.Completed,
				Rewards:     task.Rewards,
				Realm:       task.Realm,
			}
		}
	}
	return commissions, nil
}

func (s *DailiesService) CreateNewCommission(description string, realm string, rewardsJson string) (Commission, error) {
	now := time.Now()
	taskDb, err := InitDb(TaskEntity{})
	if err != nil {
		return Commission{}, err
	}
	historyDb, err := InitDb(HistoryEntity{})
	if err != nil {
		return Commission{}, err
	}
	taskEntity := TaskEntity{
		Description: description,
		CreatedAt:   now.Unix(),
		Deleted:     false,
		Realm:       realm,
		Rewards:     rewardsJson,
	}
	taskTx := taskDb.Create(&taskEntity)
	if taskTx.Error != nil {
		return Commission{}, taskTx.Error
	}
	historyTx := historyDb.Create(&HistoryEntity{
		TaskId:    taskEntity.ID,
		Completed: false,
		DueDate:   convertDateMsToDueDate(now.Unix()),
		Deleted:   false,
	})
	if historyTx.Error != nil {
		return Commission{}, historyTx.Error
	}
	return Commission{
		ID:          taskEntity.ID,
		Description: taskEntity.Description,
		Completed:   false,
		Rewards:     taskEntity.Rewards,
		Realm:       taskEntity.Realm,
	}, nil
}

func (s *DailiesService) CompleteCommission(commissionId int) error {
	historyDb, err := InitDb(HistoryEntity{})
	if err != nil {
		return err
	}
	var history HistoryEntity
	tx := historyDb.Where("task_id = ?", commissionId).First(&history)
	if tx.Error != nil {
		return tx.Error
	}
	history.Completed = !history.Completed
	tx = historyDb.Save(&history)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}

func (s *DailiesService) DeleteCommission(commissionId int) error {
	taskDb, err := InitDb(TaskEntity{})
	if err != nil {
		return err
	}
	historyDb, err := InitDb(HistoryEntity{})
	if err != nil {
		return err
	}
	var task TaskEntity
	tx := taskDb.Where("id = ?", commissionId).First(&task)
	if tx.Error != nil {
		return tx.Error
	}
	task.Deleted = true
	tx = taskDb.Save(&task)
	if tx.Error != nil {
		return tx.Error
	}
	var history HistoryEntity
	tx = historyDb.Where("task_id = ?", commissionId).First(&history)
	if tx.Error != nil {
		return tx.Error
	}
	history.Deleted = true
	tx = historyDb.Save(&history)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}

func convertDateMsToDueDate(dateMs int64) int64 {
	dateMsAsDate := time.Unix(dateMs, 0)
	return time.Date(
		dateMsAsDate.Year(),
		dateMsAsDate.Month(),
		dateMsAsDate.Day()+1,
		0, 0, 0, 0, time.UTC).Unix()
}
