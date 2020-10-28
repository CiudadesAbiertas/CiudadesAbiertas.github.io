var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
acc[i].addEventListener("click", function() {
    this.classList.toggle("activeBox");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
    panel.style.maxHeight = null;
    } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
    } 
});
}
/*$(".accordion a").click(function(e) {
    // Do something
    e.stopPropagation();
 });*/