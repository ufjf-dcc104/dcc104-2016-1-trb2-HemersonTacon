var TS = 32;
var map_lines = 18, map_collumns = 28;

tela.width = map_collumns*TS;
tela.height = map_lines*TS;
var TS_offset = 0, TS_offset_speed = 10;
var bg = new Image();
bg.src = "bg1.png";
var bg_animation = 0;
var tile;
var lava = [];
var lava_animation = 0;
var floor = new Image();
floor.src = "floor.png"

 lava[0] = new Image();
 lava[0].src = "lava0.png";
 lava[1] = new Image();
 lava[1].src = "lava1.png";
 lava[2] = new Image();
 lava[2].src = "lava2.png";
 lava[3] = new Image();
 lava[3].src = "lava3.png";

var mapa = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];


    function desenhaMapa(dt) {
        //ctx.fillStyle = "black";
        bg_animation += dt;

        if(Math.floor(bg_animation) % 4 == 1){
            bg.src = "bg2.png";

        } else if(Math.floor(bg_animation) % 4 == 2){
            bg.src = "bg3.png";     

        } else if(Math.floor(bg_animation) % 4 == 3){
            bg.src = "bg2.png";            

        } else if(Math.floor(bg_animation) % 4 == 0){
            bg.src = "bg1.png";            
        }
        ctx.drawImage(bg, 0, 0, tela.width, tela.height);

        lava_animation += 4*dt;



        TS_offset = (TS_offset + TS_offset_speed*dt) % TS;

        /*Empurra o mapa um tile pra cima quando o tile_offset alcança o tamanho do tile (quando isso acontece, tile_offset é zerado)*/
        if(TS_offset == 0){
            /*Como as posições são deslocadas no mapa, é preciso atualizar a posição do player*/
            pc.y = pc.y + TS;
            pc.yi = pc.yi + 1;
            if(pc.y > tela.height - TS){
                game_over = true;
                console.log("game OVER!");
            }

            var new_line = mapa[map_lines]; /*TODO: criar a nova linha aleatoriamente, atualmente passa a de baixo pra cima, fazendo um cenário circular*/
            for(var i = map_lines; i>0; i--){
                mapa[i] = mapa[i-1];
            }
            mapa[0] = new_line;
        }


        for (var i = 0; i < map_lines+1; i++) {
            for (var j = 0; j < map_collumns; j++) {
                if (mapa[i][j] == 1) {
                    //ctx.fillStyle = "lightgray";
                    //ctx.fillRect(TS * j, TS * (i - 1) + Math.floor(TS_offset), TS, TS);
                    ctx.drawImage(floor, TS * j, TS * (i - 1) + Math.floor(TS_offset), TS, TS);
                }

                if (i == map_lines) {
                    
                    ctx.drawImage(lava[(Math.floor(lava_animation+j) % 4)], TS * j, TS * (i - 1), TS, TS);
                }
            }
        }
    }
