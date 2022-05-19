var config = require('./dbconfig');
const sql = require('mssql');

//Get all pokemon data
async function getPokemons() {
    try {
        let pool = await sql.connect(config);
        let pokemon = await pool.request().query("SELECT distinct p.id, p.favourite, p.name, STRING_AGG([Types].name,',') As types_name, p.classification, p.resistant, p.weaknesses, p.minimumWeight, p.maximumWeight, p.minimumHeight, p.maximumHeight, p.fleeRate, p.EvolutionRequirementsName, p.EvolutionRequirementsAmount, p.maxCP, p.maxHP FROM [dbo].Pokemon p INNER JOIN Pokemon_has_types ON p.id = Pokemon_has_types.Pkemon_ID INNER JOIN [Types] ON  [Types].id = Pokemon_has_types.Type_ID group by p.id, p.favourite, p.name, p.classification, p.resistant, p.weaknesses, p.minimumWeight, p.maximumWeight, p.minimumHeight, p.maximumHeight, p.fleeRate, p.EvolutionRequirementsName, p.EvolutionRequirementsAmount, p.maxCP, p.maxHP order by p.id");
        return (await pokemon).recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//Get favourite Pokemones list
async function getFavouritePokemons() {
    try {
        let pool = await sql.connect(config);
        let pokemon = await pool.request().query("SELECT distinct p.id, p.favourite, p.name, STRING_AGG([Types].name,',') As types_name, p.classification, p.resistant, p.weaknesses, p.minimumWeight, p.maximumWeight, p.minimumHeight, p.maximumHeight, p.fleeRate, p.EvolutionRequirementsName, p.EvolutionRequirementsAmount, p.maxCP, p.maxHP FROM [dbo].Pokemon p INNER JOIN Pokemon_has_types ON p.id = Pokemon_has_types.Pkemon_ID INNER JOIN [Types] ON  [Types].id = Pokemon_has_types.Type_ID where p.favourite='1' group by p.id, p.favourite, p.name, p.classification, p.resistant, p.weaknesses, p.minimumWeight, p.maximumWeight, p.minimumHeight, p.maximumHeight, p.fleeRate, p.EvolutionRequirementsName, p.EvolutionRequirementsAmount, p.maxCP, p.maxHP order by p.id");
        return (await pokemon).recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//Get all pokemon types
async function getPokemonTypes() {
    try {
        let pool = await sql.connect(config);
        let pokemon = await pool.request().query("SELECT DISTINCT name FROM Types");
        return (await pokemon).recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
// Get pokemons by name
async function getName(nameValue) {
    try {
        let pool = await sql.connect(config);
        let pokemon = await pool.request()
            .input('input_parameter', sql.VarChar(50), nameValue)
            .query("SELECT * FROM Pokemon where name= @input_parameter");
        //let name = await pool.request().query("SELECT * FROM Pokemon where name= @input_parameter");
        return (await pokemon).recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//Get pokemons by Id
async function getId(idValue) {
    try {
        let pool = await sql.connect(config);
        let pokemon = await pool.request()
            .input('input_parameter', sql.Int, idValue)
            .query("SELECT * FROM Pokemon where id= @input_parameter");
        //let name = await pool.request().query("SELECT * FROM Pokemon where name= @input_parameter");
        return (await pokemon).recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//Update favourite pokemons
async function updateFavourite(favourite) {
    try {
        console.log('id ' + favourite.id);
        console.log('stats ' + favourite.status);

        var newStatus = 0;
        if (favourite.status == "True") {
            newStatus = 1;
        } else {
            newStatus = 0;
        }


        let pool = await sql.connect(config);
        let updateFavouriteItem = await pool.request()
            .input('id', sql.Int, favourite.id)
            .input('status', sql.Bit, newStatus)
            .execute("UpdateFaorurite");
        return (await updateFavouriteItem).recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
//Insert pokemon data
async function addPokemon(pokemon) {
    try {
        console.log('inserting data ' + pokemon.types);
        let pool = await sql.connect(config);
        let insertPokemon = await pool.request()
            .input('id', sql.Int, pokemon.id)
            .input('favourite', sql.Bit, pokemon.favourite)
            .input('name', sql.NVarChar, pokemon.name)
            .input('classification', sql.NVarChar, pokemon.classification)
            .input('types', sql.NVarChar, pokemon.types)
            .input('resistant', sql.NVarChar, pokemon.resistant)
            .input('weaknesses', sql.NVarChar, pokemon.weaknesses)
            .input('minimumWeight', sql.NVarChar, pokemon.minimumWeight)
            .input('maximumWeight', sql.NVarChar, pokemon.maximumWeight)
            .input('minimumHeight', sql.NVarChar, pokemon.minimumHeight)
            .input('maximumHeight', sql.NVarChar, pokemon.maximumHeight)
            .input('fleeRate', sql.Float, pokemon.fleeRate)
            .input('EvolutionRequirementsName', sql.NVarChar, pokemon.EvolutionRequirementsName)
            .input('EvolutionRequirementsAmount', sql.Int, pokemon.EvolutionRequirementsAmount)            
            //.input('evolutions', sql.NVarChar, pokemon.evolutions) //Already implemented types. Same way we can implement evaluations as well. Didn't get time to implement it.   
            .input('maxCP', sql.Int, pokemon.maxCP)
            .input('maxHP', sql.Int, pokemon.maxHP)
            //.input('attacks', sql.NVarChar, pokemon.attacks)
            .execute("InsertPokemon");
        return (await insertPokemon).recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {
    addPokemon: addPokemon,
    getPokemons: getPokemons,
    getName: getName,
    getId: getId,
    updateFavourite: updateFavourite,
    getFavouritePokemons: getFavouritePokemons,
    getPokemonTypes: getPokemonTypes

}