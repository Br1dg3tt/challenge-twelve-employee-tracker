// importing required packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');
const consoleTable = require('console.table');

//importing dotenv package
require('dotenv').config();

//connecting to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'postgres'
    });

    const Employee = sequelize.define('Employee', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataType.STRING
        },
        last_name: {
            type: DataType.STRING
        },
        role_id: {
            type: DataType.INTEGER
        },
        manager_id: {
            type: DataType.INTEGER
        }
        tableName: 'employees'
    });

    const Role = sequelize.define('Role', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING
        },
        salary: {
            type: DataType.DECIMAL
        },
        department_id: {
            type: DataType.INTEGER
        }
        tableName: 'roles'
    });

    const Manager = sequelize.define('Manager', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataType.STRING
        },
        last_name: {
            type: DataType.STRING
        }
        department_id: {
            type: DataType.INTEGER
        }
        tableName: 'managers'
    });

    const Department = sequelize.define('Department', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING
        }
        tableName: 'departments'
    });

Employee.connectsTo(Role, {foreignKey: 'role_id', as: 'role'});
Employee.connectsTo(Manager, {foreignKey: 'manager_id', as: 'manager'});
Role.connectsTo(Department, {foreignKey: 'department_id', as: 'department'});
Manager.connectsTo(Department, {foreignKey: 'department_id', as: 'department'});

//creating the tables
const input = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'home',
        choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'Quit']
    }
]

//function to view all employees
const viewEmployees = () => {
    Employee.findAll({
        include: [
            {
                model: Role,
                as: 'role'
            },
            {
                model: Manager,
                as: 'manager'
            }
        ]
    }).then(employees => {
        console.table(employees);
    });
};

//function to view all roles
const viewRoles = () => {
    Role.findAll({
        include: [
            {
                model: Department,
                as: 'department'
            }
        ]
    }).then(roles => {
        console.table(roles);
    });
};

//function to view all departments
const viewDepartments = () => {
    Department.findAll().then(departments => {
        console.table(departments);
    });
};

//function to add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the employee\'s first name:',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'Enter the employee\'s last name:',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'Enter the employee\'s role ID:',
            name: 'role_id'
        },
        {
            type: 'input',
            message: 'Enter the employee\'s manager ID:',
            name: 'manager_id'
        }
    ]).then(employee => {
        Employee.create(employee);
    });
};

//function to add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the role title:',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter the role salary:',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Enter the role department ID:',
            name: 'department_id'
        }
    ]).then(role => {
        Role.create(role);
    });
};

//function to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the department name:',
            name: 'name'
        }
    ]).then(department => {
        Department.create(department);
    });
};

//function to update an employee's role
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the employee ID:',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Enter the new role ID:',
            name: 'role_id'
        }
    ]).then(employee => {
        Employee.update(employee, {
            where: {
                id: employee.id
            }
        });
    });
};

//function to quit the application
const quit = () => {
    process.exit();
};





