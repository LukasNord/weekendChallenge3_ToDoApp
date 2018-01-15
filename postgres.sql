-- Database setup file

--Create table to store tasks.

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    details TEXT,
    completion_status BOOLEAN NOT NULL DEFAULT FALSE,
    due_date DATE,
    completed_date DATE,
    date_created DATE DEFAULT now(),
    task_owner VARCHAR(255)
    
);


--Create table to store Categories. 

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	category VARCHAR(255)
);
	
	
--CREATE Junction Table. Not use currently.

CREATE TABLE tasks_categories (
	id SERIAL PRIMARY KEY,
	task_id INT REFERENCES "tasks",
	category_id INT REFERENCES "categories"
	);
	
--populate some categories and some test data.

INSERT INTO categories (category)
VALUES ('cleaning'),('shopping'),('dog'),('exercise'),('errands');

INSERT INTO tasks (task,details,completion_status)
VALUES ('walk the dog','go for a walk with Baloo', FALSE);


INSERT INTO tasks_categories(task_id,category_id)
VALUES(1,3),(1,4);

--practice a join just for funsies
SELECT tasks.task, categories.category
FROM tasks
JOIN tasks_categories ON tasks.id = tasks_categories.task_id
JOIN categories ON tasks_categories.category_id = categories.id
GROUP BY tasks.task, tasks.details,categories.category;






