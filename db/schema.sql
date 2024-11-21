DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- Create tables
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE TABLE manager (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Insert data
INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 100000.00, 1),
    ('Accountant', 75000.00, 2),
    ('Lawyer', 120000.00, 3),
    ('Salesperson', 80000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 1),
    ('Jane', 'Smith', 2, 2),
    ('Alice', 'Johnson', 3, 3),
    ('Bob', 'Brown', 4, 4);

INSERT INTO manager (first_name, last_name, department_id)
VALUES
    ('John', 'Doe', 1),
    ('Jane', 'Smith', 2),
    ('Alice', 'Johnson', 3),
    ('Bob', 'Brown', 4);

