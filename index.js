// Write Javascript Here

const baseUrl = "http://localhost:3000/users"
const headers = {
  "Content-type": "application/json; charset=UTF-8"
}

getUsersRequest().then((users) => {
  //This function has been implemented already for you
  const tableEl = document.getElementById("table")
  for (const user of users) {
    tableEl.appendChild(createTableRow(user))
  }
})

function addNewUser() {
  let user = prompt("Add New User")
  if (user) {
    const data = {
      name: user
    }
    createUserRequest(data)
  }
}

function editUser(id, userName) {
  let user = prompt("Edit  User", userName)
  let data = {
    id: id,
    name: user
  }
  updateUserRequest(data)
}

function deleteUser(id) {
  let text = "Are you sure you want to delete this entry!"
  if (confirm(text) == true) {
    deleteUserRequest(id)
  } else {
  }
}

//CRUD HELPER METHODS
function createUserRequest(user) {
  return fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(user)
  }).then((response) => {
    response.json()

    location.reload()
  })
}

function getUsersRequest() {
  return fetch(baseUrl, {
    method: "GET"
  }).then((response) => response.json())
}

function deleteUserRequest(id) {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE"
  }).then((response) => {
    response.json()
    location.reload()
  })
}

function updateUserRequest(user) {
  return fetch(`${baseUrl}/${user.id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(user)
  }).then((response) => {
    response.json()
    location.reload()
  })
}

//HELPER METHODS
function createTableRow(user) {
  var tr = document.createElement("tr")
  tr.innerHTML = `<td>${user.name}</td> <td><a href="#" onclick="editUser(${user.id}, '${user.name}')">Edit</a> / <a href="#" onclick="deleteUser(${user.id})">Delete</a></td>`
  return tr
}
