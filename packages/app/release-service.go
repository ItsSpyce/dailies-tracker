package main

import (
	"net/http"
	"time"
)

type ReleaseService struct {
	client http.Client
}

func NewReleaseService() *ReleaseService {
	return &ReleaseService{
		client: http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (s *ReleaseService) HasReleaseNotes() bool {
	return false
}

func (s *ReleaseService) GetReleaseNotes() string {
	req, _ := http.NewRequest("GET", "https://github.com/ItsSpyce/dailies-tracker/tree/release/release-notes", nil)
	req.Header.Set("Accept", "application/json")

	response, err := s.client.Do(req)
	if err != nil || response.StatusCode >= 400 {
		return ""
	}
	return ""
}
