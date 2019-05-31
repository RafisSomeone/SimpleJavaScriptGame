class Rect {

    constructor(rectSize,stage) {
        this.xRect = (Math.random() * (canvas.width - rectSize*2)) + 10;
        this.yRect = (Math.random() * (canvas.height - rectSize*2)) + 10;
        this.counter = 20;
        this.interval = setInterval(this.subb.bind(this),1000/(stage*2));
        this.color="black";
    }
    subb()
    {
        this.counter= this.counter-1;
        
    }

    reset(rectSize) {
        this.xRect = (Math.random() * (canvas.width - rectSize*2)) + 10;
        this.yRect = (Math.random() * (canvas.height - rectSize)) + 10;
        this.color="black"
        
        clearInterval(this.interval);
          this.counter = 20;
        this.interval = setInterval(this.subb.bind(this),1000/(stage*2));
        
        
        

    }

    

}
var size=10;
var player;

var canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

var stage=1;
var time=60;
canvas.width = 500;
canvas.height = 500;
var counter = 20,
    rectSize = 20,
    ballSize = 5,
    ballX = 150,
    ballY = 150,
    vY = 0,
    vX = 0,
    speed = 2*stage,
    friction = 0.98,
    keys = [],
    points=0;
var quantity=Math.random()*5+5;
var rectArray = new Array();
var inter;
game();


function game(){
    stage=1;
   
player=prompt("Player name");

if(player!=null)
{

 
    document.getElementById("button").disabled = true; 
        start();

}
}

function start(){
    document.getElementById("button").disabled = true; 
    time=60;
    quantity*=stage;
    
   

     inter= setInterval(function (){
        time--;
    },1000);

    
    for(var i=0;i<quantity;i++)
    {
        newRect = new Rect(rectSize,stage);
        rectArray[i]=newRect;
    }

    update();
}


function update() {

    if (keys[87]) {
        if (vY > -speed) {
            vY -= 0.2;
        }
    }
    if (keys[83]) {
        if (vY < speed) {
            vY += 0.2;
        }
    }
    if (keys[68]) {
        if (vX < speed) {
            vX += 0.2;
        }
    }
    if (keys[65]) {
        if (vX > -speed) {
            vX -= 0.2;
        }
    }
   

    vY *= friction;
    ballY += vY;
    vX *= friction;
    ballX += vX;

    if (ballX >= canvas.width) {
        ballX = 0;
    } else if (ballX <= 0) {
        ballX = canvas.width;
    }

    if (ballY > canvas.height) {
        ballY = 0;
    } else if (ballY <= 0) {
        ballY = canvas.height;
    }

    for(var i=0;i<quantity;i++)
{
    rect=rectArray[i];

    if(rect.counter<0)
    {
        rect.color="red";
    }
   
    if(rect.counter<(-10))
    {
        rect.reset(rectSize);
    }
    if ((ballY - (ballSize) <= rect.yRect + rectSize && ballY + (ballSize) >= rect.yRect && ballX - (ballSize) <= rect.xRect + rectSize && ballX + (ballSize) >= rect.xRect)) {
        points+=rect.counter;
        rect.reset(rectSize);
       
    }
}
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    document.getElementById("points").innerHTML=points;
    document.getElementById("time").innerHTML=time;
    document.getElementById("stage").innerHTML=stage;
    if(time==0)
    {
        clearInterval(inter);
        for(var i=0;i<quantity;i++){
        clearInterval(rectArray[i].interval);
        
    }
    cancelAnimationFrame(request)
         
        if(stage!=3)
        {      stage++;
            start();  
           
          
        }else {
            quantity=Math.random()*5+5;
           
            document.getElementById("button").disabled = false; 
           

        for(var i=1;i<4;i++)
        {
            var score=document.getElementById("best_players").rows[i].cells.item(1).innerHTML;
            if(points>score)
            {
                if(i==1)
                {   document.getElementById("best_players").rows[3].cells.item(1).innerHTML=document.getElementById("best_players").rows[2].cells.item(1).innerHTML;
                    document.getElementById("best_players").rows[3].cells.item(0).innerHTML=document.getElementById("best_players").rows[2].cells.item(0).innerHTML;
                    document.getElementById("best_players").rows[2].cells.item(1).innerHTML=document.getElementById("best_players").rows[1].cells.item(1).innerHTML;
                    document.getElementById("best_players").rows[2].cells.item(0).innerHTML=document.getElementById("best_players").rows[1].cells.item(0).innerHTML;
                    document.getElementById("best_players").rows[1].cells.item(0).innerHTML=player;
                    document.getElementById("best_players").rows[1].cells.item(1).innerHTML=points;
                }
                if(i==2)
                {   document.getElementById("best_players").rows[3].cells.item(1).innerHTML=document.getElementById("best_players").rows[2].cells.item(1).innerHTML;
                    document.getElementById("best_players").rows[3].cells.item(0).innerHTML=document.getElementById("best_players").rows[2].cells.item(0).innerHTML;
                    document.getElementById("best_players").rows[2].cells.item(0).innerHTML=player;
                    document.getElementById("best_players").rows[2].cells.item(1).innerHTML=points;
                }
                if(i==3)
                {   document.getElementById("best_players").rows[3].cells.item(0).innerHTML=player;
                    document.getElementById("best_players").rows[3].cells.item(1).innerHTML=points;
                }
                break;
            }
        }
        points=0;
        document.getElementById("points").innerHTML=points;
       
            return;
        }
        
       
    }

    for(var i=0;i<quantity;i++)
    {
        drawRect(rectArray[i]);
    }
    var request =requestAnimationFrame(update);

}

function drawRect(rect) {

    ctx.beginPath();
    ctx.rect(rect.xRect, rect.yRect, rectSize, rectSize);
    ctx.fillStyle = rect.color;
    ctx.fill();
    ctx.font = "10px Arial"
    ctx.textAlign="center";
    ctx.textBaseline="middle"
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(rect.counter,rect.xRect+(rectSize/2),rect.yRect+(rectSize/2));
    ctx.closePath();

}





document.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;

});