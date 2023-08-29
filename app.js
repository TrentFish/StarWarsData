const state = {
    characters: [],
    selectedCharacter: null
}

const charAllDiv = document.getElementById("charAllDiv");

async function fetchCharacterList(){
    const info = await fetch("https://swapi.dev/api/people/?page=2");
    const holocron = await info.json();
    console.log(holocron.results);
    state.characters = holocron.results;
    console.log(state);
}

fetchCharacterList();