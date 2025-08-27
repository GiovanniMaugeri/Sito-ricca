var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


// Close nav on cross click
document.getElementById("nav-cross").addEventListener("click", function() {
    document.querySelector("nav").classList.remove("open");
    enableScroll();
}) ;
// Open nav on burger menu click
document.getElementById("burger-menu").addEventListener("click", function() {
    document.querySelector("nav").classList.add("open");
    disableScroll();
    
}) ;
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
// Scroll to top on page load
window.addEventListener("load", function() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});


document.getElementById("scrollDownBtn").addEventListener("click", function() {
    window.scroll({
        top: window.innerHeight-document.getElementsByTagName("header")[0].offsetHeight,
        left: 0,
        behavior: 'smooth'
    });
})