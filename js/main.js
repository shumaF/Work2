function exec() {
   var x1 = parseInt(document.getElementById("circle1_x").value);
   var y1 = parseInt(document.getElementById("circle1_y").value);
   var r1 = parseInt(document.getElementById("radius1").value);
   var x2 = parseInt(document.getElementById("circle2_x").value);
   var y2 = parseInt(document.getElementById("circle2_y").value);
   var r2 = parseInt(document.getElementById("radius2").value);
   var d = distance(x1,y1,x2,y2);
   var result = "";
   var rr = r1 + r2;
   if(d == 0 && r1 == r2) result = "完璧に重なっている"
   else if(d > rr) result = "交わっていない";
   else  if(d == rr)  result = "外側で接している";
   else if(Math.abs(r1-r2) < d &&d < rr) result = "二点が交わっている";
   else if(Math.abs(r1-r2) == d) result = "内側で接している"
   else result = "交わっていない";

   document.getElementById("result").innerHTML = result;
   draw(x1,y1,r1,x2,y2,r2);
}
function distance(x1,y1,x2,y2) {
   var a = x1 - x2;
   var b = y1 - y2;
   var d = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
   return d;
}
function draw(x1, y1, r1, x2, y2, r2) {
  var min_x = (x1-r1 > x2-r2) ? x2-r2 : x1-r1;
  min_x = (min_x >= 0) ? 0 : min_x; 
  var min_y = (y1-r1 > y2-r2) ? y2-r2 : y1-r1;
  min_y = (min_y >= 0) ? 0 : min_y; 
  var max_x = (x1+r1 < x2+r2) ? x2+r2 : x1+r1;
  var max_y = (x1+r1 < x2+r2) ? x2+r2 : x1+r1; 
  var x = max_x - min_x;
  var y = max_y - min_y;
  var ratio = (x > y) ? 480 / x : 480 / y; 
  var canvas = document.getElementById('c1');
  if ( ! canvas || ! canvas.getContext ) { return false; }
  var ctx1 = canvas.getContext('2d');
  ctx1.beginPath();
  ctx1.fillStyle="rgb(255,255,255)";
  ctx1.fillRect(0,0,500,500);
  ctx1.strokeStyle="rgb(255,0,0)";
  ctx1.beginPath();
  ctx1.arc((x1-min_x)*ratio+10, (y1-min_y)*ratio+10, r1 * ratio, 0, Math.PI*2, false);
  ctx1.stroke();
  ctx1.strokeStyle="rgb(0,0,255)";
  ctx1.beginPath();
  ctx1.arc((x2-min_x)*ratio+10, (y2-min_y)*ratio+10, r2 * ratio, 0, Math.PI*2, false);
  ctx1.stroke();
}