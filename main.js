song="";
leftwristX="";
leftwristY="";
rightwristX="";
rightwristY="";
scoreleftwrist="";
scorerightwrist="";
function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(500,465);
    canvas.center();
    

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw (){
    image(video,0,0,500,465);

 fill('#FF0000');
  stroke('#FF0000');  
if(scoreleftwrist> 0.2) {

  circle(leftwristX,leftwristY,20);
  InNumberleftwrist=Number(leftwristY);
  remove_decimal=floor(InNumberleftwrist);
leftwristY_divide_1000=remove_decimal/1000;
volume=leftwristY_divide_1000*2;
document.getElementById("volume").innerHTML="Volume ="+volume;
song.setVolume(volume);
}
if(scorerightwrist>0.2){
    
    circle(rightWristX,rightWristY,20);
    if(rightwristY>0 && rightwristY<=100) {
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5); 
     }else if(rightwristY>100 && rightwristY<=200){
       document.getElementById("speed").innerHTML="speed=1x";
       song.rate(1);
    }
    else if(rightwristY>200 && rightwristY<=300){
       document.getElementById("speed").innerHTML="speed=1.5x";
       song.rate(1.5);
    }else if(rightwristY>300 && rightwristY<=400){
       document.getElementById("speed").innerHTML="speed=2x";
       song.rate(2);
    }else if(rightwristY>400 && rightwristY<=500){
       document.getElementById("speed").innerHTML="speed=2.5x";
       song.rate(2.5);
    }
}
}
function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("PoseNet is Initialized!");
}
function gotPoses(results){
   if (results. length >0)
    {
       scoreleftwrist=results[0].pose.keypoints[9].score;
       console.log("scoreleftwrist"+scoreleftwrist);

       scorerightwrist=results[0].pose.keypoints[10].score;
       console.log("scorerightwrist"+scorerightwrist);

        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y
        console.log("leftwristX"+leftwristX+"leftwristY"+leftwristY+"rightwristX"+rightwristX+"rightwristY"+rightwristY);
    }
}

