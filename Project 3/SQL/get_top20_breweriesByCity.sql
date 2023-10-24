select count (*) as brewery_count, city, state_province from breweries
	group by city, state_province
	order by brewery_count desc
	limit 20