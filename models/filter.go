package models

import (
	"fmt"
	"math"
	"script_sweep_go/database"
	"strings"
	"unicode/utf8"
)

type Filter_Input struct {
	Text      string `json:"text"`
	Script_ID int    `json:"script_id"`
}

type Filtered_Text_Count struct {
	Filtered_Text    []string
	Word_Count       int
	Character_Count  int
	Total_Words      int
	Total_Characters int
}

type Filtered_Response struct {
	Script            string   `json:"script"`
	Filtered_Text     []string `json:"filtered_text"`
	Word_Percent      float64  `json:"word_percent"`
	Character_Percent float64  `json:"character_percent"`
}

func RetrieveScriptRange(script_id int) (Script_With_Ranges, error) {
	script := new(Script_With_Ranges)
	row := new(ScriptRow)
	db := database.DB
	fields := []string{"name", "ranges"}
	db.Table("scripts").Where("id = ?", script_id).Select(fields).Find(&row)
	script.Name = row.Name
	script.Ranges = ParseRanges(row.Ranges)
	return *script, nil
}

func FilterWords(wc chan Filtered_Text_Count, text_array []string, script_ranges [][]int) {
	filtered := new(Filtered_Text_Count)
	filtered.Total_Words = 0
	filtered.Word_Count = 0
	filtered.Total_Characters = 0
	filtered.Character_Count = 0
	for _, word := range text_array {
		character_array := strings.Split(word, "")
		first_character := character_array[0]
		filtered.Total_Characters += len(character_array)
		filtered.Total_Words++
		rune_code, _ := utf8.DecodeRuneInString(first_character)
		for _, script_range := range script_ranges {
			if rune_code >= rune(script_range[0]) && rune_code <= rune(script_range[1]) {
				filtered.Filtered_Text = append(filtered.Filtered_Text, word)
				filtered.Word_Count++
				filtered.Character_Count += len(character_array)
			}
		}
	}
	wc <- *filtered
}

func FilterTextByScript(fc chan Filtered_Response, input Filter_Input) {
	response := new(Filtered_Response)
	script_info, _ := RetrieveScriptRange(input.Script_ID)
	text_array := strings.Split(input.Text, " ")
	response.Script = script_info.Name
	wc := make(chan Filtered_Text_Count)
	go FilterWords(wc, text_array, script_info.Ranges)
	filtered_text := <-wc
	fmt.Printf("%v", filtered_text)
	response.Character_Percent = math.Round(float64(filtered_text.Character_Count) / float64(filtered_text.Total_Characters) * 100)
	response.Word_Percent = math.Round(float64(filtered_text.Word_Count) / float64(filtered_text.Total_Words) * 100)
	response.Filtered_Text = filtered_text.Filtered_Text
	fc <- *response
}
