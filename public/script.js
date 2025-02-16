
window.onload= function() {
    const canvas = document.getElementById("svgCanvas");
    const ctx = canvas.getContext("2d");

    let polygons = [
        { points: [{x: 50, y: 300}, {x: 150, y: 200}, {x: 250, y: 300}], color: "red", dx: 2, dy: 1 },
        { points: [{x: 100, y: 150}, {x: 200, y: 150}, {x: 200, y: 250}, {x: 100, y: 250}], color: "blue", dx: -2, dy: 1 },
        { points: [{x: 50, y: 350}, {x: 150, y: 250}, {x: 250, y: 350}, {x: 300, y: 300}], color: "green", dx: 1, dy: -2 },
        { points: [{x: 80, y: 250}, {x: 180, y: 100}, {x: 280, y: 250}, {x: 230, y: 350}, {x: 130, y: 350}], color: "gradient", dx: 1, dy: 2 },
        { points: [{x: 150, y: 50}, {x: 200, y: 50}, {x: 250, y: 100}, {x: 200, y: 150}, {x: 150, y: 100}], color: "yellow", dx: -1, dy: -1 },
        { points: [{x: 100, y: 100}, {x: 150, y: 50}, {x: 200, y: 100}, {x: 200, y: 200}, {x: 150, y: 250}, {x: 100, y: 200}], color: "cyan", dx: 3, dy: 2 }
    ];

    let isAnimating = true;
    let animationFrameId;

    function drawPolygon(polygon) {

        ctx.beginPath();
        ctx.moveTo(polygon.points[0].x, polygon.points[0].y);

        for (let i = 1; i < polygon.points.length; i++) {
            ctx.lineTo(polygon.points[i].x, polygon.points[i].y);
        }
        ctx.closePath();

        if (polygon.color === "gradient") {
            let gradient = ctx.createLinearGradient(50, 50, 300, 300);
            gradient.addColorStop(0, "purple");
            gradient.addColorStop(1, "orange");

            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = polygon.color;
        }

        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();

    }

    function updatePositions() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        polygons.forEach(polygon => {
            polygon.points.forEach(point => {
                point.x += polygon.dx;
                point.y += polygon.dy;

                if (point.x < 0 || point.x > canvas.width) polygon.dx *= -1;
                if (point.y < 0 || point.y > canvas.height) polygon.dy *= -1;
            });

            drawPolygon(polygon);

        });

        animationFrameId = requestAnimationFrame(updatePositions);
    }
    function toggleUpdate() {
        if(isAnimating) {
            cancelAnimationFrame(animationFrameId);
            isAnimating = false;
        } else {
            updatePositions();
            isAnimating = true;
        }
    }

    document.getElementById('toggleButton').addEventListener("click", toggleUpdate);

    updatePositions();

};