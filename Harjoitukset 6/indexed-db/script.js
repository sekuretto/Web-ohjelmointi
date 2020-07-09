var db;
const dbName = "MyFriends";

// init
function init() {
  createDatabase();
}

// open or create database if not exists
function createDatabase() {
  var request = indexedDB.open(dbName);
  request.onsuccess = function (event) {
    db = this.result;
    console.log("open_db done");
    showall();
  }
  request.onerror = function (event) {
    console.error("open_db:", event.target.errorCode);
  }
  request.onupgradeneeded = function (event) {
    console.log("open_db onupgradeneeded");
    var store = event.currentTarget.result.createObjectStore("friends", {
      keyPath: "id",
      autoIncrement: true
    });
    store.createIndex("nameIndex", "name", {
      unique: false
    });
    store.createIndex("emailIndex", "email", {
      unique: true
    });
  }
}

// delete whole database
function deleteDatabase() {
  var request = indexedDB.deleteDatabase(dbName);
  request.onsuccess = function (event) {
    console.log("Datababse deleted succesfully");
  }
  request.onerror = function (event) {
    console.log("Database error: " + event.target.errorCode);
  }
  // remove all items in UL
  removeAllItemsFromList();
}

// clear database
function cleardatabase() {
  var transaction = db.transaction("friends", "readwrite");
  var store = transaction.objectStore("friends");
  var request = store.clear();
  request.onsuccess = function (event) {
    console.log("Friends object store cleared");
  }
  request.onerror = function (event) {
    console.log("Cannot clear Friends object store");
  }
  // remove all items in UL
  removeAllItemsFromList();
}

// remove all items from the UL list
function removeAllItemsFromList() {
  // remove all items in UL
  var elem = document.getElementById('friends_list');
  while (elem.hasChildNodes()) {
    elem.removeChild(elem.childNodes[0]);
  }
}

// add a new friend
function add_friend() {
  // to database
  var date = new Date();
  var id = date.getTime().toString();
  var name = document.getElementById("new_name").value;
  var email = document.getElementById("new_email").value;
  var transaction = db.transaction("friends", "readwrite");
  var store = transaction.objectStore("friends");
  var request = store.add({
    "id": id,
    "name": name,
    "email": email
  });
  request.onsuccess = function (event) {
    console.log("New friend added to database");
  }
  request.onerror = function (event) {
    console.log("Error adding a new friend to database");
  }
  // to list
  add_listitem(id, name, email);
  // clear
  document.getElementById("new_name").value = "";
  document.getElementById("new_email").value = "";
}

// function
function showall() {
  var transaction = db.transaction("friends", "readonly");
  var store = transaction.objectStore("friends");
  var request = store.openCursor();
  request.onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      //console.log("cursor:", cursor);
      add_listitem(cursor.value.id, cursor.value.name, cursor.value.email);
      cursor.continue();
    } else {
      console.log("All data read from db");
    }
  }
}

// add item to the list UL
function add_listitem(id, name, email) {
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(name + " : " + email + " "));
  li.setAttribute("id", id);
  li.setAttribute("email", email);
  // input
  // <input type = "image" src = "delete.jpg" alt = "Delete" width = "12" height = "12">
  var input = document.createElement("input");
  input.setAttribute("type", "image");
  input.setAttribute("src", "delete.jpg");
  input.setAttribute("at", "delete");
  input.setAttribute("width", "12");
  input.setAttribute("height", "12");
  input.onclick = remove_friend;
  li.appendChild(input);
  // add li to list	
  document.getElementById('friends_list').appendChild(li);
}

// remove item from list and database
function remove_friend() {
  var li = this.parentNode;
  li.parentNode.removeChild(li);
  delete_friend(li.getAttribute("id"));
}

// remove object from indexedDB
function delete_friend(id) {
  console.log("delete_friend called with id: " + id);
  var trans = db.transaction("friends", "readwrite");
  var store = trans.objectStore("friends");
  var request = store.delete(id);
  console.log("delete called");
  request.oncomplete = function () {
    console.log("friend deleted, id: " + id);
  }
  request.onerror = function () {
    console.log("Error deleting item from database");
  }
}