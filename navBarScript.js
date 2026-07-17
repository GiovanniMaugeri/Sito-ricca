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


window.addEventListener("load", function() {
    var nav = document.querySelector("header nav");
    var cross = document.getElementById("nav-cross");
    var burger = document.getElementById("burger-menu");
    var header = document.querySelector("header");

    if (cross && nav) {
        cross.addEventListener("click", function() {
            nav.classList.remove("open");
            enableScroll();
        });
    }
    if (burger && nav) {
        burger.addEventListener("click", function() {
            nav.classList.add("open");
            disableScroll();
        });
    }
    if (nav) {
        nav.querySelectorAll("a").forEach(function(item) {
            item.addEventListener("click", function() {
                nav.classList.remove("open");
                enableScroll();
            });
        });
    }

    if (header) {
        function onScroll() {
            header.classList.toggle("scrolled", window.scrollY > 24);
        }
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }
});

    