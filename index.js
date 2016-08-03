var tela = document.getElementById("tela");
var ctx = tela.getContext("2d");
var game_over = false;
var sounds = new AudioResources(10);
var last_key = 0;
var jumplay = false;
var pause = false;

sounds.load("jump", "sounds/jump.wav");
sounds.load("gameMusic", "sounds/fortress.wav");
sounds.load("gameOver", "sounds/gameover.wav");

function passo() {
    var dt = 1 / 40;
    if(!pause){
        drawMap(dt);
        movePC(dt);
        drawPC(dt);
        if(jumplay){
            sounds.play("jump", 500);    
            jumplay = false;
        }    
    }
    
    setTimeout(passo, dt * 1000);

    
}

document.addEventListener("keydown", function(e) {
    if(!game_over){
        switch (e.keyCode) {
            case 37:
                pc.ax = -4*max_speed;
                break;
            case 39:
                pc.ax = 4*max_speed;
                break;
            case 38:
                if (!pc.jumping && last_key != 38 && mapa[pc.yi + 1][pc.xi]) {
                    pc.vy = -16.5*TS;
                    pc.jumping = true;
                    jumplay = true;
                }
                break;
            case 32:
                pause = !pause;
        }
        last_key = e.keyCode;    
    }
    
});

document.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
        case 37:
            pc.ax = 0;
            last_key = 0;
            break;
        case 39:
            pc.ax = 0;
            last_key = 0;
            break;
        case 38:
            last_key = 0;
            pc.vy
            break;
    }
});

sounds.play("gameMusic", 155000);    

setInterval(function(){
    sounds.play("gameMusic", 155000);      
    }, 155000);

passo();

