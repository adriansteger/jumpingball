"use strict";


class Renderer {

    constructor(element) {
        this.element = element;
        this.setup();
    }

    setup() {
        let box = document.getElementById("box");
        if (box) {
            let box = document.getElementById("box");
            box.style.top = "40px";
        } else {
            let box = document.createElement("div");
            box.id = "box";

            this.element.appendChild(box);
            this.box = box;
        }

    }

    render(position) {
        this.box.style.top = position + "px";
    }

    gameOver(points) {
        let menu = document.getElementById("gameover");
        if (menu) {
            menu.innerText = "Punktzahl: " + points;
        } else {
            let menu = document.createElement("div");
            menu.id = "gameover";
            menu.innerText = "Punktzahl: " + points;

            this.element.appendChild(menu);
            this.menu = menu;
        }

    }
}

class Box {
    constructor(clientHeight) {
        this.position = 0;
        this.speed = 0;
        this.speedbase = clientHeight;
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
                this.box.position = 40;
                this.isRunning = false;
                clearInterval(timer);
                //alert("Oberer Rand erreicht: " + counter + " Punkte!");
                this.renderer.gameOver(counter);
                this.menu.style.display = "block";
            }
            if (this.box.position + 40 > this.element.clientHeight) {
                this.box.position = 40;
                this.isRunning = false;
                clearInterval(timer);
                //alert("Unterer Rand erreicht: " + counter + " Punkte!");
                this.renderer.gameOver(counter);
                this.menu.style.display = "block";
            }
            if (this.isRunning == true) {
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
        this.menu.addEventListener("click", () => {
            this.restart();
        }, false)
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