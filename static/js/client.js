
async function addPlayer(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  console.log("Inserting: " + name + "   " + password);

  const json = JSON.stringify({ name, password });

  try {
    const response = await fetch("http://localhost:8081/addPlayers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json
    });

    if (response.ok) {
      const result = await response.json();

      // show success popup
      showPopup("Player added successfully");

      // clear inputs
      document.getElementById("name").value = "";
      document.getElementById("password").value = "";

      localStorage.setItem('playerJson', JSON.stringify(result))

      console.log(localStorage.getItem('playerJson'))

      window.location.href = "/waiting.html"

    } else {
      showPopup("Failed to add player");
    }
  } catch (err) {
    showPopup("Error in pushing: " + err.message);
  }
}

// Tailwind popup helper
function showPopup(message) {
  const popup = document.createElement("div");
  popup.className =
    "fixed bottom bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce";
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000); // remove after 3 seconds
}

