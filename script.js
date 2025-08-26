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
var videoDone = false;
document.getElementById("gokartchatvideo").addEventListener("ended", function() {
        console.log("video ended");
        videoDone = true;
        document.getElementById("gokartchatpolaroid").classList.add("activated");
})
// Play video on click
document.getElementById("gokartchat").addEventListener("click", function() {
    if(!videoDone) {
        document.getElementById("gokartchatvideo").play();
    }
    
});
// Play video when scrolling to a certain point
window.addEventListener("scroll", function() {
    if(window.scrollY > 1100 && !videoDone) {
        document.getElementById("gokartchatvideo").muted = true;
        document.getElementById("gokartchatvideo").play();
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