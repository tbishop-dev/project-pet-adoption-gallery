console.log("JS connected!");


const pets = [
    {name:'Nova', species:'Cat', breed:'Bengal', age: 6, image:'/images/nova.JPG'},
    {name:'Piper', species:'Dog', breed:'Cavapoo', age: 4, image:'/images/piper.jpg'},
    {name:'Penny', species:'Dog', breed:'Cavapoo', age: 4,image:'/images/penny.JPG'},
    {name:'Mazie', species:'Dog', breed:'Pit Bull mix', age: 6, image:'/images/mazie.JPG'}
]

let favorites = [];
function toggleFavorite(petName) {
    if(favorites.includes(petName)) {
        // Remove if favorited already
        favorites = favorites.filter(name => name !== petName); 
    } else {
        //add it if not
        favorites.push(petName);
    }
        renderPets(pets);
}

const gallery = document.getElementById('pet-gallery'); //Finds HTML element, stores it into that part of the page

pets.forEach(pet=> {
    const petCard = document.createElement('div');
    petCard.classList.add('pet-card');

    petCard.innerHTML = `
        <img src='${pet.image}' alt = 'Picture of ${pet.name}'>
        <h3>${pet.name} - ${pet.age} years old</h3>
        <p>${pet.species} - ${pet.breed}</p>
    `;
    gallery.appendChild(petCard);
});

const searchBar = document.getElementById('search-bar');

const speciesFilter = document.getElementById('species-filter');
const ageFilter = document.getElementById('age-filter');

function renderPets(petArray) {
    gallery.innerHTML = '';

    petArray.forEach(pet=> {
        const petCard = document.createElement('div');
        petCard.classList.add('pet-card');

        petCard.innerHTML  = `
            <img src = "${pet.image}" alt = "Picture of ${pet.name}">
            <h3> ${pet.name}</h3> 
            <p>${pet.species}</p> 
        `;
        gallery.appendChild(petCard);
    });
}

function filterPets() {
    const species = speciesFilter.value;
    const age = ageFilter.value;

    const filtered = pets.filter(pet => {
        const matchesSpecies = species === "All"|| pet.species === species;
        const matchesAge = age === "All" || pet.age == age;
        return matchesSpecies && matchesAge;
    });
    renderPets(filtered);
}

speciesFilter.addEventListener("change", filterPets); 
ageFilter.addEventListener("change", filterPets);

