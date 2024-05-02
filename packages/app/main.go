package main

import (
	"embed"
	"os"
	"strings"

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
	// Create an instance of the app structure

	viper.SetConfigFile("config")
	viper.SetConfigType("json")
	viper.AddConfigPath(".")

	viper.SetDefault("locale", getLocale())
	viper.SetDefault("notify", true)
	viper.SetDefault("checkForUpdates", true)

	var config Config

	err = viper.Unmarshal(&config)
	if err != nil {
		println("Error reading config:", err.Error())
	}

	app := NewApp(&config)

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "Dailies Tracker",
		Width:  1200,
		Height: 1024,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
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

func getLocale() string {
	envVar := os.Getenv("LANG")
	if len(envVar) == 0 {
		return "en"
	}
	return strings.Split(envVar, ".")[0]
}
