function distance2Between(loc1, loc2) {
  var x = loc1[0] - loc2[0]
  var y = loc1[1] - loc2[1]
  return ((x * x) + (y * y));
}