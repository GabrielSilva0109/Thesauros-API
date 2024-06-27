-- -- CREATE TABLE users (
-- --   user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- --   address VARCHAR(248),
-- --   balance DECIMAL(18,2),
-- --   created_at TIMESTAMP,
-- --   name VARCHAR(248) NOT NULL,
-- --   password VARCHAR(248) NOT NULL,
-- --   email VARCHAR(248) NOT NULL,
-- --   date_birth DATE NOT NULL
-- -- );


-- CREATE TABLE tickets (
--   ticket_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   user_id INT NOT NULL,
--   drawing_id INT NOT NULL,
--   ticket_number VARCHAR(50),
--   ticket_cost DECIMAL(18,2),
--   purchase_time TIMESTAMP,
--   is_winner BOOLEAN DEFAULT FALSE,
--   FOREIGN KEY (user_id) REFERENCES users(user_id),
--   FOREIGN KEY (drawing_id) REFERENCES drawings(drawing_id)
-- );

--  create table transaction (
--    transaction_id int not null auto_increment primary key,
--    user_id int not null,
--    transaction_type varchar(50),
--    amount decimal(18,2),
--    transaction_time timestamp,
--    address_env varchar(100),
-- 	  FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );



-- CREATE TABLE drawings (
--   drawing_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   drawing_name VARCHAR(100) NOT NULL,
--   drawing_date TIMESTAMP NOT NULL,
--   date_winner datetime,
--   prize DECIMAL(18,2)
-- );



