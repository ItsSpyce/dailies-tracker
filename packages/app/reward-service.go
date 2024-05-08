package main

import (
	"errors"
	"fmt"
	"strconv"
)

type RewardService struct{}

type Reward struct {
	ID          int    `json:"id"`
	Type        string `json:"type"`
	Count       int    `json:"count"`
	ImageBase64 string `json:"imageBase64"`
}

var ErrorRewardNotFound = errors.New("reward not found")
var ErrorInvalidRewardId = errors.New("invalid reward id")
var ErrorMissingRewardType = errors.New("missing reward type")
var ErrorMissingRewardImage = errors.New("missing imagebase64")
var ErrorMissingRewardCount = errors.New("missing reward count")

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
			return nil, ErrorInvalidRewardId
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
		return Reward{}, ErrorMissingRewardType
	}
	if len(reward.ImageBase64) == 0 {
		return Reward{}, ErrorMissingRewardImage
	}
	if reward.Count == 0 {
		return Reward{}, ErrorMissingRewardCount
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

func (s *RewardService) DeleteReward(id int) error {
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
