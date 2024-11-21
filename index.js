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
        tableName: 'Employees'
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
        tableName: 'Roles'
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
        tableName: 'Managers'
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
        tableName: 'Departments'
    });
    





