package main

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"gorm.io/gorm"
)

type ClaimsService struct {
	RewardService     *RewardService
	CommissionService *CommissionService
}

const dailyBonusRewardCount = 4

var ErrCommissionAlreadyClaimed = errors.New("commission already claimed")
var ErrDailyBonusAlreadyClaimed = errors.New("daily bonus already claimed")

func (s *ClaimsService) SetupClaimsForToday() ([]Reward, error) {
	dueDate := GetDueDateForTime(time.Now())

	commissions, err := s.CommissionService.LoadCommissionsForDate(time.Now())
	if err != nil {
		return nil, err
	}
	commissionClaimsDb, err := InitDb(&CommissionClaimEntity{})
	if err != nil {
		return nil, err
	}
	var todaysCommissionClaims []CommissionClaimEntity
	commissionClaimsDb.Where("due_date = ?", dueDate).Find(&todaysCommissionClaims)
	if len(todaysCommissionClaims) == 0 {
		// haven't setup the commission claims for today
		for _, commission := range commissions {
			claim := CommissionClaimEntity{
				CommissionID: commission.ID,
				Claimed:      false,
				DueDate:      GetDueDateForTime(time.Now()),
			}
			commissionClaimsDb.Create(&claim)
		}
	}

	rewards, err := s.RewardService.GetAvailableRewards()
	if err != nil {
		return nil, err
	}
	bonusClaimsDb, err := InitDb(&BonusClaimEntity{})
	if err != nil {
		return nil, err
	}
	var todaysBonusClaim BonusClaimEntity
	bonusClaimsDb.Where("due_date = ?", dueDate).First(&todaysBonusClaim)
	if todaysBonusClaim.ID == 0 {
		// haven't setup the bonus claims for today
		bonusRewards := rewards[:dailyBonusRewardCount]
		for _, reward := range bonusRewards {
			todaysBonusClaim.Rewards += fmt.Sprintf("%d,", reward.ID)
			todaysBonusClaim.RewardCounts += fmt.Sprintf("%d,", reward.Count*5)
		}
		todaysBonusClaim.Rewards = strings.TrimSuffix(todaysBonusClaim.Rewards, ",")
		todaysBonusClaim.RewardCounts = strings.TrimSuffix(todaysBonusClaim.RewardCounts, ",")
		todaysBonusClaim.DueDate = GetDueDateForTime(time.Now())
		todaysBonusClaim.Claimed = false
		bonusClaimsDb.Create(&todaysBonusClaim)
	}

	return s.getRewardsFromBonusClaim(&todaysBonusClaim)
}

func (s *ClaimsService) ClaimCommissionForToday(commissionId uint) error {
	dueDate := GetDueDateForTime(time.Now())
	commissionClaimsDb, err := InitDb(&CommissionClaimEntity{})
	if err != nil {
		return err
	}
	var claim CommissionClaimEntity
	tx := commissionClaimsDb.Where("commission_id = ? AND due_date = ?", commissionId, dueDate).First(&claim)
	if tx.Error != nil {
		return tx.Error
	}
	if claim.ID == 0 {
		return ErrCommissionNotFound
	}
	if claim.Claimed {
		return ErrCommissionAlreadyClaimed
	}
	claim.Claimed = true
	tx = commissionClaimsDb.Save(&claim)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}

func (s *ClaimsService) ClaimDailyBonusForToday() error {
	dueDate := GetDueDateForTime(time.Now())
	bonusClaimsDb, err := InitDb(&BonusClaimEntity{})
	if err != nil {
		return err
	}
	var claim BonusClaimEntity
	tx := bonusClaimsDb.Where("due_date = ?", dueDate).First(&claim)
	if tx.Error != nil {
		return tx.Error
	}
	claim.Claimed = true
	tx = bonusClaimsDb.Save(&claim)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}

func (s *ClaimsService) IsCommissionClaimed(commissionId uint, dueDate time.Time) (bool, error) {
	db, err := InitDb(&CommissionClaimEntity{})
	if err != nil {
		return false, err
	}
	var claim CommissionClaimEntity
	tx := db.Where("commission_id = ? AND due_date = ?", commissionId, GetDueDateForTime(dueDate)).First(&claim)
	if tx.Error != nil {
		if tx.Error == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, tx.Error
	}
	return claim.Claimed, nil
}

func (s *ClaimsService) IsTodaysBonusClaimed() (bool, error) {
	dueDate := GetDueDateForTime(time.Now())
	db, err := InitDb(&BonusClaimEntity{})
	if err != nil {
		return false, err
	}
	var claim BonusClaimEntity
	tx := db.Where("due_date = ?", dueDate).First(&claim)
	if tx.Error != nil {
		return false, nil
	}
	return claim.Claimed, nil
}

func (s *ClaimsService) ClearTodaysClaims() error {
	dueDate := GetDueDateForTime(time.Now())
	commissionClaimsDb, err := InitDb(&CommissionClaimEntity{})
	if err != nil {
		return err
	}
	commissionClaimsDb.Where("due_date = ?", dueDate).Delete(&CommissionClaimEntity{})
	bonusClaimsDb, err := InitDb(&BonusClaimEntity{})
	if err != nil {
		return err
	}
	bonusClaimsDb.Where("due_date = ?", dueDate).Delete(&BonusClaimEntity{})
	return nil
}

func (s *ClaimsService) getRewardsFromBonusClaim(bonusClaimEntity *BonusClaimEntity) ([]Reward, error) {
	rewardIds := strings.Split(bonusClaimEntity.Rewards, ",")
	rewardCounts := strings.Split(bonusClaimEntity.RewardCounts, ",")
	rewards := make([]Reward, len(rewardIds))
	for i, rewardId := range rewardIds {
		rewardIdInt, err := strconv.Atoi(rewardId)
		if err != nil {
			return nil, err
		}
		rewardCountInt, err := strconv.Atoi(rewardCounts[i])
		if err != nil {
			return nil, err
		}
		reward, err := s.RewardService.GetReward(uint(rewardIdInt))
		if err != nil {
			return rewards, err
		}
		rewards[i] = Reward{
			ID:          reward.ID,
			Count:       rewardCountInt,
			Type:        reward.Type,
			ImageBase64: reward.ImageBase64,
		}
	}
	return rewards, nil
}
