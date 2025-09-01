
// Video play and polaroid animation
// flags = videoGoKartDone, videoSpottedDone, videoPaintballDone
// implementing with array to make a reference pass in js
let flags = [false, false, false];
document.getElementById("chatVideoGoKart").addEventListener("ended", (e)=> videoEnded(e,flags,0))
document.getElementById("chatVideoSpotted").addEventListener("ended", (e)=> videoEnded(e,flags,1))
document.getElementById("chatVideoPaintball").addEventListener("ended", (e)=> videoEnded(e,flags,2))


function videoEnded(target, flag,index){
    flag[index] = true;
    target.target.parentElement.childNodes[1].classList.add("activated");

    console.log(flags);
}
// Play video when scrolling to a certain point
window.addEventListener("scroll", function() {
    if(window.scrollY > 1100 && !flags[0]) {
        document.getElementById("chatVideoGoKart").muted = true;
        document.getElementById("chatVideoGoKart").play();
    }
    if(window.scrollY > 1100 && !flags[1]) {
        document.getElementById("chatVideoSpotted").muted = true;
        document.getElementById("chatVideoSpotted").play();

    }
    if(window.scrollY > 1100 && !flags[2]) {
        document.getElementById("chatVideoPaintball").muted = true;
        document.getElementById("chatVideoPaintball").play();
    }
});


document.getElementById("scrollDownBtn").addEventListener("click", function() {
    window.scroll({
        top: window.innerHeight-document.getElementsByTagName("header")[0].offsetHeight,
        left: 0,
        behavior: 'smooth'
    });
})