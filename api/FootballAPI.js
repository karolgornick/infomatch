// import axios from "axios";
import countries from "./fake/countries";
import italyLeagues from "./fake/countryLeague/italy";
const fake = true
let options = {
    method: "GET",
    headers: {
        'X-RapidAPI-Key': '82a352408amsh36940d78fb4e6a6p1c53c3jsn5cb311dc6f80',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

export async function getCountries() {
    if (fake) {
        return countries
    }
    // options.url = 'https://api-football-v1.p.rapidapi.com/v3/countries'
    // const response = await axios.request(options).then(function (response) {
    //     console.log(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });
    // return response
}

export async function getCountryLeague(code) {
    if (fake) {
        if (code === 'IT') {
            return italyLeagues
        }
        return null
    }
    // options.url = 'https://api-football-v1.p.rapidapi.com/v3/leagues'
    // const response = await axios.request(options).then(function (response) {
    //     console.log(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });
    // return response
}
