var tela = document.getElementById("tela");
var ctx = tela.getContext("2d");
var game_over = false;
var sounds = new AudioResources(10);
var last_key = 0;
var jump_play_sound = false;
var pause = false;
var running = false;
var max_speed_y = -16.5*TS;

sounds.load("jump", "sounds/jump.wav");
sounds.load("gameMusic", "sounds/fortress.wav");
sounds.load("gameOver", "sounds/gameover.wav");

function passo() {
    var dt = 1 / 40;
    if(!pause){
        drawMap(dt);
        movePC(dt);
        drawPC(dt);
        if(jump_play_sound){
            sounds.play("jump", 500);    
            jump_play_sound = false;
        }    
    }
    
    setTimeout(passo, dt * 1000);

    
}

document.addEventListener("keydown", function(e) {
    console.log("key code"+ e.keyCode);
    if(!game_over){
        switch (e.keyCode) {
            case 37:
                pc.ax = -4*max_speed;
                break;
            case 39:
                pc.ax = 4*max_speed;
                break;
                case 38:
            case 88:  //'x'
                if (!pc.jumping && last_key != 38 && mapa[pc.yi + 1][pc.xi]) {
                    pc.vy = max_speed_y;
                    pc.jumping = true;
                    jump_play_sound = true;
                }
                break;
            case 32:
                pause = !pause;
                break;
            case 90:   // 'z' 
                if(!running){
                    max_speed = max_speed*2;
                    max_speed_y = max_speed_y * 1.2
                    console.log("max speed:"+ max_speed);    
                    running = true;
                }
                
                break;
        }
        last_key = e.keyCode;
    }
});
/*
document.addEventListener("keypress", function(e) {
    console.log("key code"+ e.keyCode);
    if(!game_over){
        switch (e.keyCode) {
            case 90: // 'z' 
                max_speed = max_speed*1.5;
                console.log("max speed:"+ max_speed);
                break;
        }
    }
});*/

document.addEventListener("keyup", function(e) {
    //console.log("key code"+ e.keyCode);
    switch (e.keyCode) {
        case 37:
            if(pc.ax < 0){
                pc.ax = 0;    
            }
            last_key = 0;
            break;
        case 39:
            if(pc.ax > 0){
                pc.ax = 0;
            }
            last_key = 0;
            break;
        case 38:
        case 88:  //'x'
            last_key = 0;
            pc.vy
            break;
        case 90: // 'z' 
            max_speed = max_speed*1/2;
            max_speed_y = max_speed_y * 10/12;
            console.log("max speed:"+ max_speed);
            running = false;
            break;
    }
});

sounds.play("gameMusic", 155000);   
sounds.setVolume("gameMusic", 0.1);   

setInterval(function(){
    sounds.play("gameMusic", 155000);      
    sounds.setVolume("gameMusic", 0.1);   
    }, 155000);

passo();

