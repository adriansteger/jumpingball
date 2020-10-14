"use strict";


class Renderer {

    constructor(element) {
        this.element = element;
        this.setup();
    }

    setup() {
        let box = document.createElement("div");
        box.id = "box";
        box.style.position = "absolute";
        box.style.top = "40px";
        box.style.left = "40%";
        box.style.backgroundColor = "red";
        box.style.width = "40px";
        box.style.height = "40px";
        box.style.borderRadius = "50%";

        this.element.appendChild(box);
        this.box = box;
    }

    render(position) {
        this.box.style.top = position + "px";
    }

    gameOver(points) {
        let menu = document.createElement("div");
        menu.id = "gameover";
        menu.innerText = "Punktzahl: " + points;

        this.element.appendChild(menu);
        this.menu = menu;
    }
}

class Box {
    constructor(clientHeight) {
        this.position = 0;
        this.speed = 0;
        this.speedbase = clientHeight;
        console.log(this.speedbase);
    }

    runLoop() {
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
        this.clientHeight = this.renderer.element.clientHeight
        this.box = new Box(this.clientHeight);
        this.element = element;
        this.isRunning = true;
        this.setup();
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
            this.box.runLoop();
            if (this.box.position < 0) {
                this.isRunning = false;
                clearInterval(timer);
                //alert("Oberer Rand erreicht: " + counter + " Punkte!");
                this.renderer.gameOver(counter);
            }
            if (this.box.position + 40 > this.element.clientHeight) {
                this.isRunning = false;
                clearInterval(timer);
                //alert("Unterer Rand erreicht: " + counter + " Punkte!");
                this.renderer.gameOver(counter);
            }
            if (this.isRunning == true) {
                this.renderer.render(this.box.position);
            }

        }, 16);
    }
}

let game = new Game(document.getElementById("game"));

window.onload = function () {
    game.start();
}