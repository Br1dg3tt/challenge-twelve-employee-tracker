const sequelize = (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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
    },
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
    },
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
    },
    department_id: {
        type: DataType.INTEGER
    },
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
    },
    tableName: 'departments'
});