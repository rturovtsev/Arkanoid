window.onload = function() {
    start();
    movePen();
};

var area = document.getElementById("area");
var boll = document.getElementById("boll");
var pen = document.getElementById("pen");
var boxs = document.querySelectorAll(".box");

var xWay = 1, //направление по оси х
    yWay = -1, //направление по оси у
    xSpeed = 4, //скорость по горизонтали
    ySpeed = 4, //скорость по вертикали
    xBox, //палка по горизонтали
    yBox, //палка по вертикали
    targetBox, //палка в которую попали
    animate; //интервал анимации

boll.style.left = '136px';
boll.style.top = '200px';


function start() {
    animate = setInterval(function () {
        muveBoll();

        if (parseInt(boll.style.left) >= 272) {
            xWay = -1;
        } else if (parseInt(boll.style.left) <= 0) {
            xWay = 1;
        }

        if (parseInt(boll.style.top) >= 240) {
            stopBoll();
            alert("Проиграл!");
            yWay = -1;
        } else if (parseInt(boll.style.top) <= 0) {
            yWay = 1;
        }

        if (parseInt(boll.style.left) + 5 > parseInt(pen.style.left) && (parseInt(boll.style.left) + 5) <= (parseInt(pen.style.left) + 10) && parseInt(boll.style.top) == 200) {
            xSpeed += 1;
            ySpeed -= 1;
            yWay = -1;
        }
        if (parseInt(boll.style.left)  > (parseInt(pen.style.left) + 10) && parseInt(boll.style.left)  <= (parseInt(pen.style.left) + 40) && parseInt(boll.style.top) == 200) {
            yWay = -1;
        }
        if (parseInt(boll.style.left) - 5 > (parseInt(pen.style.left) + 40) && (parseInt(boll.style.left) - 5) < (parseInt(pen.style.left) + 50) && parseInt(boll.style.top) == 200) {
            xSpeed += 1;
            yspeed -= 1;
            yWay = -1;
        }

        if (parseInt(boll.style.top) > 20 && parseInt(boll.style.top) < 62 ) {
           xBox = Math.round((parseInt(boll.style.left) + 5) / 20) + 1; //палка по горизонтали
           yBox = Math.round((parseInt(boll.style.top) - 20) / 10); //палка по вертикали
           targetBox = 14 * yBox + xBox - 1;
           if (boxs[targetBox].className != 'box remove'){
               boxs[targetBox].className += ' remove';

               console.log(xBox, yBox, targetBox);

               xWay *= -1;
               yWay *= -1;
           }
        }
    }, 17);
}



function muveBoll() {
    boll.style.left = parseInt(boll.style.left) + xWay *xSpeed + 'px';
    boll.style.top = parseInt(boll.style.top) + yWay * ySpeed + 'px';
}

function movePen() {
    area.addEventListener("mousemove", function(e){
        pen.style.left = e.clientX - 25 + 'px';
        if (e.clientX > 257) {
            pen.style.left = '230px';
        } else if (e.clientX < 25) {
            pen.style.left = '0px';
        }
    });
}

function stopBoll() {
    clearInterval(animate);
}