var tela = document.getElementById("tela");
var ctx = tela.getContext("2d");
            
           
var previous_key;

function passo() {
    var dt = 1 / 40;
    desenhaMapa(dt);
    movePC(dt);
    desenhaPC();
    setTimeout(passo, dt * 1000);
}

document.addEventListener("keydown", function(e) {
    
    switch (e.keyCode) {
        case 37:
            pc.ax = -4*max_speed;
            break;
        case 39:
            pc.ax = 4*max_speed;
            break;
        case 38:
            if (!pc.jumping && previous_key != 38 && mapa[pc.yi + 1][pc.xi]) {
                pc.vy = -9.05*TS;
                pc.jumping = true;
            }
            break;
    }
    previous_key = e.keyCode;
});

document.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
        case 37:
            pc.ax = 0;
            break;
        case 39:
            pc.ax = 0;
            break;
        case 38:
            previous_key = 0;
            break;
    }
});

passo();