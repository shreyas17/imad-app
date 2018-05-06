console.log('Loaded!');
var element=document.getElementById('hell');
element.innerHTML='new valye';

var imgElement = document.getElementById("img");
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var interval=setInterval(moveRight,50);
};