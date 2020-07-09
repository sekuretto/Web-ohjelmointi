var count_to = 1000000000;

// without worker
function calc_no_worker() {
  var element = document.getElementById("calc_result");
  element.innerHTML = "Calculating...";
  // loop...
  var result = 0;
  for (i = 0; i < count_to; i++) {
    result++;
  }
  element.innerHTML = "Complex calculation ready without workers - result = " + result;
}

// with worker
function calc_worker() {
  var element = document.getElementById("calc_result");
  element.innerHTML = "Calculating...";

  if (typeof (Worker) !== "undefined") {
    worker = new Worker("workers.js");
    worker.onmessage = function (event) {
      document.getElementById("calc_result").innerHTML = event.data;
    }
  } else {
    document.getElementById("calc_result").innerHTML = "Browser does not support Web Workers.";
  }
}