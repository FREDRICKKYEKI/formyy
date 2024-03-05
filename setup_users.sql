CREATE DATABASE IF NOT EXISTS formyy_dev_db;
CREATE USER IF NOT EXISTS 'formyy_dev'@'localhost' IDENTIFIED BY 'formyy_dev_pwd';
GRANT ALL PRIVILEGES ON formyy_dev_db.* TO 'formyy_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'formyy_dev'@'localhost';
