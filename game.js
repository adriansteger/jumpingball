"use strict";


class Renderer {

    constructor(element) {
        this.element = element;
        this.setup();
    }

    setup() {
        if(!this.box) {
            let box = document.createElement("div");
            box.id = "box";
            this.element.appendChild(box);
            this.box = box;
        }
        this.box.style.top = "40px";
    }

    render(position) {
        this.box.style.top = position + "px";
    }

    gameOver(points) {
        if(!this.menu){
            let menu = document.createElement("div");
            menu.id = "gameover";
            menu.innerText = "Punktzahl: " + points;
            this.element.appendChild(menu);
            this.menu = menu;
        }
        this.menu.innerText = "Punktzahl: " + points;
    }
}

class Box {
    constructor(clientHeight) {
        this.position = 0;
        this.speed = 0;
        this.speedbase = clientHeight;
    }

    update() {
        this.speed = this.speed + (this.speedbase / 1000);
        this.position = this.position + this.speed;
    }
    moveUp() {
        this.speed = (this.speedbase / -27);
    }
}

class Game {
    constructor(element) {
        this.renderer = new Renderer(element);
        this.box = new Box(this.renderer.element.clientHeight);
        this.element = element;
    }

    setup() {
        this.element.addEventListener("click", () => {
            this.box.moveUp();
        }, false);
        
    }

    start() {
        let counter = 0;
        let timer = setInterval(() => {
            counter++;
            this.box.update();
            if (this.box.position < 0 || this.box.position + 40 > this.element.clientHeight) {
                this.box.position = 40;
                this.isRunning = false;
                clearInterval(timer);
                this.renderer.gameOver(counter);
                this.menu.style.display = "block";
            }
            if (this.isRunning) {
                this.renderer.render(this.box.position);
            }

        }, 16);
    }
    menu() {
        let menu = document.createElement("div");
        menu.id = "menu";
        this.element.appendChild(menu);
        this.menu = menu;
        this.menu.innerText = "Start";
        this.menu.addEventListener("click", event => {
            this.restart();
            event.stopPropagation();
        });
    }
    restart() {
        this.menu.style.display = "none";
        this.renderer.setup();
        setTimeout(() => {
            this.setup();
            this.box.speed = 0;
            this.start();
            this.isRunning = true;
        }, 200);
    }
}

let game = new Game(document.getElementById("game"));

window.onload = function () {
    game.menu();
}