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





