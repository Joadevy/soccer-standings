/* --------------- Getting page elements --------------- */
let container = document.getElementById('info');
let selectedLeague = document.getElementById('select-league');
let selectedYear = document.getElementById('select-year');


/* --------------- Handling the event listeners --------------- */

// Setting the listener for each select to start the requests.
selectedYear.addEventListener("click", () => startRequest());
selectedLeague.addEventListener("click", () => startRequest());


/* --------------- Handling API data requests --------------- */

// Saves the league and season that the user has entered and calls the function for the request.
const startRequest = () => {
    let endpoint = 'https://api-football-standings.azharimm.site/leagues/';
    if (selectedLeague.value != '' && selectedYear.value != ''){ // I think It should check if the new request is different than the previous
        let league = selectedLeague.value; // ita.1, ger.1, eng.1, fra.1, arg.1, bra.1
        let season = selectedYear.value;
        let data = {
            'league': league,
            'season': season
        }
        getStandings(endpoint+encodeQueryData(data),data.league);
    }
}

// Appends the name and logo for each team into the DOM.
const getStandings = async(endpoint,league) => {
    try {
        let request = await fetch(endpoint);
        let response = await request.json();
        let fragment = document.createDocumentFragment();
        for (let team in response.data['standings']) {
            let div = createDiv_With_Logo_And_Name();
            let name;
            if (team == 0) {
                let champion = document.createElement('p');
                translateChampion(champion,league);
                champion.classList.add('champion-text');
                div.appendChild(champion);
                name = div.lastElementChild.previousSibling; // selecting the p tag
            } else {
                name = div.lastElementChild
            }
            let logo = div.firstElementChild; // Selecting the img tag
            logo.src = response.data['standings'][team].team.logos[0].href; // linking the team logo's from the API.
            name.textContent = response.data['standings'][team].team.name; // Linking the team name's from the API.
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

// Makes the GET request URL
function encodeQueryData(data){
    let result = [];
        result.push(encodeURIComponent(data['league']) + '/standings?season=' + encodeURIComponent(data['season'])+'&sort=asc');
    return result;
}

/* ---------------  General functions --------------- */

// Add the 'champion' in the language of the league.
const translateChampion = (element,league) => {
    if (league == 'arg.1'){
        element.textContent = 'Campeón';
    } else if (league  == 'ger.1'){
        element.textContent = 'Siéger';
    } else if (league  == 'ita.1'){
        element.textContent = 'Campione';
    } else if (league  == 'bra.1'){
        element.textContent = 'Campeão';
    } else { 
        element.textContent = 'Champion'; // for eng.1 && fra.1
    }
}

// Creating the function for handling the elements of the API response (logo and name of each team)
const createDiv_With_Logo_And_Name= () => {
    let div = document.createElement('div');
    div.classList.add('team-container');
    let logo = document.createElement('img');
    logo.classList.add('team-logo');
    div.appendChild(logo);
    let name = document.createElement('p');
    name.classList.add('team-name');
    div.appendChild(name);
    return div;
}


