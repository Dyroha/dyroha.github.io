function randn_bm(min, max, skew) {
    let u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew);
    // resample between 0 and 1 if out of range
    else {
        num = Math.pow(num, skew); // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
    }
    return num;
}

var randomColor = function () {
    return Math.floor(Math.random() * 16777215).toString(16);
};

var randomName = function () {
    return names[Math.floor(Math.random() * names.length)];
};

class Duck {
    constructor(id, name, radius, color, x, y) {
        this.id = id;
        this._name = name;
        // this._width = width;
        // this._height = height;
        this._radius = radius;
        this._color = color;
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.distance = 3;
    }

    move() {
        this.angle += randn_bm(-Math.PI / 2, Math.PI / 2, 1);
        this.x += this.distance * Math.cos(this.angle);
        this.y += this.distance * Math.sin(this.angle);

        //if x or y is outside of the bounds, make angle face center
        if (
            this.x - this._radius < 0 ||
            this.x + this._radius > game.canvas.width ||
            this.y - this._radius < 0 ||
            this.y + this._radius > game.canvas.height
        ) {
            this.angle = Math.atan2(
                game.canvas.height / 2 - this.y,
                game.canvas.width / 2 - this.x
            );
        }

        //if hit another duck reverse angle
        for (let i = 0; i < ducks.length; i++) {
            let duck2 = ducks[i];
            if(this.id == duck2.id) {
                continue;
            }
            let distance =
                Math.sqrt(
                    Math.pow(this.x - duck2.x, 2) +
                        Math.pow(this.y - duck2.y, 2)
                ) -
                this._radius -
                duck2._radius;
            if (distance <= 0) {
                //calculate direction so the bounce off eachother
                this.angle = - Math.atan2(
                    duck2.y - this.y,
                    duck2.x - this.x
                );
            }
        }
    }

    animate() {
        let ctx = game.context;
        ctx.fillStyle = this._color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this._radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        // ctx.font = "20px Arial";
        // ctx.fillStyle = "black";
        // ctx.fillText(
        //     this._name,
        //     this.x - this._radius,
        //     this.y - this._radius - 5
        // );
    }

    update() {
        this.animate();
        this.move();
    }
}

var ducks = [];

var game = {
    canvas: document.createElement("canvas"),
    start: function (numDucks) {
        this.ispaused = false;
        this.numDucks = numDucks;
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        //style
        this.canvas.style.backgroundColor = "lightblue";
        this.canvas.style.padding = 0;
        this.canvas.style.margin = 0;
        for (var i = 0; i < this.numDucks; i++) {
            ducks.push(
                new Duck(
                    i,
                    randomName(),
                    Math.random()*50 + 5,
                    "#" + randomColor(),
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height
                )
            );
        }

        console.log(ducks);

        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(this.updateGameArea, 20);
    },

    updateGameArea: function () {
        game.clear();
        var len = ducks.length;
        for (var i = 0; i < len; i++) {
            ducks[i].update();
        }
    },

    stop: function () {
        clearInterval(this.interval);
    },

    pause: function () {
        if(this.ispaused) {
            this.start();
            this.ispaused = false;
        } else {
            this.stop();
            this.ispaused = true;
        }
        console.log(this.ispaused);
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};
