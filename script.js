let petData = [];

// Simulate loading by waiting for at least 2 seconds
function simulateLoading() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

// Fetch all pets on page load
async function fetchAllPets() {
  showLoadingSpinner(); // Show loading spinner

  const url = "https://openapi.programming-hero.com/api/peddy/pets";

  await simulateLoading(); // Simulate API delay
  hideLoadingSpinner(); // Hide loading spinner

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch all pets");

    const { pets } = await response.json();
    petData = pets;
    displayPets(petData); // Display pets once data is fetched
  } catch (error) {
    console.error("Error loading all pets:", error);
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
              onclick='showAdoptPopup(${JSON.stringify(pet).replace(
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

// Call the function to fetch all pets when the page loads
window.onload = function () {
  fetchAllPets(); // Fetch and display all pets
};

// Sort pets by price
function sortByPrice() {
  showLoadingSpinner(); // Show loading spinner

  setTimeout(() => {
    const sortedPets = [...petData].sort((a, b) => b.price - a.price);
    hideLoadingSpinner(); // Hide loading spinner
    displayPets(sortedPets);
  }, 2000); // Wait for 2 seconds before displaying sorted data
}

// Show adopt popup with countdown
function showAdoptPopup(pet) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded shadow-md">
        <h2 class="text-xl font-bold mb-4">Adopting ${pet.pet_name}...</h2>
        <p>Closing in <span id="countdown">3</span> seconds...</p>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  let countdown = 3;
  const countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById("countdown").innerText = countdown;

    if (countdown === 0) {
      clearInterval(countdownInterval);
      document.body.removeChild(popup);
    }
  }, 1000);
}

// Show loading spinner
function showLoadingSpinner() {
  const spinner = document.createElement("div");
  spinner.className =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";
  spinner.innerHTML = '<span class="loading loading-bars loading-lg"></span>';
  spinner.id = "loading-spinner";
  document.body.appendChild(spinner);
}

// Hide loading spinner
function hideLoadingSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.remove();
  }
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

// Fetch category data based on button click
async function fetchCategoryData(category) {
  showLoadingSpinner(); // Show loading spinner

  let url = "";
  switch (category) {
    case "cat":
      url = "https://openapi.programming-hero.com/api/peddy/category/cat";
      break;
    case "dog":
      url = "https://openapi.programming-hero.com/api/peddy/category/dog";
      break;
    case "bird":
      url = "https://openapi.programming-hero.com/api/peddy/category/bird";
      break;
    case "rabbit":
      url = "https://openapi.programming-hero.com/api/peddy/category/rabbit";
      break;
    default:
      console.error("Unknown category:", category);
      return;
  }

  await simulateLoading(); // Simulate API delay
  hideLoadingSpinner(); // Hide loading spinner

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch pets");

    const { pets } = await response.json();
    petData = pets;
    displayPets(petData); // Display pets once data is fetched
  } catch (error) {
    console.error("Error loading pet data:", error);
  }
}

// Event listeners for category buttons
document
  .getElementById("cat-button")
  .addEventListener("click", () => fetchCategoryData("cat"));
document
  .getElementById("dog-button")
  .addEventListener("click", () => fetchCategoryData("dog"));
document
  .getElementById("bird-button")
  .addEventListener("click", () => fetchCategoryData("bird"));
document
  .getElementById("rabbit-button")
  .addEventListener("click", () => fetchCategoryData("rabbit"));
