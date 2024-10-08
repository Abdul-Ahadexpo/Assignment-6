function reloadPage() {
  location.reload();
}

function updateAdoptBox(pet) {
  document.getElementById("adopt-img").src = pet.image;
  document.getElementById("adopt-name").innerText = pet.name;
}

async function fetchData() {
  try {
    const petCardsContainer = document.getElementById("pet-cards");

    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/category/cat"
    );

    if (!response.ok) {
      throw new Error("Could not fetch pets");
    }

    const data = await response.json();
    const pets = data.pets;
    petCardsContainer.innerHTML = "";

    pets.forEach((pet) => {
      const petCard = `
        <div class="card w-80 bg-base-100 shadow-xl">
          <figure><img src="${pet.image}" alt="${pet.name}" /></figure>
          <div class="card-body">
            <h2 class="card-title">${pet.breed}</h2>
            <p><i class="fa-solid fa-border-all"></i> Breed: ${pet.breed}</p>
            <p><i class="fa-regular fa-calendar-days"></i> Birth: ${
              pet.date_of_birth
            }</p>
            <p><i class="fa-solid fa-venus-mars"></i> Gender: ${pet.gender}</p>
            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}$</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary bg-slate-100 text-emerald-700 hover:text-white" 
                onclick='updateAdoptBox(${JSON.stringify(pet)})'>
                Adopt
              </button>
              <button class="btn btn-primary bg-slate-100 text-emerald-700 hover:text-white" onclick='openModal(${JSON.stringify(
                pet
              )})'>Details</button>
            </div>
          </div>
        </div>
      `;

      petCardsContainer.innerHTML += petCard;
    });
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("button").onclick = function () {
  console.log("img-here");
};
