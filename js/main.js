/**
 *@fileOverview 二つの円の重複をチェックするファイル．
 *
 * @author shumaF
 * @version 0.1
 */

/// ~~~~~ 円クラス ~~~~~ ///
 /**
  * 円のコンストラクタ．
  */
function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}
/**
 * 円と円の距離をはかるstaticメソッド．
 */
Circle.distance = function (circle1, circle2) {
  var x_distance = circle1.x - circle2.x;
  var y_distance = circle1.y - circle2.y;
  alert(x_distance + ":" + y_distance);
  return Math.sqrt(Math.pow(x_distance,2) + Math.pow(y_distance,2));
}
/**
 * 重なりを表現する定数群．
 */
var SAME_CIRCLE = "完璧に重なっている";
var NON_CROSS = "交わっていない";
var OUT_TOUCH = "外側で接している";
var TWO_CROSS = "二点が交わっている";
var IN_CROSS = "内側で接している";
var CIRCLE_IN_CIRCLE = "内部に存在している";
/**
 * 重なっているかを評価するstaticメソッド．
 */
Circle.isOverlap = function(circle1, circle2) {
  var r_sum = circle1.r + circle2.r;
  var r_sub = Math.abs(circle1.r - circle2.r);
  var d = Circle.distance(circle1, circle2);
  alert(r_sum + ":"+ r_sub + ":" + d);
  if(d == 0 && r_sub == 0)        return SAME_CIRCLE;
  else if(d > r_sum)              return NON_CROSS;
  else if(d == r_sum)             return OUT_TOUCH;
  else if(r_sub < d && d < r_sum) return TWO_CROSS;
  else if(r_sub == d)             return IN_CROSS;
  else                            return CIRCLE_IN_CIRCLE;
}
/**
 * ファクトリーメソッド．
 */
Circle.createCircleByDoc = function(circle_num) {
  var x = parseInt(document.getElementById("circle"+circle_num+"_x").value);
  var y = parseInt(document.getElementById("circle"+circle_num+"_y").value);
  var r = parseInt(document.getElementById("radius"+circle_num).value);
  return new Circle(x, y, r);
}
// ~~~~~ end ~~~~~
/**
 * メインの実行メソッド．
 * htmlから呼び出す．
 */
function exec() {
  var circle1 = Circle.createCircleByDoc(1);
  var circle2 = Circle.createCircleByDoc(2);
  var result = Circle.isOverlap(circle1, circle2);
  document.getElementById("result").innerHTML = result;
  draw(circle1.x,circle1.y,circle1.r,circle2.x,circle2.y,circle2.r);
}
/**
 * 円を描画するメソッド．
 */
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