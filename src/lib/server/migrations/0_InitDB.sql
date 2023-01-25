BEGIN;

CREATE TABLE config ( 
	name                 TEXT NOT NULL  PRIMARY KEY  ,
	value                BLOB     ,
	type                 INTEGER NOT NULL DEFAULT 0   
 );

CREATE TABLE file ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  ,
	parent               INTEGER     ,
	name                 TEXT NOT NULL    ,
	title                TEXT NOT NULL    ,
	description          TEXT     ,
	mimeType             TEXT NOT NULL    ,
	data                 BLOB     ,
	metadata             TEXT     ,
	createdOn            INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP   ,
	modifiedOn           INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP   ,
	FOREIGN KEY ( parent ) REFERENCES file( id )  ,
	CHECK ( json_valid(metadata) )
 );

CREATE TABLE icon ( 
	name                 TEXT NOT NULL  PRIMARY KEY  ,
	path                 TEXT NOT NULL    
 );

CREATE TABLE userLink ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  ,
	title                TEXT NOT NULL    ,
	subTitle             TEXT     ,
	url                  TEXT     ,
	icon                 TEXT     ,
	FOREIGN KEY ( icon ) REFERENCES icon( name )  
 );

CREATE TABLE version ( 
	date                 INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP PRIMARY KEY  ,
	name                 TEXT NOT NULL    
 );

COMMIT;