package main

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"gorm.io/gorm"
)

var ErrDuplicateCommission = errors.New("duplicate commission")
var ErrCommissionNotFound = errors.New("commission not found")
var ErrCommissionAlreadyCompleted = errors.New("commission already completed")
var ErrSomeDailiesNotComplete = errors.New("some dailies not complete")

type Commission struct {
	ID          uint     `json:"id"`
	Description string   `json:"description"`
	Realm       string   `json:"realm"`
	Completed   bool     `json:"completed"`
	Rewards     []Reward `json:"rewards"`
}

type CommissionService struct {
	RewardService *RewardService
}

func (s *CommissionService) MarkTodayAsClaimed() error {
	dueDate := ConvertDateMsToDueDate(time.Now().Unix())
	historyDb, err := InitDb(&HistoryEntity{})
	if err != nil {
		return err
	}
	var histories []HistoryEntity
	findHistoryTx := historyDb.Where("due_date = ?", dueDate).Find(&histories)
	if findHistoryTx.Error != nil {
		return findHistoryTx.Error
	}
	for _, history := range histories {
		if !history.Completed {
			return ErrSomeDailiesNotComplete
		}
	}
	return s.RewardService.ClaimBonusRewards()
}

func (s *CommissionService) LoadCommissionsForDate(dateMs int64) ([]Commission, error) {
	dueDate := ConvertDateMsToDueDate(dateMs)
	fmt.Printf("Loading commissions for date: %v\n", dueDate)
	var commissions []CommissionEntity
	commissionDb, err := InitDb(&CommissionEntity{})
	if err != nil {
		fmt.Printf("Error initializing task db: %v\n", err)
		return nil, err
	}
	commissionDb.Find(&commissions)

	historyDb, err := InitDb(&HistoryEntity{})
	if err != nil {
		fmt.Printf("Error initializing history db: %v\n", err)
		return nil, err
	}

	result := make([]Commission, len(commissions))

	for i, commission := range commissions {
		var history HistoryEntity
		findHistoryTx := historyDb.Where(
			"commission_id = ? AND due_date = ?",
			commission.ID,
			dueDate).First(&history)
		if findHistoryTx.Error != nil {
			if findHistoryTx.Error == gorm.ErrRecordNotFound {
				history = HistoryEntity{
					Completed: false,
				}
			} else {
				return nil, findHistoryTx.Error
			}
		}
		rewards, err := s.RewardService.GetRewardsFromRewardsString(commission.Rewards)
		if err != nil {
			return nil, err
		}
		result[i] = Commission{
			ID:          commission.ID,
			Description: commission.Description,
			Realm:       commission.Realm,
			Completed:   history.Completed,
			Rewards:     rewards,
		}
	}
	return result, nil
}

func (s *CommissionService) CreateNewCommission(
	description string,
	realm string,
	rewards []Reward) (Commission, error) {
	taskDb, err := InitDb(&CommissionEntity{})
	if err != nil {
		fmt.Printf("Error initializing task db: %v\n", err)
		return Commission{}, err
	}

	rewardIds, err := s.RewardService.GetRewardIdsFromRewards(rewards)
	if err != nil {
		return Commission{}, err
	}
	rewardsJson := strings.Join(rewardIds, ",")

	taskEntity := CommissionEntity{
		Description: description,
		Realm:       realm,
		Rewards:     rewardsJson,
	}
	createTaskTx := taskDb.Create(&taskEntity)
	if createTaskTx.Error != nil {
		return Commission{}, createTaskTx.Error
	}

	return Commission{
		ID:          taskEntity.ID,
		Description: taskEntity.Description,
		Completed:   false,
		Rewards:     rewards,
		Realm:       taskEntity.Realm,
	}, nil
}

func (s *CommissionService) CompleteCommission(commissionId uint) error {
	dueDate := ConvertDateMsToDueDate(time.Now().Unix())
	historyDb, err := InitDb(&HistoryEntity{})
	if err != nil {
		return err
	}
	var history HistoryEntity
	tx := historyDb.Where("commission_id = ? AND due_date = ?", commissionId, dueDate).First(&history)
	if tx.Error != nil {
		if tx.Error == gorm.ErrRecordNotFound {
			historyDb.Create(&HistoryEntity{
				CommissionID: commissionId,
				Completed:    false,
				DueDate:      dueDate,
			})
		} else {
			return tx.Error
		}
	}
	history.Completed = !history.Completed
	tx = historyDb.Save(&history)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}

func (s *CommissionService) DeleteCommission(commissionId int) error {
	taskDb, err := InitDb(&CommissionEntity{})
	if err != nil {
		return err
	}
	historyDb, err := InitDb(&HistoryEntity{})
	if err != nil {
		return err
	}
	var task CommissionEntity
	tx := taskDb.Where("id = ?", commissionId).First(&task)
	if tx.Error != nil {
		return tx.Error
	}
	tx = taskDb.Delete(&task)
	if tx.Error != nil {
		return tx.Error
	}
	var history HistoryEntity
	tx = historyDb.Where("commission_id = ?", commissionId).First(&history)
	if tx.Error != nil {
		return tx.Error
	}
	tx = historyDb.Delete(&history)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}

func (s *CommissionService) DeleteHistories() error {
	historyDb, err := InitDb(&HistoryEntity{})
	if err != nil {
		return err
	}
	tx := historyDb.Where("id > ?", 0).Delete(&HistoryEntity{})
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}
