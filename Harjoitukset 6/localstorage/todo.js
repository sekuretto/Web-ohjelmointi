// init - load items from local storage
function init() {
  if (window.localStorage) {
    var todo_length = window.localStorage.length;
    for (var i = 0; i < todo_length; i++) {
      // key, value
      add_listitem(window.localStorage.key(i), window.localStorage.getItem(window.localStorage.key(i)));
    }
  } else {
    window.alert("Local Storage is not available");
  }
}
// add item to-do list
function add_item() {
  var new_item = document.getElementById("new_item");
  var key = new Date();
  add_listitem(key.getTime(), new_item.value);
  add_storageitem(key.getTime(), new_item.value);
  new_item.value = "";
}

// add item to list
function add_listitem(key, value) {
  // li
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(value + " "));
  li.setAttribute("data-key", key);
  // input
  // <input type = "image" src = "delete.jpg" alt = "Delete" width = "12" height = "12">
  var input = document.createElement("input");
  input.setAttribute("type", "image");
  input.setAttribute("src", "delete.jpg");
  input.setAttribute("alt", "delete");
  input.setAttribute("width", "12");
  input.setAttribute("height", "12");
  input.onclick = remove_item;
  li.appendChild(input);
  // add li to list	
  document.getElementById('todo_list').appendChild(li);
}

// add item to local storage
function add_storageitem(key, value) {
  window.localStorage.setItem(key, value);
}

// delete list item
function remove_item() {
  var li = this.parentNode;
  remove_storageitem(li.getAttribute("data-key"));
  li.parentNode.removeChild(li);
}

// remove item from local storage
function remove_storageitem(key) {
  window.localStorage.removeItem(key);
}

// function clear all items from the list and local storage
function clear_list() {
  window.localStorage.clear();
  var list = document.getElementById('todo_list');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}