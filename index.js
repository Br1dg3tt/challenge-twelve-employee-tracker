const inquirer = require("inquirer");
const { Pool } = require("pg");

const dbconnection = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "emp_manage_db",
  port: 5434
,
});

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ]);

  switch (action) {
    case "View all departments":
      return viewDepartments();
    case "View all roles":
      return viewRoles();
    case "View all employees":
      return viewEmployees();
    case "Add a department":
      return addDepartment();
    case "Add a role":
      return addRole();
    case "Add an employee":
      return addEmployee();
    case "Update an employee role":
      return updateEmployeeRole();
    default:
      return quit();
  }
};

const viewDepartments = async () => {
  const res = await dbconnection.query("SELECT * FROM departments");
  console.table(res.rows);
  mainMenu();
};

const viewRoles = async () => {
  const res = await dbconnection.query(`
        SELECT roles.id, roles.title, roles.salary, departments.name AS department
        FROM roles
        JOIN departments ON roles.department_id = departments.id
    `);
  console.table(res.rows);
  mainMenu();
};

const viewEmployees = async () => {
  const res = await dbconnection.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, 
               departments.name AS department, roles.salary, 
               CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees manager ON employees.manager_id = manager.id
    `);
  console.table(res.rows);
  mainMenu();
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    { type: "input", name: "name", message: "Enter the department name:" },
  ]);
  await dbconnection.query("INSERT INTO departments (name) VALUES ($1)", [name]);
  console.log("Department added!");
  mainMenu();
};

const addRole = async () => {
  const departments = await dbconnection.query("SELECT * FROM departments");
  const { title, salary, department_id } = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter the role title:" },
    { type: "input", name: "salary", message: "Enter the role salary:" },
    {
      type: "list",
      name: "department_id",
      message: "Select the department:",
      choices: departments.rows.map((d) => ({ name: d.name, value: d.id })),
    },
  ]);
  await dbconnection.query(
    "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)",
    [title, salary, department_id]
  );
  console.log("Role added!");
  mainMenu();
};

const addEmployee = async () => {
  const roles = await dbconnection.query("SELECT * FROM roles");
  const employees = await dbconnection.query("SELECT * FROM employees");
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the employee first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the employee last name:",
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the role:",
      choices: roles.rows.map((r) => ({ name: r.title, value: r.id })),
    },
    {
      type: "list",
      name: "manager_id",
      message: "Select the manager:",
      choices: [
        { name: "None", value: null },
        ...employees.rows.map((e) => ({
          name: `${e.first_name} ${e.last_name}`,
          value: e.id,
        })),
      ],
    },
  ]);
  await dbconnection.query(
    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, role_id, manager_id]
  );
  console.log("Employee added!");
  mainMenu();
};

const updateEmployeeRole = async () => {
  const employees = await dbconnection.query("SELECT * FROM employees");
  const roles = await dbconnection.query("SELECT * FROM roles");
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Select the employee to update:",
      choices: employees.rows.map((e) => ({
        name: `${e.first_name} ${e.last_name}`,
        value: e.id,
      })),
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the new role:",
      choices: roles.rows.map((r) => ({ name: r.title, value: r.id })),
    },
  ]);
  await dbconnection.query("UPDATE employees SET role_id = $1 WHERE id = $2", [
    role_id,
    employee_id,
  ]);
  console.log("Employee role updated!");
  mainMenu();
};

const quit = async () => {
  process.exit();
};

// Start the application
mainMenu();