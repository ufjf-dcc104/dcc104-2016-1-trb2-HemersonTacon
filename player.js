var pc_img = new ImageResources();
pc_img.addImage("mario", "img/marioTS.png");

//var pc_img = new Image();
//pc_img.src = "mario.png"

var pc = {
                w: 16,
                h: 32,
                x: 50,
                y: 180,
                xi: 0, /*posição x inteira do player*/
                yi: 0, /*posição y inteira do player*/
                vx: 0,
                vy: 0,
                ax: 0,
                ay: 0,
                jumping: false

            }

var gravity = 16*TS;
var max_speed = 4*TS;
var friction = 0;

function drawPC() {
    //ctx.fillStyle = "blue";
    //ctx.fillRect(pc.x - pc.w/2, (pc.y - TS)  + Math.floor(TS_offset) - pc.h/2 , pc.w, pc.h);
    //ctx.save();
    //ctx.translate(pc.x, pc.y);
    //ctx.scale(-1, 1);
    //ctx.drawImage(pc_img, pc.x - pc.w/2, (pc.y - TS)  + Math.floor(TS_offset) - pc.h/2 , pc.w, pc.h);
    pc_img.drawCentered2(ctx, "mario", 0, 0, 16, 32, pc.x, (pc.y - TS)  + Math.floor(TS_offset) , pc.w, pc.h)
    //ctx.restore();

    ctx.strokeStyle = "red";
    ctx.strokeRect(pc.xi * TS, (pc.yi - 1) * TS + Math.floor(TS_offset), TS, TS);
}

function movePC(dt) {

    if(!game_over){
        /*Atualizando atrito, sempre terá a direção contrária a velocidade*/
        if(pc.vx < 0.01*max_speed && pc.vx > -0.01*max_speed){
            friction = 0;
            pc.vx = 0;
        } else{
            friction = -(max_speed*(pc.vx/Math.abs(pc.vx)));
        }

        pc.vx = pc.vx + (pc.ax + friction) * dt;
        pc.x = pc.x + pc.vx * dt;
        pc.vy = pc.vy + (pc.ay + gravity)*dt;

        /*Limitando a velocidade em x*/
        if( Math.abs(pc.vx) > max_speed){
            pc.vx = max_speed*(pc.vx/Math.abs(pc.vx));
        }


        if (mapa[pc.yi + 1][pc.xi]) {
            var foot = pc.y + pc.h / 2;
            var top = (pc.yi + 1) * TS;
            pc.vy = Math.min(pc.vy, Math.abs((top - foot)) / dt);
            if (pc.vy == 0) {
                pc.jumping = false;
            }
        }

        pc.y = pc.y + pc.vy * dt;

        if(pc.x < 0){
            pc.x = 0;
        } else if(pc.x > tela.width){
            pc.x = tela.width;
        }

        if(pc.y < 0){
            pc.y = 0;
        } else if(pc.y > tela.height - TS){
            game_over = true;
            console.log("game OVER!");
        }

        pc.xi = Math.floor(pc.x / TS);
        pc.yi = Math.floor(pc.y / TS);

        if(pc.xi > map_collumns-1){
            pc.xi = map_collumns-1;
        } 
    }

    

}