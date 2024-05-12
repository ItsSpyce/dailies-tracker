package main

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
)

type RewardService struct{}

type Reward struct {
	ID          uint   `json:"id"`
	Type        string `json:"type"`
	Count       int    `json:"count"`
	ImageBase64 string `json:"imageBase64"`
}

var ErrRewardNotFound = errors.New("reward not found")
var ErrInvalidRewardId = errors.New("invalid reward id")
var ErrMissingRewardType = errors.New("missing reward type")
var ErrMissingRewardImage = errors.New("missing imagebase64")
var ErrMissingRewardCount = errors.New("missing reward count")
var ErrBonusRewardLengthMismatch = errors.New("bonus reward length mismatch")

func (s *RewardService) GetAvailableRewards() ([]Reward, error) {
	db, err := InitDb(&RewardEntity{})
	if err != nil {
		return nil, err
	}
	var rewards []RewardEntity
	tx := db.Find(&rewards)
	if tx.Error != nil {
		return nil, tx.Error
	}
	result := make([]Reward, len(rewards))
	for i, reward := range rewards {
		result[i] = Reward{
			Type:        reward.Type,
			Count:       reward.Count,
			ID:          reward.ID,
			ImageBase64: reward.ImageBase64,
		}
	}
	return result, nil
}

func (s *RewardService) GetReward(id uint) (Reward, error) {
	db, err := InitDb(&RewardEntity{})
	if err != nil {
		return Reward{}, err
	}
	var reward RewardEntity
	tx := db.First(&reward, id)
	if tx.Error != nil {
		return Reward{}, tx.Error
	}
	return Reward{
		ID:          reward.ID,
		Type:        reward.Type,
		Count:       reward.Count,
		ImageBase64: reward.ImageBase64,
	}, nil
}

func (s *RewardService) GetRewardsFromRewardsString(rewards string) ([]Reward, error) {
	rewardIds := strings.Split(rewards, ",")
	return s.GetRewardsFromIds(rewardIds)
}

func (s *RewardService) GetRewardIdsFromRewards(rewards []Reward) ([]string, error) {
	db, err := InitDb(&RewardEntity{})
	if err != nil {
		return nil, err
	}
	rewardIds := make([]string, len(rewards))
	for i, reward := range rewards {
		var rewardEntity RewardEntity
		tx := db.Where("type = ? AND count = ?", reward.Type, reward.Count).First(&rewardEntity)
		if tx.Error != nil {
			return nil, tx.Error
		}
		rewardIds[i] = fmt.Sprint(rewardEntity.ID)
	}
	return rewardIds, nil

}

func (s *RewardService) GetRewardsFromIds(ids []string) ([]Reward, error) {
	db, err := InitDb(&RewardEntity{})
	if err != nil {
		return nil, err
	}
	result := make([]Reward, len(ids))
	for i, id := range ids {
		idInt, err := strconv.Atoi(id)
		if err != nil {
			return nil, ErrInvalidRewardId
		}
		var reward RewardEntity
		tx := db.First(&reward, idInt)
		if tx.Error != nil {
			return nil, tx.Error
		}
		result[i] = Reward{
			ID:          reward.ID,
			Type:        reward.Type,
			Count:       reward.Count,
			ImageBase64: reward.ImageBase64,
		}
	}
	return result, nil
}

func (s *RewardService) CreateReward(reward Reward) (Reward, error) {
	if len(reward.Type) == 0 {
		return Reward{}, ErrMissingRewardType
	}
	if len(reward.ImageBase64) == 0 {
		return Reward{}, ErrMissingRewardImage
	}
	if reward.Count == 0 {
		return Reward{}, ErrMissingRewardCount
	}
	db, err := InitDb(&RewardEntity{})
	if err != nil {
		return Reward{}, err
	}
	rewardEntity := &RewardEntity{
		Type:        reward.Type,
		ImageBase64: reward.ImageBase64,
		Count:       reward.Count,
	}
	db.Create(&rewardEntity)
	reward.ID = rewardEntity.ID
	return reward, nil
}

func (s *RewardService) DeleteReward(id uint) error {
	db, err := InitDb(&RewardEntity{})
	if err != nil {
		return err
	}
	tx := db.Delete(&RewardEntity{}, id)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}
