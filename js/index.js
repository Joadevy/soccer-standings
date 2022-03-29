/* --------------- Getting page elements --------------- */
let container = document.getElementById('info');
let selectedLeague = document.getElementById('select-league');
let selectedYear = document.getElementById('select-year');
let notPodiumContainer = document.getElementById('notpodium');
let podiumContainer = document.getElementById('podium');


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
        getData(endpoint+encodeQueryData(data));
    }
}

// Gets the data and stores it in an array.
const getData = async(endpoint) => {
    try {
        let request = await fetch(endpoint);
        let response = await request.json();
        let arrayDataTeams = [];
        for (let team in response.data['standings']) {
            arrayDataTeams.push(response.data['standings'][team]);
        }
        filterTeams(arrayDataTeams);
    } catch (error) {
        console.log(error); // There will display an screen with the error.
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

// Filtering by podium or not teams.
const filterTeams = (arrayTeams) => {
            const [winner,secondplace,thirdplace, ...arrayNotPodium] = arrayTeams; // Creating the variables using destructuring
            addTeams(arrayNotPodium,'notpodium');
            podium(winner,secondplace,thirdplace); 
}

const addTeams = (array,typeTeams) =>{
    let fragment = document.createDocumentFragment();
    for (let team in array) {
                    let div = createDiv_With_Logo_And_Name();
                    let name = div.lastElementChild;
                    let logo = div.firstElementChild; // Selecting the img tag
                    logo.src = array[team].team.logos[0].href; // linking the team logo's from the API.
                    name.textContent = array[team].team.name; // Linking the team name's from the API.
                    fragment.appendChild(div);
    }
    if (typeTeams == 'podium'){

    } else if (typeTeams == 'notpodium'){
        printNotPodium(fragment);
    }
}

const printNotPodium = (fragment) => {
    if (notPodiumContainer.firstElementChild == ''){
        notPodiumContainer.appendChild(fragment); // Rendering in the HTML.
    } else {
        notPodiumContainer.textContent = ''; // Removing the previous teams/logos.
        notPodiumContainer.appendChild(fragment); // Rendering in the HTML.
    }
}

// Handling the podium
const podium = (...arrPodium) => {
    console.log(arrPodium); // Its an array with the winner, second and thirdplace
    //console.log(winner.team.logos[0].href);
    console.log(winner.team.name);
    console.log(secondplace.team.name);
    console.log(thirdplace.team.name);
    //console.log(secondplace,thirdplace);
}
