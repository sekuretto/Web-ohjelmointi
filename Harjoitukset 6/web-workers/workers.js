var count_to = 1000000000;

var result = 0;
for (i = 0; i < count_to; i++) {
  result++;
}

postMessage("Complex calculation ready with workers - result = " + result);