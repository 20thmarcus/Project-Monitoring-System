const config = {
    user: '',
    password: '',
    server: '',
    database: 'tuesdayapp',
    options: {
        trustServerCertificate: true,
        trustConnection: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS'
    },
    port: 1433
}

module.exports = config;