var fundo;
var eduuu, eduuuImg;
var mine, mineImg;
var chao;
var pare, pareImg;
var PrePlay = 0;
var Play = 1;
var End = 2;
var gameState = PrePlay;
var chaoFake;
var score = 0;
var mine5;

function preload(){
    mineImg = loadImage("mine.jpg");
    fundo = loadImage("background.jpg");
    eduuuImg = loadImage("eduuu.jpg");
    pareImg = loadImage("PLACA DE PARE.png");
}

function setup() {
    createCanvas(1920,915);
    chao = createSprite(960,795,1920,10);
    pare = createSprite(2500,720,50,10);
    pare.addImage(pareImg);
    pare.scale = 0.2;
    eduuu = createSprite(250,718,10,10);
    eduuu.addImage(eduuuImg);
    eduuu.scale = 0.2;
    chaoFake = createSprite(960,718,1920,10);
    chaoFake.visible = false;
    mine5 = new Group();
}

function draw() {
    background(fundo);

    eduuu.collide(chao);

    if(gameState === PrePlay){
        score = 0;
        textSize(50);
        fill("white");
        text("APERTE A SETA DA DIREITA PARA COMEÇAR",460,457.5);
    }

    if(keyDown(RIGHT_ARROW) && gameState === PrePlay){
        gameState = Play;
        eduuu.position.x = 300;
    }

    if(gameState === Play){
        spawnMine();
        eduuu.velocityY = eduuu.velocityY + 0.7;
        pare.velocityX = -15;
        if(pare.position.x < -100){
            pare.position.x = 2500;
        }
        if(keyDown("space") && eduuu.isTouching(chaoFake)){
            eduuu.velocityY = -20;
        }
        score = score + 1;

        if(eduuu.isTouching(mine5)){
            gameState = End;
        }
    }

    if(gameState === End){
        eduuu.velocityY = 0;
        pare.velocityX = 0;
        mine5.setVelocityXEach(0);
        mine5.setLifetimeEach(-1);
        textSize(50);
        fill("white");
        text("EDUUU JOGOU MINECRAFT",460,457.5);
    }
        


    textSize(20);
    fill("white");
    text(score,1800,50,200,50);

    

    drawSprites();
}




function spawnMine() {
    if(frameCount % 100 === 0){
        mine = createSprite(2700,720,50,50);
        mine.addImage(mineImg);
        mine.scale = 0.6;
        mine.velocityX=-15;
        lifetime = 170;
        mine5.add(mine);
    }
}