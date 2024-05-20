package main

import (
	"embed"
	"os"
	"path"

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
	MinimizeToTray  bool
}

const configDirName = "DailiesTracker"

func main() {
	userConfigDir, err := os.UserConfigDir()
	if err != nil {
		println("Error getting user config dir:", err.Error())
	}
	appConfigDir := path.Join(userConfigDir, configDirName)
	if _, err := os.Stat(appConfigDir); os.IsNotExist(err) {
		err := os.Mkdir(appConfigDir, 0755)
		if err != nil {
			println("Error creating app config dir:", err.Error())
		}
	}

	config := Config{
		Locale:          "en_US",
		Notify:          true,
		CheckForUpdates: true,
		MinimizeToTray:  true,
	}

	viper.AddConfigPath(appConfigDir)
	viper.SetConfigName("config")
	err = viper.Unmarshal(&config)
	viper.SafeWriteConfig()
	if err != nil {
		println("Error reading config:", err.Error())
	}

	app := NewApp(&config)

	rewardService := &RewardService{}
	commissionService := &CommissionService{
		RewardService: rewardService,
	}
	claimsService := &ClaimsService{
		RewardService:     rewardService,
		CommissionService: commissionService,
	}
	commissionService.ClaimsService = claimsService

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
			claimsService,
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
