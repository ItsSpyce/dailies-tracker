package main

import (
	"errors"
	"fmt"
	"strings"
	"time"
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
	ClaimsService *ClaimsService
}

func (s *CommissionService) LoadCommissionsForDate(dueDate time.Time) ([]Commission, error) {
	fmt.Printf("Loading commissions for date: %v\n", dueDate)
	var commissions []CommissionEntity
	commissionDb, err := InitDb(&CommissionEntity{})
	if err != nil {
		fmt.Printf("Error initializing task db: %v\n", err)
		return nil, err
	}
	commissionDb.Find(&commissions)

	result := make([]Commission, len(commissions))

	for i, commission := range commissions {
		isCommissionClaimed, err := s.ClaimsService.IsCommissionClaimed(commission.ID, dueDate)
		rewards, err := s.RewardService.GetRewardsFromRewardsString(commission.Rewards)
		if err != nil {
			return nil, err
		}
		result[i] = Commission{
			ID:          commission.ID,
			Description: commission.Description,
			Realm:       commission.Realm,
			Completed:   isCommissionClaimed,
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

func (s *CommissionService) DeleteCommission(commissionId int) error {
	taskDb, err := InitDb(&CommissionEntity{})
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
	return nil
}

func (s *CommissionService) GetAvailableRealms() ([]string, error) {
	realmsDb, err := InitDb(&RealmEntity{})
	if err != nil {
		return nil, err
	}
	var realms []string
	tx := realmsDb.Model(&RealmEntity{}).Select("name").Find(&realms)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return realms, nil
}

func (s *CommissionService) AddRealm(name string) error {
	realmsDb, err := InitDb(&RealmEntity{})
	if err != nil {
		return err
	}
	realm := RealmEntity{Name: name}
	tx := realmsDb.Create(&realm)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}

func (s *CommissionService) AddRealms(names []string) error {
	realmsDb, err := InitDb(&RealmEntity{})
	if err != nil {
		return err
	}
	for _, name := range names {
		realm := RealmEntity{Name: name}
		tx := realmsDb.Create(&realm)
		if tx.Error != nil {
			return tx.Error
		}
	}
	return nil
}

func (s *CommissionService) DeleteRealm(name string) error {
	realmsDb, err := InitDb(&RealmEntity{})
	if err != nil {
		return err
	}
	var realm RealmEntity
	tx := realmsDb.Where("name = ?", name).First(&realm)
	if tx.Error != nil {
		return tx.Error
	}
	tx = realmsDb.Delete(&realm)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}
