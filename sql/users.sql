CREATE OR REPLACE TABLE users
(name VARCHAR(64) PRIMARY KEY, pass VARCHAR(255) NOT NULL, is_admin BOOL NOT NULL DEFAULT 0, token VARCHAR(16));

CREATE OR REPLACE PROCEDURE create_user(p_name VARCHAR(64), p_pass VARCHAR(255))
REPLACE INTO users SET name = p_name, pass = p_pass, token = NULL;

CREATE OR REPLACE PROCEDURE delete_user(p_name VARCHAR(64))
DELETE FROM users WHERE name = p_name;

CREATE OR REPLACE PROCEDURE get_user(p_name VARCHAR(64), OUT p_pass VARCHAR(255), OUT p_is_admin BOOL, OUT p_token VARCHAR(16))
SELECT pass, is_admin, token INTO p_pass, p_is_admin, p_token FROM users WHERE name = p_name;

CREATE OR REPLACE PROCEDURE set_user_admin(p_name VARCHAR(64), p_admin BOOL)
UPDATE users SET is_admin = p_admin WHERE name = p_name;

CREATE OR REPLACE PROCEDURE replace_user_token(p_name VARCHAR(64), p_token VARCHAR(16))
UPDATE users SET token = p_token WHERE name = p_name;

CREATE OR REPLACE PROCEDURE log_user_out(p_name VARCHAR(64))
UPDATE users SET token = NULL WHERE name = p_name;