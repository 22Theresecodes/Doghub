let dogs = [];
const getDogs = async () => {
  let response = await fetch("https://dog.ceo/api/breeds/list");
  let data = await response.json();
  dogs = data.message;
  //console.log();
};
getDogs();

const randomButton = document.querySelector(".randomizeImg");
const cardContainer = document.querySelector(".grid-container");
const listContainer = document.querySelector(".breed-list");
const dateContainer = document.querySelector(".date-btn");

const fetchBreed = async (name) => {
  try {
    let response = await fetch(`https://dog.ceo/api/breed/${name}/images`);
    let data = await response.json();

    const breedImages = data.message;
    console.log(breedImages);
    //loop through the array
    breedImages.forEach((image, index) => {
        //create the grid element
        const card = document.createElement("div");
        card.innerHTML = `<div class="grid-container">
    <div class="grid-item">
    <img src="${image}" alt="dog pictures"/>
    </div>
    </div>`;
        cardContainer.appendChild(card);
      
    });
  } catch (error) {
    console.log(error);
  }
};

randomButton.addEventListener("click", () => {
  const breedName = dogs[Math.floor(Math.random() * dogs.length)];
  fetchBreed(breedName);
  //change the title
  const changeTitle = document.querySelector(".title");
  changeTitle.innerHTML = `<h3>${breedName} Breeds</h3>`;
  //remove child so that different breeds load each time
  while (cardContainer.hasChildNodes()) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
});

//number of outputs to be displayed
const select = document.getElementById("displayNumber");

const fetchNumberBreed = async (name, number) => {
  try {
    let response = await fetch(
      `https://dog.ceo/api/breed/${name}/images/random/${number}`
    );
    let data = await response.json();

    const breedImages = data.message;
    //loop through the array
    breedImages.forEach((image, index) => {
      //create the grid element
      const card = document.createElement("div");
      card.innerHTML = `<div class="grid-container">
    <div class="grid-item">
    <img src="${image}" alt="dog pictures"/>
    </div>
    </div>`;
      cardContainer.appendChild(card);
    });

    select.addEventListener("change", () => {
      // Get the value of the selected option
      const selectedValue = select.value;
      const breedName = dogs[Math.floor(Math.random() * dogs.length)];

      fetchNumberBreed(breedName, selectedValue);
      while (cardContainer.hasChildNodes()) {
        cardContainer.removeChild(cardContainer.firstChild);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//list of breeds

const fetchBreedList = async () => {
  try {
    let response = await fetch("https://dog.ceo/api/breeds/list");
    let data = await response.json();
    //  console.log(data)
    const breedList = data.message;
    console.log(breedList);
    //loop through the array
    breedList.forEach((item, index) => {
      //create the grid element
      const list = document.createElement("div");
      list.innerHTML = `<div class="breed-list">
      <button class="breed-button">${item}</button>
    </div>`;
      listContainer.appendChild(list);
    });
  } catch (error) {
    console.log(error);
  }
};
fetchBreedList();

dateContainer.textContent = new Date().toLocaleDateString("en-us", {
  year: "numeric",
  month: "long",
  day: "numeric",
});


fetchBreed("hound");