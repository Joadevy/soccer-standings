let endpoint = "https://api-football-standings.azharimm.site/leagues";
body = document.getElementById('body');
container = document.getElementById('info');

/* const getLogo = async() => {
    try {
        let request = await fetch(endpoint);
        let response = await request.json();
        let img = document.createElement('img');
        img.src = response.data[5].logos.light;
        document.getElementById('info').appendChild(img);
    } catch (error) {
        console.log(error);
    }
} */

const getStandings = async(endpoint) => {
    try {
        let request = await fetch(endpoint);
        let response = await request.json();
        let fragment =document.createDocumentFragment();
        for (let team in response.data['standings']) {
            console.log(response.data['standings'][team].team.name); // Shows the name of each team
            console.log(response.data['standings'][team].team.logos[0].href); // Shows the logo of each team
            let div = document.createElement('div');
            div.classList.add('team-container');
            let logo = document.createElement('img');
            logo.src = response.data['standings'][team].team.logos[0].href;
            logo.classList.add('team-logo');
            div.appendChild(logo);
            let name = document.createElement('p');
            name.textContent = response.data['standings'][team].team.name;
            name.classList.add('team-name');
            div.appendChild(name);
            fragment.appendChild(div);
        }
        document.getElementById('info').appendChild(fragment); // Rendering in the HTML.
    } catch (error) {
        console.log(error);
    }
}

function encodeQueryData(data){
    let result = [];
        result.push(encodeURIComponent(data['league']) + '/standings?season=' + encodeURIComponent(data['season'])+'&sort=asc');
    return result;
}

let league = 'fra.1'; // ita.1, ger.1, eng.1, fra.1, arg.1
let season = '2019';

let data = {
    'league': league,
    'season': season
}

endpoint = 'https://api-football-standings.azharimm.site/leagues/';
console.log(endpoint+encodeQueryData(data));
//getLogo();
getStandings(endpoint+encodeQueryData(data));