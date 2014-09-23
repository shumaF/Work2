function exec() {
   var x1 = parseInt(document.getElementById("circle1_x").value);
   var y1 = parseInt(document.getElementById("circle1_y").value);
   var radius1 = parseInt(document.getElementById("radius1").value);
   var x2 = parseInt(document.getElementById("circle2_x").value);
   var y2 = parseInt(document.getElementById("circle2_y").value);
   var radius2 = parseInt(document.getElementById("radius2").value);
   var d = distance(x1,y1,x2,y2);
   var result = "";
   var rr = radius1 + radius2;
   if(d == rr) {
      result = "contact";
   } else if(d < rr) {
      result = "yes";
   } else {
      result = "no";
   }
   document.getElementById("result").innerHTML = result;
}
function distance(x1,y1,x2,y2) {
   var a = x1 - x2;
   var b = y1 - y2;
   var d = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
   return d;
}