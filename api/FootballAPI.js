// import axios from "axios";
import countries from "./fake/countries";
const fake = true
const options = {
    method: "GET",
    url: 'https://api-football-v1.p.rapidapi.com/v3/countries',
    headers: {
        'X-RapidAPI-Key': '82a352408amsh36940d78fb4e6a6p1c53c3jsn5cb311dc6f80',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

export async function getCountries() {
    if (fake) {
        return countries
    }
    // const response = await axios.request(options).then(function (response) {
    //     console.log(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });
    // return response
}
