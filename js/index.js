let endpoint = "https://api-football-standings.azharimm.site/leagues";
let container = document.getElementById('info');
let submitBtn = document.getElementById('submit');
let selectedLeague = document.getElementById('select-league');
let selectedYear = document.getElementById('select-year');
let league;// ita.1, ger.1, eng.1, fra.1, arg.1
let season; 
let data;

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (selectedLeague.value != '' && selectedYear.value != ''){
        league = selectedLeague.value;
        console.log(league);
        season = selectedYear.value;
        console.log(season);
        data = {
            'league': league,
            'season': season
        }
        getStandings(endpoint+encodeQueryData(data));
    }
})

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
        let fragment = document.createDocumentFragment();
        for (let team in response.data['standings']) {
            //console.log(response.data['standings'][team].team.name); // Shows the name of each team
            //console.log(response.data['standings'][team].team.logos[0].href); // Shows the logo of each team
            //let div = document.createElement('div');
            //div.classList.add('team-container');
            //let logo = document.createElement('img');
            let div = createDiv();
            let logo = div.firstElementChild; // Selecting the img tag
            logo.src = response.data['standings'][team].team.logos[0].href;
            //logo.classList.add('team-logo');
            //div.appendChild(logo);
           // let name = document.createElement('p');
            let name = div.lastElementChild; // selecting the p tag
            name.textContent = response.data['standings'][team].team.name;
            name.classList.add('team-name');
            //div.appendChild(name);
            fragment.appendChild(div);
        }
        if (document.getElementById('info').firstElementChild == ''){
            document.getElementById('info').appendChild(fragment); // Rendering in the HTML.
        } else {
            document.getElementById('info').textContent = ''; // Removing the previous teams/logos.
            document.getElementById('info').appendChild(fragment); // Rendering in the HTML.
        }
    } catch (error) {
        console.log(error);
    }
}

function encodeQueryData(data){
    let result = [];
        result.push(encodeURIComponent(data['league']) + '/standings?season=' + encodeURIComponent(data['season'])+'&sort=asc');
    return result;
}

const createDiv = () => {
    let div = document.createElement('div');
    div.classList.add('team-container');
    let logo = document.createElement('img');
    div.appendChild(logo);
    let name = document.createElement('p');
    name.classList.add('team-name');
    div.appendChild(name);
    return div;
}

endpoint = 'https://api-football-standings.azharimm.site/leagues/';
//console.log(endpoint+encodeQueryData(data));
//getLogo();
//getStandings(endpoint+encodeQueryData(data));


