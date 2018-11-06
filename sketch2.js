// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
KNN_Image
KNN Image Classifier example with p5.js
=== */

let knn;
let video;
const btn = document.getElementById("buttonNew")
const cdn = document.getElementById("countdown")
var countdown_num = 5;

function countdown_f(){
	cdn.innerHTML = countdown_num;
	if (countdown_num==0){
		cdn.style.display = "none";
		predict();
		clearTimeout(ct);
		
	}else{countdown_num--;
	ct = setTimeout(countdown_f,1000);
		
	}
	
}

function setup() {
  noCanvas();
  video = createCapture(VIDEO).parent('videoContainer');
  // Create a KNN Image Classifier

  knn = new ml5.KNNImageClassifier(3, 1, modelLoading, video.elt);
  knn.load('test.json', modelLoaded);
  
  createButtons();
}

function createButtons() {
 
  // Predict Button
  buttonPredict = select('#buttonNew');
  buttonPredict.mousePressed(restart);
}


function restart() {
	countdown_f();
	btn.style.display = "none";
    predict();

}


// A function to be called when the model has been loaded
function modelLoaded() {
  select('#loading').html('猜拳模組載入成功');
}

function modelLoading() {
  select('#loading').html('猜拳模組載入中……');
}


// Predict the current frame.
function predict() {
  knn.predictFromVideo(gotResults);
}

// Show the results
function gotResults(results) {
  let msg;

  if (results.classIndex == 1) {
    //msg = '剪刀';
	document.getElementById("myImg").src = "p2.png";
  } else if (results.classIndex == 2) {
    //msg = '石頭';
	document.getElementById("myImg").src = "p3.png";
  } else if (results.classIndex == 3) {
    //msg = '布';
	document.getElementById("myImg").src = "p1.png";
  }
  //select('#result').html(msg);

  
  win_t = setTimeout(win,3000);
}

// Clear the data in one class
function clearClass(classIndex) {
  knn.clearClass(classIndex);
}

function win(){
	cdn.innerHTML = "WIN!";
	cdn.style.display = "";
	countdown_num = 5;
	document.getElementById("myImg").src = "";
	btn.style.display = "";
	
}