-- Your SQL goes here
CREATE TABLE todos (
  id VARCHAR NOT NULL PRIMARY KEY,
  todo VARCHAR NOT NULL,
  checked BOOLEAN NOT NULL,
  client_list_key VARCHAR NOT NULL
)