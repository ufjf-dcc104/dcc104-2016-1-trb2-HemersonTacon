var TS = 32;
var map_lines = 18, map_collumns = 28;

tela.width = map_collumns*TS;
tela.height = map_lines*TS;
var TS_offset = 0, TS_offset_speed = 10;

var mapSprites = new ImageResources();
var i=0;

for(; i<3; ++i){
    mapSprites.addImage("bg"+i, "img/bg"+i+".png");
    mapSprites.addImage("floor"+i, "img/floor"+i+".png");
    mapSprites.addImage("lava"+i, "img/lava"+i+".png");
    mapSprites.addImage("spike"+i, "img/spike"+i+".png");
}

mapSprites.addImage("floor"+i, "img/floor"+i+".png");
mapSprites.addImage("lava"+i, "img/lava"+i+".png");
mapSprites.addImage("spike"+i, "img/spike"+i+".png");

for(i=4; i<9; ++i){
    mapSprites.addImage("floor"+i, "img/floor"+i+".png");
}

var bg_animation = 0;
var lava_animation = 0;

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


function drawMap(dt) {
    if(!mapSprites.isReady()){
        //setTimeout(drawMap(dt), 0);
    }else{
            bg_animation += dt;

        /*if(Math.floor(bg_animation) % 4 == 1){
            bg.src = "bg2.png";

        } else if(Math.floor(bg_animation) % 4 == 2){
            bg.src = "bg3.png";     

        } else if(Math.floor(bg_animation) % 4 == 3){
            bg.src = "bg2.png";            

        } else if(Math.floor(bg_animation) % 4 == 0){
            bg.src = "bg1.png";            
        }*/
//        ctx.drawImage(bg, 0, 0, tela.width, tela.height);
        mapSprites.draw(ctx, "bg"+(Math.floor(bg_animation) % 4 == 3 ? 1 : (Math.floor(bg_animation) % 4)), 0, 0, tela.width, tela.height);

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
                    var actualFloor = 4/*floorDynamicDiscovery(map, i, j)*/;
                    mapSprites.draw(ctx, "floor" + actualFloor, TS * j, TS * (i - 1) + Math.floor(TS_offset), TS, TS);
                    //ctx.drawImage(floor, TS * j, TS * (i - 1) + Math.floor(TS_offset), TS, TS);
                }

                if (i == map_lines) {
                    mapSprites.draw(ctx, "lava"+(Math.floor(lava_animation+j) % 4), TS * j, TS * (i - 1), TS, TS);
                    //ctx.drawImage(lava[(Math.floor(lava_animation+j) % 4)], TS * j, TS * (i - 1), TS, TS);
                }
            }
        }
    }
        
        
}

function floorDynamicDiscovery(map, i, j){
    if(map[i-1][j] == 1){

    }

}
