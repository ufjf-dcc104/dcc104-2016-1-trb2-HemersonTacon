var TS = 32;
var map_lines = 18, map_collumns = 28;

tela.width = map_collumns*TS;
tela.height = map_lines*TS;
var TS_offset = 1, TS_offset_speed = 10, TS_offset_acc = 2;

var mapSprites = new ImageResources();
var pts = 0;
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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];


function drawMap(dt) {
    if(mapSprites.isReady()){
        bg_animation += dt;

        mapSprites.draw(ctx, "bg"+(Math.floor(bg_animation) % 4 == 3 ? 1 : (Math.floor(bg_animation) % 4)), 0, 0, tela.width, tela.height);

        lava_animation += 4*dt;
        TS_offset_speed = TS_offset_speed + TS_offset_acc*dt;
        TS_offset = (TS_offset + TS_offset_speed*dt) /*% TS*/;
        //Quando a velocidade é muito grande,essa abordagem com módulo não traz o efeito esperado, pois é uma chamada, o mapa pode avançar mais de um tile
        //console.log("ts acc: "+TS_offset_acc+"ts speed: " + TS_offset_speed+ "ts offset: "+ TS_offset)

        /*Empurra o mapa um tile pra cima quando o tile_offset alcança o tamanho do tile (quando isso acontece, tile_offset é zerado)*/
        if(TS_offset / TS >= 1){
            TS_offset = TS_offset % TS;
            /*Como as posições são deslocadas no mapa, é preciso atualizar a posição do player*/
            pts++;
            pc.y = pc.y + TS;
            pc.yi = pc.yi + 1;
            if(pc.y > tela.height - TS && !game_over){
                game_over = true;
                console.log("Game OVER! Pontuação: "+pts);
                sounds.play("gameOver", 11000);
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
                    var actualFloor = floorAutoDiscovery(mapa, i, j);
                    mapSprites.draw(ctx, "floor" + actualFloor, TS * j, TS * (i - 1) + Math.floor(TS_offset), TS, TS);
                    //ctx.drawImage(floor, TS * j, TS * (i - 1) + Math.floor(TS_offset), TS, TS);
                }

                if (i == map_lines) {
                    mapSprites.draw(ctx, "lava"+(Math.floor(lava_animation+j) % 4), TS * j, TS * (i - 1), TS, TS);
                    //ctx.drawImage(lava[(Math.floor(lava_animation+j) % 4)], TS * j, TS * (i - 1), TS, TS);
                }
                if(pause){
                    ctx.fillStyle = "white";
                ctx.font = "10px Arial";
                ctx.fillText("i "+i, TS * j, TS * (i - 1) + Math.floor(TS_offset));
                ctx.fillText("j "+j, TS * j, TS/3 + TS * (i - 1) + Math.floor(TS_offset));    
                }
                
            }
        }
    }
        
        
}

function floorAutoDiscovery(map, i, j){
    if(i > 0 && j > 0){
        if(map[i-1][j] == 0 && map[i][j-1] == 0){
            return 0;
        }
    }
    if(i > 0 && j > 0 && j < map_collumns-1){
        if(map[i-1][j] == 0 && map[i][j+1] != 0 && map[i][j-1] != 0){
            return 1;
        }
    }

    if(i > 0 && j < map_collumns-1){
        if(map[i-1][j] == 0 && map[i][j+1] == 0){
            return 2;
        }
    }

    if(i > 0 && i < map_lines && j > 0){
        if(map[i][j-1] == 0 && map[i+1][j] != 0 && map[i-1][j] != 0){
            return 3;
        }
    }
    if(i > 0 && i < map_lines && j > 0 && j < map_collumns-1){
        if(map[i+1][j] != 0 && map[i-1][j] != 0 && map[i][j+1] != 0 && map[i][j-1] != 0){
            return 4;
        }
    }

    if(i > 0 && i < map_lines && j < map_collumns-1){
        if(map[i+1][j] != 0 && map[i-1][j] != 0 && map[i][j+1] == 0){
            return 5;
        }
    }

    if(i < map_lines && j > 0){
        if(map[i+1][j] == 0 && map[i][j-1] == 0){
            return 6;
        }
    }
    if(i < map_lines && j > 0 && j < map_collumns-1){
        if(map[i+1][j] == 0 && map[i][j+1] != 0 && map[i][j-1] != 0){
            return 7;
        }
    }

    if(i < map_lines && j < map_collumns-1){
        if(map[i+1][j] == 0 && map[i][j+1] == 0){
            return 8;
        }
    } 
    return 4;



    //console.log("I:"+i+"J:"+j+" "+map[i][j]);
    /*
    if(i > 0 && map[i-1][j] == 0){//tile acima é vazio
        if(j > 0 && map[i][j-1] == 0){//tile a esquerda é vazio
            return 0;
        } 
        if(j < map_collumns-1 && map[i][j+i] == 0){//tile a direita é vazio
            return 2;
        } //tile acima vazio e tiles esquerda e direita não vazios
        return 1;
    }
    if(i < map_lines &&  map[i+1][j] == 0){//tile abaixo é vazio
        if(j > 0 && map[i][j-1] == 0){//tile a esquerda é vazio
                return 6;
        } 
        if(j < map_collumns-1 && map[i][j+i] == 0){//tile a direita é vazio
            return 8;
        } //tile abaixo vazio e tiles esquerda e direita não vazios
        return 7;
    } 
    if(j > 0 && map[i][j-1] == 0){//tile a esquerda é vazio
        return 3;
    } 
    if(j < map_collumns-1 && map[i][j+1] == 0){//tile a esquerda é vazio
        return 5;
    } 
    return 4;*/
}
