package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type TaskEntity struct {
	gorm.Model
	ID          int    `json:"id"`
	Description string `json:"description"`
	Realm       string `json:"realm"`
	CreatedAt   int64  `json:"createdAt"`
	Deleted     bool   `json:"deleted"`
	Rewards     string `json:"rewards"`
}

type HistoryEntity struct {
	gorm.Model
	ID        int   `json:"id"`
	TaskId    int   `json:"taskId"`
	Completed bool  `json:"completed"`
	DueDate   int64 `json:"dueDate"`
	Deleted   bool  `json:"deleted"`
}

func InitDb[Model comparable](instance Model) (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	db.AutoMigrate(&TaskEntity{})
	db.AutoMigrate(&HistoryEntity{})
	return db, nil
}
