package main

import (
	"embed"

	"github.com/spf13/viper"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

type Config struct {
	Locale          string
	Notify          bool
	CheckForUpdates bool
}

func main() {
	var err error

	var config Config

	err = viper.Unmarshal(&config)
	if err != nil {
		println("Error reading config:", err.Error())
	}

	app := NewApp(&config)

	rewardService := &RewardService{}
	commissionService := &CommissionService{
		RewardService: rewardService,
	}

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "Dailies Tracker",
		Width:  1200,
		Height: 1100,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			rewardService,
			commissionService,
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: app.IsDev(),
		},
		Windows:                  &windows.Options{},
		EnableDefaultContextMenu: false,
	})

	if err != nil {
		println("An error occured when starting, %v", err)
	}
}
