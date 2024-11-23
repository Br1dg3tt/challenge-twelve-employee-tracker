DROP DATABASE IF EXISTS emp_manage_db;
CREATE DATABASE emp_manage_db;

-- this is important to connect to the database so the tables can be created and the seed data can be inserted
\c emp_manage_db

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES departments(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES roles(id),
    manager_id INTEGER REFERENCES employees(id)
);

INSERT INTO departments (name) VALUES 
('Human Resources'),
('Finance'),
('Engineering'),
('Marketing'),
('Sales');

-- Insert Roles
INSERT INTO roles (title, salary, department_id) VALUES 
('HR Manager', 100000, 1),
('Finance Manager', 120000, 2),
('Software Engineer', 120000, 3),
('Marketing Manager', 100000, 4),
('Sales Manager', 120000, 5);

-- Insert Employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, 1),
('Jane', 'Smith', 2, 2),
('Alice', 'Johnson', 3, 3),
('Bob', 'Brown', 4, 4);
