-- Insert Departments

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

-- Insert Managers
INSERT INTO managers (first_name, last_name, department_id) VALUES 
('John', 'Doe', 1),
('Jane', 'Smith', 2),
('Alice', 'Johnson', 3),
('Bob', 'Brown', 4);

