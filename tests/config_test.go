package tests

import (
	"script_sweep_go/config"
	"testing"

	"github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"
)

func TestConfig(t *testing.T) {
	tests := []struct {
		description string
		variable    string
		expected    string
	}{
		{
			description: "passing test",
			variable:    "TEST_CONFIG",
			expected:    "test",
		},
		{
			description: "failing test",
			variable:    "DOES_NOT_EXIST",
			expected:    "",
		},
	}
	err := godotenv.Load("../.env")
	if err != nil {
		panic("Error loading .env file")
	}
	for _, test := range tests {
		actual := config.Config(test.variable)
		assert.Equal(t, test.expected, actual)
	}
}
