let endpoint = "https://api-football-standings.azharimm.site/leagues";
body = document.getElementById('body');
container = document.getElementById('info');

const getLogo = async() => {
    try {
        let request = await fetch(endpoint);
        let response = await request.json();
        let img = document.createElement('img');
        img.src = response.data[5].logos.light;
        document.getElementById('info').appendChild(img);
    } catch (error) {
        console.log(error);
    }
}

const getStandings = async(endpoint) => {
    try {
        let request = await fetch(endpoint);
        let response = await request.json();
        let div = document.createElement('div');
        for (let team in response.data['standings']) {
            console.log(response.data['standings'][team].team.name);
        }
        document.getElementById('info').appendChild(div);
    } catch (error) {
        console.log(error);
    }
}

function encodeQueryData(data){
    let result = [];
        result.push(encodeURIComponent(data['league']) + '/standings?season=' + encodeURIComponent(data['season'])+'&sort=asc');
    return result;
}

let league = 'arg.1';
let season = '2019';

let data = {
    'league': league,
    'season': season
}

endpoint = 'https://api-football-standings.azharimm.site/leagues/';
console.log(endpoint+encodeQueryData(data));
getLogo();
getStandings(endpoint+encodeQueryData(data));