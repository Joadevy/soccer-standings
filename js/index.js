/* --------------- Getting page elements --------------- */
let container = document.getElementById('info');
let selectedLeague = document.getElementById('select-league');
let selectedYear = document.getElementById('select-year');
let main = document.getElementById('main');
let notPodiumContainer = document.getElementById('notpodium');
let podiumContainer = document.getElementById('podium');
let landingImage = document.getElementById('landingimg');


/* --------------- Event listeners --------------- */

// Setting the listener for each select to start the requests.
selectedYear.addEventListener("input", () => startRequest());
selectedLeague.addEventListener("input", () => startRequest());
landingImage.addEventListener("click",() => displayMain());


/* --------------- Handling API data requests --------------- */

// Saves the league and season that the user has entered and calls the function for the request.
const startRequest = () => {
    let endpoint = 'https://api-football-standings.azharimm.dev/leagues/';
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
        displayError();
    }
}

// Makes the GET request URL
function encodeQueryData(data){
    let result = [];
        result.push(encodeURIComponent(data['league']) + '/standings?season=' + encodeURIComponent(data['season'])+'&sort=asc');
    return result;
}

/* ---------------  General functions --------------- */

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
            notPodium(arrayNotPodium);
            podium(winner,secondplace,thirdplace); 
}

// Adding teams into a fragment.
const addTeams = (array) =>{
    let fragment = document.createDocumentFragment();
    for (let team in array) {
                    let div = createDiv_With_Logo_And_Name();
                    let name = div.lastElementChild;
                    let logo = div.firstElementChild; // Selecting the img tag
                    logo.src = array[team].team.logos[0].href; // linking the team logo's from the API.
                    name.textContent = array[team].team.name; // Linking the team name's from the API.
                    fragment.appendChild(div);
    }
    return fragment
}

// Displaying teams
const printTeams = (fragment,typeTeams) => {
    if (typeTeams == 'notpodium'){
        if (notPodiumContainer.firstElementChild != ''){
            notPodiumContainer.textContent = ''; // Removing the previous teams/logos.
        } 
        notPodiumContainer.appendChild(fragment); // Rendering in the HTML.
    } else if (typeTeams == 'podium'){
        if (podiumContainer.firstElementChild != ''){
            podiumContainer.textContent = '';
        } 
        podiumContainer.appendChild(fragment); // Rendering in the HTML.
        addChampionText(podiumContainer.firstElementChild)
    }
}

// Add the 'champion' for the first element.
const addChampionText = (fatherElement) => {
    let element = document.createElement('p');
    element.classList.add('champion-text');
    if (selectedLeague.value == 'eng.1'|| selectedLeague.value == 'fra.1'){
        element.textContent = 'Champion';
    } else if (selectedLeague.value =='ita.1'){
        element.textContent = 'Campione';
    } else if (selectedLeague.value =='ger.1'){
        element.textContent = 'Meister';
    } else if (selectedLeague.value =='arg.1'){
        element.textContent = 'Campeón';
    } else if (selectedLeague.value =='bra.1'){
        element.textContent = 'Campeão';
    } 
    fatherElement.appendChild(element);
}

// Handling the podium teams.
const podium = (...arrPodium) => {
    let fragment = addTeams(arrPodium);
    printTeams(fragment,'podium');
}

// Handling the not podium teams.
const notPodium = (array) => {
    let fragment = addTeams(array);
    printTeams(fragment,'notpodium');
}

// Handling the landing ball image
const displayMain = () => {
    setTimeout(() => main.classList.replace('hidden','displaying'),500)
    landingImage.classList.toggle('landingimgopacity'),false;
    setTimeout(() => landingImage.style.display = 'none',1500)
}

// Displaying a 404 error if there is not data returned from the request.
const displayError = () => {
    if (notPodiumContainer.firstElementChild != ''){
        notPodiumContainer.textContent = ''; // Removing the previous teams/logos.
        podiumContainer.textContent = '';
    }
    let img = document.createElement('img');
    img.src = '../assets/img/404-transformed.png';
    img.classList.add('image-404');
    let text = document.createElement('p');
    text.textContent = 'There is no data available for this, please try with another season :('
    text.classList.add('text-404');
    notPodiumContainer.appendChild(text);
    notPodiumContainer.appendChild(img); // Rendering in the HTML.
}
