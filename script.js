var canvas, ctx;
var circles = [];
var selectedCircle;
var hoveredCircle;

// -------------------------------------------------------------

// объекты :

function Circle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
}

// -------------------------------------------------------------

// функции отрисовки :

function clear() { // функция очищает canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawCircle(ctx, x, y, radius) { // функция рисует окружность
    ctx.fillStyle = 'rgba(255, 35, 55, 1.0)';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function drawScene() { // main drawScene function
    clear(); // очистить canvas

    ctx.beginPath(); // начало фигуры
    ctx.fillStyle = 'rgba(255, 110, 110, 0.5)';
    ctx.moveTo(circles[0].x, circles[0].y);
    for (var i=0; i<circles.length; i++) {
        ctx.lineTo(circles[i].x, circles[i].y);
    }
    ctx.closePath(); // конец фигуры
    ctx.fill(); // заполнение фигуры

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.stroke(); // отрисовка границы

    for (var i=0; i<circles.length; i++) { // отобразить все окружности
        drawCircle(ctx, circles[i].x, circles[i].y, (hoveredCircle == i) ? 25 : 15);
    }
}

// -------------------------------------------------------------

// инициализация

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    var circleRadius = 15;
    var width = canvas.width;
    var height = canvas.height;

    var circlesCount = 15; // мы нарисуем 7 окружностей
    for (var i=0; i<circlesCount; i++) {
        var x = Math.random()*width;
        var y = Math.random()*height;
        circles.push(new Circle(x,y,circleRadius));
    }

    // привязываем событие нажатия мыши (для перетаскивания)
    $('#scene').mousedown(function(e) {
        var canvasPosition = $(this).offset();
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        for (var i=0; i<circles.length; i++) { // проверка всех окружностей - клавиша мыши нажата внутри окружности или нет
            var circleX = circles[i].x;
            var circleY = circles[i].y;
            var radius = circles[i].radius;
            if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2)) {
                selectedCircle = i;
                break;
            }
        }
    });

    $('#scene').mousemove(function(e) { // привязываем событие движения мыши для перетаскивания выбранной окружности
            var mouseX = e.layerX || 0;
            var mouseY = e.layerY || 0;
        if (selectedCircle != undefined) {
            var canvasPosition = $(this).offset();

            var radius = circles[selectedCircle].radius;
            circles[selectedCircle] = new Circle(mouseX, mouseY,radius); // изменяем позицию выбранной окружности
        }

        hoveredCircle = undefined;
        for (var i=0; i<circles.length; i++) { // проверка всех окружностей - клавиша мыши нажата внутри окружности или нет
            var circleX = circles[i].x;
            var circleY = circles[i].y;
            var radius = circles[i].radius;
            if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2)) {
                hoveredCircle = i;
                break;
            }
        }
    });

    $('#scene').mouseup(function(e) { // событие mouseup - очистка выбранной окружности
        selectedCircle = undefined;
    });

    setInterval(drawScene, 30); // скорость отрисовки
});