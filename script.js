let petData = [];

async function fetchCategoryData(category) {
  let url = "";

  switch (category) {
    case "cats":
      url = "https://openapi.programming-hero.com/api/peddy/category/cat";
      break;
    case "dogs":
      url = "https://openapi.programming-hero.com/api/peddy/category/dog";
      break;
    case "birds":
      url = "https://openapi.programming-hero.com/api/peddy/category/bird";
      break;
    case "rabbits":
      url = "https://openapi.programming-hero.com/api/peddy/category/rabbit";
      break;
    default:
      console.error("Unknown category:", category);
      return;
  }

  await fetchData(url);
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch pets");

    const { pets } = await response.json();
    petData = pets;
    displayPets(petData);
  } catch (error) {
    console.error("Error loading pet data:", error);
  }
}

function displayPets(pets) {
  const petCardsContainer = document.getElementById("pet-cards");
  petCardsContainer.innerHTML = "";

  pets.forEach((pet) => {
    const petCard = `
      <div class="card w-80 bg-base-200 shadow-xl">
        <figure><img src="${pet.image}" alt="${pet.name}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${pet.pet_name}</h2>
          <p><i class="fa-solid fa-border-all"></i> Breed: ${
            pet.breed || "Unknown"
          }</p>
          <p><i class="fa-regular fa-calendar-days"></i> Birth: ${
            pet.date_of_birth || "Unknown"
          }</p>
          <p><i class="fa-solid fa-venus-mars"></i> Gender: ${
            pet.gender || "Unknown"
          }</p>
          <p><i class="fa-solid fa-dollar-sign"></i> Price: ${
            pet.price ? `${pet.price} BDT` : "Contact for price"
          }</p>
          <div class="card-actions justify-end">
            <i class="fa-regular fa-thumbs-up fa-lg relative top-[25px] left-[-50px] cursor-pointer"></i>
            <button class="btn btn-primary bg-slate-100 text-emerald-700 hover:text-white" 
              onclick='updateAdoptBox(${JSON.stringify(pet).replace(
                /"/g,
                "&quot;"
              )})'>
              Adopt
            </button>
            <button class="btn btn-primary bg-slate-100 text-emerald-700 hover:text-white" 
              onclick='openModal(${JSON.stringify(pet).replace(
                /"/g,
                "&quot;"
              )})'>
              Details
            </button>
          </div>
        </div>
      </div>
    `;
    petCardsContainer.innerHTML += petCard;
  });
}

function sortByPrice() {
  const sortedPets = [...petData].sort((a, b) => b.price - a.price);
  displayPets(sortedPets);
}

function reloadPage() {
  location.reload();
}

function updateAdoptBox(pet) {
  document.getElementById("adopt-img").src = pet.image;
  document.getElementById("adopt-name").innerText = pet.pet_name;
}

function openModal(pet) {
  document.getElementById("modal-title").innerText = pet.pet_name;
  document.getElementById("modal-img").src = pet.image;
  document.getElementById("modal-breed").innerText = `Breed: ${
    pet.breed || "Unknown"
  }`;
  document.getElementById("modal-birth").innerText = `Birth: ${
    pet.date_of_birth || "Unknown"
  }`;
  document.getElementById("modal-gender").innerText = `Gender: ${
    pet.gender || "Unknown"
  }`;
  document.getElementById("modal-price").innerText = `Price: ${
    pet.price ? `${pet.price} BDT` : "Contact for price"
  }`;
  document.getElementById("pet-modal").classList.add("modal-open");
}

function closeModal() {
  document.getElementById("pet-modal").classList.remove("modal-open");
}

fetchData("https://openapi.programming-hero.com/api/peddy/pets");
