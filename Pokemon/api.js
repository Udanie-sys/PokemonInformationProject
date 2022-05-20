var Db = require('./dboperations');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { response } = require('express');
const res = require('express/lib/response');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {

    next();
});


router.route('/favourite').post((request, response) => {
    try {
        let favourite = { ...request.body };

        dboperations.updateFavourite(favourite).then(result => {

            response.status(201).json(result);
        });
    } catch (error) {
        console.log(error);
    }
});
//Insert pokemons
router.route('/pokemon').post((request, response) => {
    try {
        let pokemon = { ...request.body }
        dboperations.addPokemon(pokemon).then(result => {

            response.status(201).json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

//Get all pokemons
router.route('/pokemons').get((request, response) => {
    dboperations.getPokemons().then(result => {

        response.json(result[0]);
    })
});
//Get favourite pokemons
router.route('/favouritePokemons').get((request, response) => {
    dboperations.getFavouritePokemons().then(result => {

        response.json(result[0]);
    })
});
//Get all pokemon types
router.route('/pokemonTypes').get((request, response) => {
    dboperations.getPokemonTypes().then(result => {

        response.json(result[0]);
    })
});
// Search pokemons by name
router.route('/name/:nameValue').get((request, response) => {
    dboperations.getName(request.params.nameValue).then(result => {
        response.json(result[0]);
    })
});
//Search pokemons by value
router.route('/id/:idValue').get((request, response) => {
    dboperations.getName(request.params.idValue).then(result => {
        response.json(result[0]);
    })
});
//Upload pokemons
router.route('/upload').post((request, response) => {
    try {


        let http = require('http');
        let formidable = require('formidable');


        const fs = require('fs');
        const path = require('path');
        const axios = require('axios');
        const FormData = require('form-data');
        //Create an instance of the form object
        let form = new formidable.IncomingForm();
        var finalResult = null;
        let filename="pokemons.json";
        const templatePath = path.join(__dirname, '/../Pokemon');
        const filepath=templatePath+"\\"+ filename;

		fs.readFile(filepath, "utf8", (err, response) => {
    

            console.log('inside pokemone data loading');
            console.log(request.file);

            const data = JSON.parse(response);

            try {

                for (let j = 0; j < data.length; j++) {
                    var jsonParsedWaight = JSON.stringify(data[j].weight);
                    var newJson = JSON.parse(jsonParsedWaight);

                    var jsonParsedHeight = JSON.stringify(data[j].height);
                    var newJsonHeight = JSON.parse(jsonParsedHeight);

                    var newJsonEvolutionRequirements = { amount: 0, name: null };

                    if (data[j].evolutionRequirements != undefined && data[j].evolutionRequirements != null) {
                        var jsonParsedEvolutionRequirements = JSON.stringify(data[j].evolutionRequirements);
                        newJsonEvolutionRequirements = JSON.parse(jsonParsedEvolutionRequirements);
                    }
                    let pokemon = {
                        id: data[j].id, favourite: 0, name: data[j].name, classification: data[j].classification, types: data[j].types.toString(),
                        resistant: data[j].resistant.toString(), weaknesses: data[j].weaknesses.toString(), minimumWeight: newJson.minimum, maximumWeight: newJson.maximum,
                        minimumHeight: newJsonHeight.minimum, maximumHeight: newJsonHeight.maximum, fleeRate: data[j].fleeRate, EvolutionRequirementsName: newJsonEvolutionRequirements.name,
                        EvolutionRequirementsAmount: newJsonEvolutionRequirements.amount, maxCP: data[j].maxCP, maxHP: data[j].maxHP
                    }


                    //add Previous evolution(s)

                    console.log('this is id : ' + pokemon.id);
                    console.log('this is name : ' + pokemon.name);
                    console.log('this is classification : ' + pokemon.classification);
                    console.log('this is types : ' + pokemon.types);
                    console.log('this is resistant : ' + pokemon.resistant);
                    console.log('this is weaknesses : ' + pokemon.weaknesses);

                    console.log('this is Waight : ' + pokemon.minimumWeight + '  ' + pokemon.maximumWeight);

                    console.log('this is Height : ' + pokemon.minimumHeight + '  ' + pokemon.maximumHeight);

                    console.log('this is fleeRate : ' + pokemon.fleeRate);

                    console.log('this is EvolutionRequirements : ' + pokemon.EvolutionRequirementsName + '  ' + pokemon.EvolutionRequirementsAmount);

                    var jsonParsedEvolutions = JSON.stringify(data[j].evolutions);
                    if (jsonParsedEvolutions != undefined && jsonParsedEvolutions != null) {
                        var newJsonEvolutions = JSON.parse(jsonParsedEvolutions);
                        newJsonEvolutions.forEach(function (table) {
                            var tableId = table.id;
                            var tableName = table.name;
                            console.log('this is evolution id ' + tableId);
                            console.log('this is evolution name ' + tableName);
                        });

                        //attacks
                        //fast
                        var jsonParsedAttacks = JSON.stringify(data[j].attacks);
                        var newJsonAttacks = JSON.parse(jsonParsedAttacks);
                        console.log(newJsonAttacks);

                        newJsonAttacks.fast.forEach(function (table) {
                            var tableType = table.type;
                            var tableName = table.name;
                            var tableDamage = table.damage;
                            console.log('this is attacks type ' + tableType);
                            console.log('this is attacks name ' + tableName);
                            console.log('this is attacks damage ' + tableDamage);
                        });

                        //special                
                        newJsonAttacks.special.forEach(function (table) {
                            var tableType = table.type;
                            var tableName = table.name;
                            var tableDamage = table.damage;
                            console.log('this is attacks type ' + tableType);
                            console.log('this is attacks name ' + tableName);
                            console.log('this is attacks damage ' + tableDamage);
                        });
                    }

                    console.log('this is maxCP : ' + pokemon.maxCP);
                    console.log('this is maxHP : ' + pokemon.maxHP);

                    dboperations.addPokemon(pokemon).then(result => {
                        finalResult = result;

                    });
                }
            } catch (error) {
                console.log(error);
            }

        });



        const express = require('express');


    } catch (error) {
        console.log(error);
    }

});

var port = process.env.PORT || 8090;
app.listen(port);
