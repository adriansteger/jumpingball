let myAudio = new Audio("Jumpingball-Theme.mp3");
if (typeof myAudio.loop == "boolean") {
    myAudio.loop = true;
} else {
    myAudio.addEventListener("ended", function () {
        this.currentTime = 0;
        this.play();
    }, false);
}
myAudio.play();