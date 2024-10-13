let url = "http://localhost:3000/ramens";
document.addEventListener("DOMContentLoaded", () => {
  main();
});

// Main function to set everything up
function main() {
  addSubmitListener();
  
  // display db.json
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(ramen => {
        displayRamens(ramen);
      });

      // Display the first ramen details
      if (data.length > 0) {
        handleClick(data[0]); // Show details for the first ramen
      }
    })
    .catch(error => console.log(error));
}

// Displaying the ramen when the page loads
function displayRamens(ramen) {
  let ramenFoods = document.createElement("div");
  ramenFoods.classList.add("ramen");
  
  let img = document.createElement("img");
  img.src = ramen.image;
  img.addEventListener('click', () => handleClick(ramen));

  let name = document.createElement("p");
  name.textContent = ramen.name;

  // Add delete button
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener('click', () => handleDelete(ramen.id, ramenFoods));

  ramenFoods.appendChild(img);
  ramenFoods.appendChild(name);
  ramenFoods.appendChild(deleteButton); // Append delete button

  let ramenList = document.getElementById("ramen-menu");
  ramenList.appendChild(ramenFoods);
}

// Click callback
function handleClick(ramen) {
  let ramenDetail = document.getElementById("ramen-detail");
  ramenDetail.innerHTML = `
      <img src="${ramen.image}" alt="Image of ${ramen.name}" style="width:200px; height:auto;">
      <form id="update-form">
        <h4>Rating: <input type="number" name="rating" value="${ramen.rating || ""}" /></h4>
        <p>Comment: <input type="text" name="comment" value="${ramen.comment || ""}" /></p>
        <button type="submit">Update</button>
      </form>
  `;
  
  // Add event listener for the update form
  document.getElementById("update-form").addEventListener("submit", (event) => {
    event.preventDefault();
    updateRamen(ramen.id);
  });
}

// Adding the submit listener (POST)
function addSubmitListener() {
  document.getElementById("new-ramen").addEventListener("submit", (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const newData = {
      name: formdata.get('name'),
      restaurant: formdata.get('restaurant'),
      image: formdata.get('image'),
      rating: formdata.get('rating'),
      comment: formdata.get('new-comment')
    };

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newData)
    })
      .then(response => response.json())
      .then(() => {
        displayRamens(newData);
      })
      .catch(error => console.log(error));
  });
}

// Handle deletion of ramen
function handleDelete(id, ramenDiv) {
  fetch(`${url}/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      ramenDiv.remove(); // Remove the ramen from the DOM
      console.log(`Ramen with id ${id} deleted`);
    })
    .catch(error => console.log(error));
}

// Update ramen functionality
function updateRamen(id) {
  const ramenDetail = document.getElementById("ramen-detail");
  const rating = ramenDetail.querySelector('input[name="rating"]').value;
  const comment = ramenDetail.querySelector('input[name="comment"]').value;

  const updatedData = {
    rating,
    comment
  };

  fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(updatedData)
  })
    .then(() => {
      console.log(`Ramen with id ${id} updated`);
      // Optionally refresh the ramen details in the UI
      handleClick({ ...updatedData, id });
    })
    .catch(error => console.log(error));
}

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
