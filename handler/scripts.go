package handler

import (
	"script_sweep_go/database"
	m "script_sweep_go/models"
	r "script_sweep_go/responses"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func AllScripts(c *fiber.Ctx) error {
	filters := new(m.ScriptFilters)
	err := c.ReqHeaderParser(filters)
	if err != nil {
		return c.Status(400).JSON(r.BadRequestHeader(err))
	}
	db := database.DB
	var rows []m.ScriptRow
	fields := []string{"id", "name", "living", "ranges", "year", "direction", "continents", "link"}
	if len(filters.Fields) > 0 {
		fields = filters.Fields
	}
	// possibly change this to optimize it
	var query *gorm.DB
	if filters.Limit != "" {
		limit, _ := strconv.Atoi(filters.Limit)
		query = db.Table("scripts").Select(fields).Limit(limit)
	} else {
		query = db.Table("scripts").Select(fields)
	}
	if filters.MaxYear != "" {
		query = query.Where("year < ?", filters.MaxYear)
	}
	if filters.MinYear != "" {
		query = query.Where("year > ?", filters.MinYear)
	}
	if filters.Living != "" {
		query = query.Where("living = ?", filters.Living)
	}
	if filters.Continent != "" {
		query = query.Where("? = ANY (continents)", []string{filters.Continent})
	}
	if filters.Direction != "" {
		query = query.Where("direction = ?", filters.Direction)
	}
	if filters.OrderBy != "" {
		if filters.OrderDirection != "" {
			query = query.Order(filters.OrderBy + " DESC")
		} else {
			query = query.Order(filters.OrderBy)
		}
	}
	query.Find(&rows)
	filtered_response, err := m.FilterFields(rows, fields)
	if err != nil {
		return c.Status(503).JSON(r.BadRequestFields(err))
	}
	if len(filtered_response) <= 0 {
		return c.Status(404).JSON(r.TooManyFilters())
	}
	return c.Status(200).JSON(r.AllScriptsRes(filtered_response))
}

func ScriptByID(c *fiber.Ctx) error {
	id := c.Params("id")
	int_id, _ := strconv.Atoi(id)
	filters := new(m.ScriptFilters)
	err := c.ReqHeaderParser(filters)
	if err != nil {
		return c.Status(400).JSON(r.BadRequestHeader(err))
	}
	db := database.DB
	var rows []m.ScriptRow
	// possibly change this to optimize it
	fields := []string{"id", "name", "living", "ranges", "year", "direction", "continents", "link"}
	if len(filters.Fields) > 0 {
		fields = filters.Fields
	}
	db.Table("scripts").Where("id = ?", int_id).Find(&rows)
	// possibly change this to optimize it
	filtered_response, err := m.FilterFields(rows, fields)
	if err != nil {
		panic(err)
	}
	return c.Status(200).JSON(r.SingleScriptRes(filtered_response, id))
}
