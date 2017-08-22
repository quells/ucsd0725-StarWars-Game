var Starfield = function(canvas) {
    this.canvas = canvas;

    var width = 6000;
    var height = 6000;
    var area = width * height;
    var density = 0.001;
    var speed = 0.005;
    var N = Math.floor(area*density);
    this.stars = new Array(N);
    for (var i = 0; i < N; i++) {
        var x = Math.random()*width;
        var y = Math.random()*height;
        var size = Math.floor(Math.random()*3) + 1;
        var dx = (2*Math.random()-1)*speed*size*size;
        var dy = (2*Math.random()-1)*speed*size*size;
        this.stars[i] = {
            "x": x, "y": y,
            "dx": dx, "dy": dy,
            "size": size
        };
    }

    this.draw = function() {
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "#fff";
        for (var n = 0; n < this.stars.length; n++) {
            var star = this.stars[n];
            if (star.x < this.canvas.width && star.y < this.canvas.height) {
                ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
            }
            star.x = (star.x + star.dx + 6000) % 6000;
            star.y = (star.y + star.dy + 6000) % 6000;
            this.stars[n] = star;
        }
    };
};
