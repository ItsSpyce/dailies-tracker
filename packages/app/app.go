package main

import (
	"context"
	"os"
	"strings"
)

type App struct {
	ctx context.Context
}

func NewApp(config *Config) *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) IsDev() bool {
	exeName, err := os.Executable()
	if err == nil && strings.Contains(exeName, "-dev") {
		return true
	}
	return len(os.Getenv("DEBUG")) != 0 || len(os.Getenv("DEV")) != 0
}
