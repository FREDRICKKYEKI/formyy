# Formyy
***
## TO DO
<!-- - change `form-data` to `form-schema` in TABLE: `forms` ✅ -->
<!-- - create `submissions` table ✅ -->
- create delete form/:id route
- add view Submissions link to home table
- create form/:id route
- create form/:id/submissions route
- create form/:id/submissions/:id route
- enable/disable form submissions (active/inactive)
-
## Pages

* Form maker Interface
* Auth pages
	- Sign Up
	- Log in
* Admin Dashboard
	- forms
	- Data for each

## Data models:

* Users
User Schema
===========
```sql
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(60) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    first_name VARCHAR(128) DEFAULT NULL,
    last_name VARCHAR(128) DEFAULT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    phonenumber VARCHAR(128) DEFAULT NULL,
    role ENUM('regular', 'admin') NOT NULL,
    PRIMARY KEY (id)
);
```

* Forms
Form Schema
===========
```sql

CREATE TABLE IF NOT EXISTS forms (
	id VARCHAR(60) NOT NULL PRIMARY KEY,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TEXT,
	author_id VARCHAR(60) NOT NULL,
	form_shema TEXT NOT NULL,
	FOREIGN KEY (author_id) REFERENCES users(id)
);

```
* Submissions
Submission Schema
====================

```sql
CREATE TABLE IF NOT EXISTS submissions (
    id VARCHAR(60) NOT NULL PRIMARY KEY,
    form_id VARCHAR(60) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id VARCHAR(60) NOT NULL,
    submission_data TEXT NOT NULL,
    FOREIGN KEY (form_id) REFERENCES forms(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

