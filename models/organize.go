package models

import (
	"math"
	"script_sweep_go/database"
	"strings"
	"unicode/utf8"
)

type Text_Input struct {
	Text string `json:"text"`
}

type Classified_Word struct {
	Script     string
	Word       string
	Characters int
}

type Script_Group struct {
	Script     string
	Words      []string
	Characters int
}

type Organized_Text struct {
	Script            string   `json:"script"`
	Words             []string `json:"words"`
	Word_Percent      float64  `json:"word_percent"`
	Character_Percent float64  `json:"character_percent"`
}

func RetrieveRanges(rc chan []Script_With_Ranges) {
	scripts := make([]Script_With_Ranges, 0)
	rows := make([]ScriptRow, 0)
	db := database.DB
	fields := []string{"name", "ranges"}
	db.Table("scripts").Select(fields).Find(&rows)
	for _, row := range rows {
		script := new(Script_With_Ranges)
		script.Name = row.Name
		script.Ranges = ParseRanges(row.Ranges)
		scripts = append(scripts, *script)
	}
	rc <- scripts
}

func CharacterScript(character string, scripts []Script_With_Ranges) string {
	rune_code, _ := utf8.DecodeRuneInString(character)
	for _, script := range scripts {
		for _, code_range := range script.Ranges {
			if rune_code > rune(code_range[0]) && rune_code < rune(code_range[1]) {
				return script.Name
			}
		}
	}
	return "unknown"
}

func ClassifyWord(word string, scripts []Script_With_Ranges, wc chan Classified_Word) {
	character_array := strings.Split(word, "")
	base_classifier := CharacterScript(character_array[0], scripts)
	classified_word := new(Classified_Word)
	classified_word.Characters = utf8.RuneCountInString(word)
	classified_word.Word = word
	classified_word.Script = base_classifier
	for i := 1; i < len(character_array); i++ {
		character := character_array[i]
		current_classifier := CharacterScript(character, scripts)
		if base_classifier != current_classifier {
			classified_word.Script = "mixed"
			wc <- *classified_word
		}
	}
	wc <- *classified_word
}

func FirstScriptGroup(word Classified_Word) Script_Group {
	group := new(Script_Group)
	group.Characters = word.Characters
	group.Words = append(group.Words, word.Word)
	group.Script = word.Script
	return *group
}

func GroupClassifiedWords(classified_words []Classified_Word, sc chan []Script_Group) {
	script_groups := make([]Script_Group, 0)
	script_groups = append(script_groups, FirstScriptGroup(classified_words[0]))
	for i := 1; i < len(classified_words); i++ {
		inserted := false
		classified := classified_words[i]
		for i, script_group := range script_groups {
			if script_group.Script == classified.Script {
				script_group.Words = append(script_group.Words, classified.Word)
				script_group.Characters += classified.Characters
				script_groups[i] = script_group
				inserted = true
			}
		}
		if !inserted {
			new_script_group := new(Script_Group)
			new_script_group.Words = append(new_script_group.Words, classified.Word)
			new_script_group.Script = classified.Script
			new_script_group.Characters = classified.Characters
			script_groups = append(script_groups, *new_script_group)
		}
	}
	sc <- script_groups
}

func FormatGroups(script_groups []Script_Group, total_words int, total_characters int, ot chan []Organized_Text) {
	organized_text := make([]Organized_Text, 0)
	for _, group := range script_groups {
		text_group := new(Organized_Text)
		text_group.Script = group.Script
		text_group.Words = group.Words
		text_group.Character_Percent = math.Round(float64(group.Characters) / float64(total_characters) * 100)
		text_group.Word_Percent = math.Round(float64(len(group.Words)) / float64(total_words) * 100)
		organized_text = append(organized_text, *text_group)
	}
	ot <- organized_text
}

func OrganizeText(words []string, tc chan []Organized_Text) {
	rc := make(chan []Script_With_Ranges)
	go RetrieveRanges(rc)
	scripts := <-rc
	classified_words := make([]Classified_Word, 0)
	total_characters := 0
	total_words := len(words)
	for _, word := range words {
		wc := make(chan Classified_Word)
		go ClassifyWord(word, scripts, wc)
		classified_word := <-wc
		total_characters += classified_word.Characters
		classified_words = append(classified_words, classified_word)
	}
	sc := make(chan []Script_Group)
	go GroupClassifiedWords(classified_words, sc)
	script_groups := <-sc
	ot := make(chan []Organized_Text)
	go FormatGroups(script_groups, total_words, total_characters, ot)
	organized_words := <-ot
	tc <- organized_words
}
