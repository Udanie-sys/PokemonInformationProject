const config = {
    user: "sa",
    password: '1234',
    server: "localhost\\SQLSERVERUDANIE",
    database: 'PokemonDB',
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        enableArithAort: true,
        instancename: 'SQLSERVERUDANIE',
        validateBulkLoadParameters: false,
        encrypt: false,
    },
    port: 1433
}

module.exports = config;