let contacts = {};

function showAddContact() {
  document.getElementById("form-section").classList.remove("hidden");
  document.getElementById("search-section").classList.add("hidden");
  document.getElementById("contacts-list").classList.add("hidden");
  document.getElementById("form-title").textContent = "Add Contact";
}

function viewContacts() {
  const contactsList = document.getElementById("contacts-list");
  contactsList.innerHTML = "";

  if (Object.keys(contacts).length === 0) {
    contactsList.innerHTML = "<p>No contacts available.</p>";
  } else {
    for (const [name, details] of Object.entries(contacts)) {
      const contactDiv = document.createElement("div");
      contactDiv.classList.add("contact-item");

      contactDiv.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${details.phone}</p>
        <p><strong>Email:</strong> ${details.email}</p>
        <button onclick="deleteContact('${name}')">Delete</button>
      `;
      contactsList.appendChild(contactDiv);
    }
  }

  contactsList.classList.remove("hidden");
  document.getElementById("form-section").classList.add("hidden");
  document.getElementById("search-section").classList.add("hidden");
}

function saveContact() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !phone || !email) {
    alert("Please fill in all fields.");
    return;
  }

  contacts[name] = { phone, email };
  alert(`Contact '${name}' added successfully.`);
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}

function showSearchContact() {
  document.getElementById("search-section").classList.remove("hidden");
  document.getElementById("form-section").classList.add("hidden");
  document.getElementById("contacts-list").classList.add("hidden");
}

function searchContact() {
  const searchName = document.getElementById("search-name").value.trim();
  const resultDiv = document.getElementById("search-result");
  resultDiv.innerHTML = "";

  if (contacts[searchName]) {
    const details = contacts[searchName];
    resultDiv.innerHTML = `
      <p><strong>Name:</strong> ${searchName}</p>
      <p><strong>Phone:</strong> ${details.phone}</p>
      <p><strong>Email:</strong> ${details.email}</p>
    `;
  } else {
    resultDiv.innerHTML = `<p>No contact found with the name '${searchName}'.</p>`;
  }
}

function deleteContact(name) {
  delete contacts[name];
  alert(`Contact '${name}' deleted successfully.`);
  viewContacts();
}
