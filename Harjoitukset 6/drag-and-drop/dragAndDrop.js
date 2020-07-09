// By default, data/elements cannot be dropped in other elements
// To allow a drop, prevent the default handling of the element
function allowDrop(event) {
  event.preventDefault();
}

// dragged data is dropped
function drop(event) {
  // prevent the browser default handling of the data
  event.preventDefault();
  // get the dragged data, return any data that was set to the same type in the setData() method
  // now, the dragged data is the id of the dragged element
  var data = event.dataTransfer.getData("DraggedDIV");
  // append the dragged element into the drop element
  event.target.appendChild(document.getElementById(data));
  // disable dragging
  document.getElementById(data).draggable = false;
}

// element is dragged
function drag(event) {
  // specifies what data to be dragged => "drag1", "drag2" or "drag3" div
  event.dataTransfer.setData("DraggedDIV", event.target.id);
}