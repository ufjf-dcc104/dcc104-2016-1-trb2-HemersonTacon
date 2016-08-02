var pc_img = new ImageResources();

for(var i=0; i<10; i++){
    pc_img.addImage("mario"+i, "img/mario"+i+".png");    
}


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
                jumping: false,
                sprite_pos: 0

            }

var gravity = 40*TS;
var max_speed = 5*TS;
var friction = 0;
var run = 0;
 var direction = 1;

function drawPC(dt) {
   if(pc_img.isReady()){
        if(pc.vy < 0){
            sprite_pos = 7; /*Pulando pra cima*/
        }
        else if(pc.vy > 0){
            sprite_pos = 8; /*Caindo (pulo ou queda)*/
        }
        else if( Math.abs(pc.vx) > 0 ){
            sprite_pos = Math.floor(run);
            run = (run + 12*dt) % 4 == 3 ? 1 : (run + 12*dt) % 4;   /*Correndo, sprites 0 1 2 1*/
            if( Math.sign(pc.vx) !=  Math.sign(pc.ax) &&  (last_key == 39 || last_key == 37)){
                sprite_pos = 9; //Efeito de "freiada"
            }
        }
        else{
            sprite_pos = 0;
        }
        if(pc.vx < 0){
            direction = -1;   
        }
        else if(pc.vx > 0){
            direction = 1;   
        }

        if(direction == -1){
            ctx.save();
            ctx.scale(-1, 1);
        }
        
        pc_img.drawCentered2(ctx, "mario"+sprite_pos,0, 0, 16, 32, direction*pc.x, (pc.y - TS)  + Math.floor(TS_offset)-pc.h/2 , 2*pc.w, 2*pc.h);

        if(direction == -1){
            ctx.restore();    
        }
        
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(pc.xi * TS, (pc.yi - 1) * TS + Math.floor(TS_offset), TS, TS);
   }
    
}

function movePC(dt) {

    if(!game_over){
        /*Atualizando atrito, sempre terá a direção contrária a velocidade*/
        if(pc.vx < 0.01*max_speed && pc.vx > -0.01*max_speed){
            friction = 0;
            pc.vx = 0;
        } else{
            friction = -(max_speed*(Math.sign(pc.vx)));
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
        } else if(pc.y > tela.height - TS && !game_over){
            game_over = true;
            console.log("game OVER!");
            sounds.play("gameOver", 11000);
        }

        pc.xi = Math.floor(pc.x / TS);
        pc.yi = Math.floor(pc.y / TS);

        if(pc.xi > map_collumns-1){
            pc.xi = map_collumns-1;
        } 
    }

    

}