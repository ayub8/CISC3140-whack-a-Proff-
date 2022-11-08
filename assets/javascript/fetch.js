// intoroduce variables;
const url = `https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;languages`;

const allCapitals = [];
const allLanguages = [];
const allCurrencies = [];

const allCriteria = {
    capital: allCapitals,
    language: allLanguages,
    currency: allCurrencies,
}

const criteriaKeys = Object.keys(allCriteria);

let currentAnswer;
let randomCriteria;
let randomCountry;
let randomNumberBetweenOneAndTwo;
let winners;
let winner;
let place = 1;

//*** functions ***
//get a random country from the API
const getRandomCountry = async () => {
    return await fetch(url)
        .then(results => { return results.json(); })
        .then(data => {
            return data[Math.floor(Math.random() * (data.length))];
        });
}

//get all countries from the API
const getAllCountries = async () => {
    return await fetch(url)
        .then(results => { return results.json(); })
        .then(data => {
            return data;
        });
}

//saving all countries criteria from the API to use for the dropdown
const setAllCriteria = async () => {
    const allCountries = await getAllCountries();

    for (let country of allCountries) {
        if (!allCapitals.includes(country.capital))
            allCapitals.push(country.capital);
        if (!allLanguages.includes(country.languages[0].name))
            allLanguages.push(country.languages[0].name);
        if (!allCurrencies.includes(country.currencies[0].name))
            allCurrencies.push(country.currencies[0].name);
    }
}