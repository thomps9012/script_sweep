package models

import (
	"math"
	"strings"
	"unicode/utf8"
)

type ClassifyByHeader struct {
	Classify_By string `json:"classify_by" reqHeader:"classify_by"`
}

type Raw_Classified struct {
	Script string
	Units  int
}

type Classified_Text struct {
	Script  string  `json:"script"`
	Percent float64 `json:"percent"`
}

func ClassifyByWord(words []string, scripts []Script_With_Ranges, cw chan []Raw_Classified) {
	raw_classified := make([]Raw_Classified, 0)
	first_script := CharacterScript(strings.Split(words[0], "")[0], scripts)
	first_unit := new(Raw_Classified)
	first_unit.Script = first_script
	first_unit.Units = 1
	raw_classified = append(raw_classified, *first_unit)
	for i := 1; i < len(words); i++ {
		word := words[i]
		matched := false
		first_character := strings.Split(word, "")[0]
		script := CharacterScript(first_character, scripts)
		for j, unit := range raw_classified {
			if unit.Script == script {
				raw_classified[j].Units++
				matched = true
			}
		}
		if !matched {
			new_script := new(Raw_Classified)
			new_script.Script = script
			new_script.Units = 1
			raw_classified = append(raw_classified, *new_script)
		}
	}
	cw <- raw_classified
}

func ClassifyByCharacters(text string, scripts []Script_With_Ranges, cc chan []Raw_Classified) {
	raw_classified := make([]Raw_Classified, 0)
	character_array := strings.Split(text, "")
	first_script := CharacterScript(character_array[0], scripts)
	first_unit := new(Raw_Classified)
	first_unit.Script = first_script
	first_unit.Units = 1
	raw_classified = append(raw_classified, *first_unit)
	for i := 1; i < len(character_array); i++ {
		character := character_array[i]
		matched := false
		script := CharacterScript(character, scripts)
		for j, unit := range raw_classified {
			if unit.Script == script {
				raw_classified[j].Units++
				matched = true
			}
		}
		if !matched {
			new_script := new(Raw_Classified)
			new_script.Script = script
			new_script.Units = 1
			raw_classified = append(raw_classified, *new_script)
		}
	}
	cc <- raw_classified
}

func ClassifyText(text string, by string, ct chan []Classified_Text) {
	rc := make(chan []Script_With_Ranges)
	go RetrieveRanges(rc)
	scripts := <-rc
	// possible simplification here
	cc := make(chan []Raw_Classified)
	formatted_classified := make([]Classified_Text, 0)
	words := strings.Split(text, " ")
	total_units := len(words)
	if by != "word" {
		total_units = utf8.RuneCountInString(text)
		go ClassifyByCharacters(text, scripts, cc)
	} else {
		go ClassifyByWord(words, scripts, cc)
	}
	raw_classified := <-cc
	// possible non-execution here
	for _, unit := range raw_classified {
		formatted_unit := new(Classified_Text)
		formatted_unit.Script = unit.Script
		formatted_unit.Percent = math.Round(float64(unit.Units) / float64(total_units) * 100)
		formatted_classified = append(formatted_classified, *formatted_unit)
	}
	ct <- formatted_classified
}
