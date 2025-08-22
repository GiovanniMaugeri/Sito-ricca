document.getElementById("nav-cross").addEventListener("click", function() {
    document.querySelector("nav").classList.remove("open");
}) ;
document.getElementById("burger-menu").addEventListener("click", function() {
    document.querySelector("nav").classList.add("open");
    
}) ;
var videoDone = false;
document.getElementById("gokartchatvideo").addEventListener("ended", function() {
        console.log("video ended");
        videoDone = true;
        document.getElementById("gokartchatpolaroid").classList.add("activated");
})
document.getElementById("gokartchat").addEventListener("click", function() {
    if(!videoDone) {
        document.getElementById("gokartchatvideo").play();
    }
    
});