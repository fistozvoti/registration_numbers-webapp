create table towns(
	id serial not null primary key,
	town text not null,
    location_key text not null
);

create table registration_numbers (
	id serial not null primary key,
    registration text not null,
	town_id int,
	foreign key (town_id) references towns(id)
);
INSERT INTO towns (town, location_key) VALUES ('Cape Town', 'CA');
INSERT INTO towns (town, location_key) VALUES ('Bellville', 'CY');
INSERT INTO towns (town, location_key) VALUES ('Malmesbury', 'CK');