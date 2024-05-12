package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type CommissionEntity struct {
	gorm.Model
	ID          uint   `json:"id"`
	Description string `json:"description"`
	Realm       string `json:"realm"`
	Rewards     string `json:"rewards"`
}

type HistoryEntity struct {
	gorm.Model
	ID           uint  `json:"id"`
	CommissionID uint  `json:"commissionId"`
	Completed    bool  `json:"completed"`
	DueDate      int64 `json:"dueDate"`
}

type RewardEntity struct {
	gorm.Model
	ID          uint   `json:"id"`
	Type        string `json:"type"`
	ImageBase64 string `json:"imageBase64"`
	Count       int    `json:"count"`
}

type RewardClaimEntity struct {
	gorm.Model
	DueDate  int64 `json:"dueDate"`
	RewardID uint  `json:"rewardId"`
	Count    int   `json:"count"`
	Claimed  bool  `json:"claimed"`
}

func InitDb[Model comparable](instance *Model) (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	db.AutoMigrate(instance)
	return db, nil
}
