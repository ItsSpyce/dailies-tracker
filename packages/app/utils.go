package main

import (
	"strconv"
	"strings"
	"time"
)

func GetDueDateForTime(date time.Time) string {
	return date.Add(time.Hour * 24).Format("2006-01-02")
}

func ConvertRewardIdStringToUints(rewardIdString string) ([]uint, error) {
	rewardIds := strings.Split(rewardIdString, ",")
	rewardIdsAsUint := make([]uint, len(rewardIds))
	for i, rewardId := range rewardIds {
		convertedRewardId, err := strconv.ParseUint(rewardId, 10, 32)
		if err != nil {
			return nil, err
		}
		rewardIdsAsUint[i] = uint(convertedRewardId)
	}
	return rewardIdsAsUint, nil
}
