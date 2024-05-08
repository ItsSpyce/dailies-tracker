package main

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/gen2brain/beeep"
)

type App struct {
	DailiesService *DailiesService
	RewardService  *RewardService
	LangService    *LangService
	ctx            context.Context
	config         *Config
}

func NewApp(config *Config) *App {
	return &App{
		config: config,
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.DailiesService = &DailiesService{}
	a.RewardService = &RewardService{}
	a.LangService = &LangService{}
}

func (a *App) GetAvailableRewards() []Reward {
	rewards, err := a.RewardService.GetAvailableRewards()
	if err != nil {
		fmt.Println("Error getting rewards:", err)
		return nil
	}
	return rewards
}

func (a *App) CreateReward(rewardType string, count int, imageBase64 string) (Reward, error) {
	return a.RewardService.CreateReward(Reward{
		Type:        rewardType,
		Count:       count,
		ImageBase64: imageBase64,
	})
}

func (a *App) DeleteReward(id int) error {
	return a.RewardService.DeleteReward(id)
}

func (a *App) LoadCommissions(dateMs int64) []Commission {
	dailies, err := a.DailiesService.LoadCommissionsForDate(dateMs, a.RewardService)
	if err != nil {
		fmt.Println("Error loading dailies:", err)
		return nil
	}
	fmt.Println("Loaded dailies:", dailies)
	return dailies
}

func (a *App) CreateTask(description string, realm string, rewards []Reward) (Commission, error) {
	return a.DailiesService.CreateNewCommission(description, realm, rewards, a.RewardService)
}

func (a *App) CompleteTask(id int) error {
	return a.DailiesService.CompleteCommission(id)
}

func (a *App) DeleteTask(id int) error {
	return a.DailiesService.DeleteCommission(id)
}

func (a *App) MarkTodayAsClaimed() error {
	return a.DailiesService.MarkTodayAsClaimed()
}

func (a *App) IsDev() bool {
	exeName, err := os.Executable()
	if err == nil && strings.Contains(exeName, "-dev") {
		return true
	}
	return len(os.Getenv("DEBUG")) != 0 || len(os.Getenv("DEV")) != 0
}

func (a *App) GetLocale() string {
	return a.LangService.GetLang()
}

func (a *App) SetLocale(lang string) {
	a.LangService.SetLang(lang)
}

func (a *App) Notify(title string, message string) {
	err := beeep.Notify(title, message, "public/logo-universal.png")
	if err != nil {
		fmt.Println("Error notifying:", err)
	}
}
