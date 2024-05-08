package main

import "github.com/spf13/viper"

type LangService struct{}

func (s *LangService) GetLang() string {
	return viper.GetString("locale")
}

func (s *LangService) SetLang(lang string) {
	viper.Set("locale", lang)
	viper.WriteConfig()
}
