create table breweries(
	id UUID primary key,
	name varchar not null,
	brewery_type varchar not null,
	address_1 varchar,
	address_2 varchar,
	address_3 varchar,
	city varchar not null,
	state_province varchar not null,
	postal_code varchar not null,
	country varchar not null,
	phone varchar,
	website_url varchar,
	longitude float,
	latitude float
)