console.log("JS connected!");

const pets = [
    {name:'Nova', species:'Cat', breed:'Bengal', age: 6, image:'/images/nova.JPG'},
    {name:'Piper', species:'Dog', breed:'Cavapoo', age: 4, image:'/images/piper.jpg'},
    {name:'Penny', species:'Dog', breed:'Cavapoo', age: 4,image:'/images/penny.JPG'},
    {name:'Mazie', species:'Dog', breed:'Pit Bull mix', age: 6, image:'/images/mazie.JPG'}
]

//Favorite array and logic
let favorites = [];
let showFavoritesOnly = false;
function toggleFavorite(petName) {
    if(favorites.includes(petName)) {
        // Remove if favorited already
        favorites = favorites.filter(name => name !== petName); 
    } else {
        //add
        favorites.push(petName);
    }
        renderPets(pets);
}

//Finds HTML element, stores it into that part of the page
const showFavsBtn = document.getElementById('show-favorites-btn');
const gallery = document.getElementById('pet-gallery'); 
const speciesFilter = document.getElementById('species-filter');
const ageFilter = document.getElementById('age-filter');

function renderPets(petArray) {
    gallery.innerHTML = '';
    //Creating new card for every new object(pet)
    petArray.forEach(pet=> {
        const petCard = document.createElement('div');
        petCard.classList.add('pet-card');

        const isFavorite = favorites.includes(pet.name);

        //Details shown on the card
        petCard.innerHTML  = `
            <img src = "${pet.image}" alt = "Picture of ${pet.name}">
            <h3> ${pet.name} - ${pet.age} years old </h3> 
            <p>${pet.species} - ${pet.breed}</p>
            <button class = "fav-btn ${isFavorite ? 'active' : ''}">
            ${isFavorite ? '★' : '☆'}
            </button> 
        `;
        const favBtn = petCard.querySelector('.fav-btn');
        favBtn.addEventListener('click', () => toggleFavorite(pet.name));
    
        gallery.appendChild(petCard);
    });
}

//Filtering logic for age and species
function filterPets() {
    const species = speciesFilter.value;
    const age = ageFilter.value;

    const filtered = pets.filter(pet => {
        const matchesSpecies = species === "All"|| pet.species === species;
        const matchesAge = age === "All" || pet.age == age;
        return matchesSpecies && matchesAge;
    });
    if (showFavoritesOnly) {
        filtered = filtered.filter(pet => favorites.includes(pet.name));
    }

    renderPets(filtered);
}
showFavsBtn.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;

    showFavsBtn.textContent = showFavoritesOnly ? "Show All Pets" : "Show Favorites";

    filterPets();
});
speciesFilter.addEventListener("change", filterPets); 
ageFilter.addEventListener("change", filterPets);

renderPets(pets);

