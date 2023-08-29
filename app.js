const state = {
    characters: [],
    selectedCharacter: null
}

const charDiv = document.getElementById("charDiv");
console.log(charDiv);

const charAllDiv = document.getElementById("charAllDiv");
console.log(charAllDiv);

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
    
}

render()