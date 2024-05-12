package main

import (
	"strconv"
	"strings"
	"time"
)

func ConvertDateMsToDueDate(dateMs int64) int64 {
	dateMsAsDate := time.Unix(dateMs, 0)
	return time.Date(
		dateMsAsDate.Year(),
		dateMsAsDate.Month(),
		dateMsAsDate.Day()+1,
		0, 0, 0, 0, time.UTC).Unix()
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
