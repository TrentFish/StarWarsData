const state = {
    characters: [],
    selectedCharacter: null
}

const charDiv = document.getElementById("charDiv");
console.log(charDiv);

const charAllDiv = document.getElementById("charAllDiv");
console.log(charAllDiv);

window.addEventListener("hashchange", () => {
    selectCharacter();
})

function selectCharacter(){
    
    getEventFromHash();
    renderCharacterDetails();
}

function getEventFromHash(){
    const name = window.location.hash.slice(1);
    /*if(name.includes("%20")){
        name = name.replaceAll("%20", " ");

        console.log("eventhash ", name);
    }*/

    const selectedCharacter = state.characters.find((character) => {
        return character.name === name;
    })

    state.selectedCharacter = selectedCharacter
    console.log(state)
}

function renderCharacterDetails(){
    if(state.selectedCharacter){
        getOneCharacter()
    }
}

async function getOneCharacter(){
    const characterdata = await fetch(`${state.selectedCharacter.url}`);
    const oneCharData = await characterdata.json();
    state.selectedCharacter = oneCharData;
    console.log("state --> ", state);
    /*const birthday = state.selectedCharacter.map((birth_year) => {
        console.log(birth_year);
        return `<p> ${ability.birth_year}</p>`;
    })*/
    
    charDiv.innerHTML = `<h1>${state.selectedCharacter.name}</h1>`
    
}


function renderCharacterList() {
    const allChar = state.characters.map((character) => {
        return `
        <div><a href=#${character.name}> ${character.name} </a></div>
        `
    })
    charAllDiv.innerHTML = allChar.join('');
}

async function fetchCharacterList(){
    const info = await fetch("https://swapi.dev/api/people/?page=2");
    const holocron = await info.json();
    console.log(holocron.results);
    state.characters = holocron.results;
    console.log("state -->", state);
}

async function render(){
    await fetchCharacterList()
    renderCharacterList()
    selectCharacter()
}

render()