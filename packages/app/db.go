package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type RealmEntity struct {
	gorm.Model
	Name string `json:"name"`
}

type CommissionEntity struct {
	gorm.Model
	ID          uint   `json:"id"`
	Description string `json:"description"`
	Realm       string `json:"realm"`
	Rewards     string `json:"rewards"`
}

type CommissionClaimEntity struct {
	gorm.Model
	CommissionID uint   `json:"commissionId"`
	Claimed      bool   `json:"claimed"`
	DueDate      string `json:"dueDate"`
}

type BonusClaimEntity struct {
	gorm.Model
	Claimed      bool   `json:"claimed"`
	DueDate      string `json:"dueDate"`
	Rewards      string `json:"rewards"`
	RewardCounts string `json:"rewardCounts"`
}

type RewardEntity struct {
	gorm.Model
	ID          uint   `json:"id"`
	Type        string `json:"type"`
	ImageBase64 string `json:"imageBase64"`
	Count       int    `json:"count"`
}

func InitDb[Model comparable](instance *Model) (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	db.AutoMigrate(instance)
	return db, nil
}
