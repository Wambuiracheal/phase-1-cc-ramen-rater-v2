// index.js
let url = "http://localhost:3000/ramens";

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(ramen => {
      displayRamens(ramen);
    });
  })
  .catch(error => console.log(error));

// Callbacks
function handleSubmit(e) {
  e.preventDefault();

  const newRamen = {
    name: document.querySelector("#new-name").value,
    restaurant: document.querySelector("#new-restaurant").value,
    image: document.querySelector("#new-image").value,
    rating: document.querySelector("#new-rating").value,
    comment: document.querySelector("#new-comment").value
  };

  const ramenMenuDiv = document.getElementById('ramen-menu');

  // Add new ramen image to the menu
  const ramenFoods = document.createElement("div");
  ramenFoods.classList.add("ramen");
  ramenFoods.innerHTML = `
    <img src="${newRamen.image}" alt="${newRamen.name}">
  `;
  ramenMenuDiv.appendChild(ramenFoods);

  // Attach click event to the ramen
  const img = ramenFoods.querySelector('img');
  if (img) {
    img.addEventListener('click', (e) => {
      handleClick(newRamen, e);
    });
  } else {
    console.error('Image not found in the DOM');
  }

  // Reset form after submission
  event.target.reset();
}

// Adding the submit listener
function addSubmitListener(form) {
  form.addEventListener('submit', handleSubmit);
}

// Main function to set everything up
function main() {
  let ramenForm = document.getElementById('new-ramen');
  addSubmitListener(ramenForm);

  // Load existing ramens from db.json
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(ramen => {
        displayRamens(ramen);
      });
    })
    .catch(error => console.log(error));
}

// Displaying the ramen when the page loads
function displayRamens(ramen) {

  let ramenFoods = document.createElement("div");
  ramenFoods.classList.add("ramen");
  ramenFoods.innerHTML = `
    <img src="${ramen.image}" alt="${ramen.name}">
  `;

  let ramenList = document.getElementById('ramen-menu');
  ramenList.appendChild(ramenFoods);

  // Add click event to the image
  let img = ramenFoods.querySelector('img');
  img.addEventListener('click', () => handleClick(ramen));

  console.log(ramen)
}

function handleClick(ramen){
    // Get the div where you want to display the details
    let ramenDetail = document.getElementById("ramen-detail");
    ramenDetail.innerHTML = `
        <img src="${ramen.image}" alt="Image of ${ramen.name}" style="width:200px; height:auto;">
        <h2>${ramen.name}</h2>
        <h3>${ramen.restaurant}</h3>
    `;
}
// Invoke the main function
// main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
