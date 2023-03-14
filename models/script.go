package models

import (
	"regexp"
	"strconv"
	"strings"
)

type Script struct {
	ID         int64    `json:"id"`
	Name       string   `json:"name"`
	Ranges     [][]int  `json:"ranges" gorm:"type:integer[][]"`
	Direction  string   `json:"direction"`
	Year       int64    `json:"year"`
	Living     bool     `json:"living"`
	Link       string   `json:"link"`
	Continents []string `json:"continents" gorm:"type:string[]"`
}

type Script_With_Ranges struct {
	Name   string  `json:"string"`
	Ranges [][]int `json:"ranges" gorm:"type:integer[][]"`
}

type ScriptRow struct {
	ID         int64  `json:"id"`
	Name       string `json:"name"`
	Ranges     string `json:"ranges" gorm:"type:integer[][]"`
	Direction  string `json:"direction"`
	Year       int64  `json:"year"`
	Living     bool   `json:"living"`
	Link       string `json:"link"`
	Continents string `json:"continents" gorm:"type:string[]"`
}

type ScriptFilters struct {
	MaxYear        string   `json:"max_year" reqHeader:"max_year"`
	MinYear        string   `json:"min_year" reqHeader:"min_year"`
	Living         string   `json:"living" reqHeader:"living"`
	Direction      string   `json:"direction" reqHeader:"direction"`
	Continent      string   `json:"continent" reqHeader:"continent"`
	Fields         []string `json:"fields" reqHeader:"fields"`
	Limit          string   `json:"limit" reqHeader:"limit"`
	OrderBy        string   `json:"order_by" reqHeader:"order_by"`
	OrderDirection string   `json:"order_direction" reqHeader:"order_direction"`
}

type FilteredResponse struct {
	Data []map[string]interface{}
}

type FilteredOutput struct {
	Values map[string]interface{}
}

func ParseRanges(ranges string) [][]int {
	ranges = strings.Trim(ranges, "{}")
	rangeStrings := strings.Split(ranges, "},{")
	var parsedRanges [][]int
	for _, rs := range rangeStrings {
		re := regexp.MustCompile(`\d+`)
		intStrings := re.FindAllString(rs, -1)
		var ints []int
		for _, is := range intStrings {
			i, err := strconv.Atoi(is)
			if err != nil {
				// return nil, err
				return nil
			}
			ints = append(ints, i)
		}
		// if len(ints) != 2 {
		// 	return nil, fmt.Errorf("invalid range: %v", ints)
		// }
		parsedRanges = append(parsedRanges, []int{ints[0], ints[1]})
	}
	// return parsedRanges, nil
	return parsedRanges
}

func ParseContinents(continents string) []string {
	continents = strings.Trim(continents, "{}")
	continentStrings := strings.Split(continents, "},{")
	var continentArr []string
	continentArr = append(continentArr, continentStrings...)
	// return continentArr, nil
	return continentArr
}

// possible optimization
// type User struct {
// 	ID     uint
// 	Name   string
// 	Age    int
// 	Gender string
// 	// hundreds of fields
//   }

//   type APIUser struct {
// 	ID   uint
// 	Name string
//   }

// // Select `id`, `name` automatically when querying
// db.Model(&User{}).Limit(10).Find(&APIUser{})
// // SELECT `id`, `name` FROM `users` LIMIT 10
func FilterFields(script_rows []ScriptRow, fields []string) ([]map[string]interface{}, error) {
	var response FilteredResponse
	for _, row := range script_rows {
		var output FilteredOutput
		output.Values = make(map[string]interface{}, len(fields)+1)
		for _, field := range fields {
			field_name := strings.TrimSpace(field)
			switch field_name {
			case "living":
				output.Values[field_name] = row.Living
			case "ranges":
				output.Values[field_name] = ParseRanges(row.Ranges)
			case "year":
				output.Values[field_name] = row.Year
			case "name":
				output.Values[field_name] = row.Name
			case "id":
				output.Values[field_name] = row.ID
			case "link":
				output.Values[field_name] = row.Link
			case "direction":
				output.Values[field_name] = row.Direction
			case "continents":
				output.Values[field_name] = ParseContinents(row.Continents)
			}
		}
		response.Data = append(response.Data, output.Values)
	}
	return response.Data, nil
}
