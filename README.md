# Formyy
***
## Introduction
Formyy is a form builder application that allows users to create forms and collect data from users. It is built with:
* Node.js + Express.js
* React.js (SSR)
* Bootstrap
* MySQL (Sequelize ORM)

## Features
- Create forms
- View forms
- Edit forms
- Delete forms
- Collect form submissions
- View form submissions
- Delete form submissions
- Enable/Disable form submissions

## Installation
1. Clone the repository
```bash
    git clone https://github.com/FREDRICKKYEKI/formyy.git
```

2. Change directory to the project folder
```bash
    cd formyy
```

3. Install dependencies
```bash
    npm install
```

4. Create a `.env` file in the root directory and add the following environment variables:
```bash
    DB_USER=[YOUR_DB_USER]
    DB_PASS=[YOUR_DB_PASS]
    DEV_DB=formyy_dev_db
    TEST_DB=formyy_test_db
    PROD_DB=formyy_prod_db
    JWT_SECRET=[YOUR_JWT_SECRET]
    MODE=dev
```

5. Create a MySQL database and run the following command to create the tables:
```bash
    npm run migrate
```

6. Start the server
```bash
    npm run dev
```

## Data models:

* Users
***
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
***
```sql

CREATE TABLE IF NOT EXISTS forms (
	id VARCHAR(60) NOT NULL PRIMARY KEY,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TEXT,
	author_id VARCHAR(60) NOT NULL,
	form_shema TEXT NOT NULL,
    decay_date DATETIME, -- Decay date column
    form_state ENUM('active', 'inactive') DEFAULT 'active' NOT NULL, -- Form state column
	FOREIGN KEY (author_id) REFERENCES users(id)
);

```
* Submissions
***
```sql
CREATE TABLE IF NOT EXISTS submissions (
    id VARCHAR(60) NOT NULL PRIMARY KEY,
    form_id VARCHAR(60) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id VARCHAR(60) NOT NULL UNIQUE,
    submission_data TEXT NOT NULL,
    FOREIGN KEY (form_id) REFERENCES forms(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```



<!-- ## TO DO
- change `form-data` to `form-schema` in TABLE: `forms` ✅
- create `submissions` table ✅
- create form/delete/:id route ✅
- enable/disable form submissions (active/inactive) ✅
- add view Submissions link to home table ✅
- create form/:id route ✅
- create form/:id/submissions route ✅
- create form/:id/submissions/:id/delete route ✅
- add radio button to form schema -->

