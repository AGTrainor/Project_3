create view vw_breweries_target_cities as 
	select * from breweries where city in (
	'San Diego',
	'Portland',
	'Seattle',
	'Denver',
	'Chicago',
	'San Francisco',
	'Columbus',
	'Cincinnati',
	'Cleveland',
	'Saint Louis',
	'Minneapolis',
	'Spokane',
	'Bend',
	'Austin',
	'Albuquerque',
	'Los Angeles',
	'Milwaukee',
	'Sacramento',
	'Kansas City',
	'Salt Lake City'
	) and state_province in (
	'California',
	'Oregon',
	'Washington',
	'Colorado',
	'Illinois',
	'Ohio',
	'Missouri',
	'Minnesota',
	'Texas',
	'New Mexico',
	'Wisconsin',
	'Utah'
	);
	
	select * from vw_breweries_target_cities