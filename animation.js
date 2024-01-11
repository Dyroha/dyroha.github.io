class Circle {
    constructor(radius, colour){
        this.radius = radius;
        this.colour = colour;
    }
}

function makeRandomCircle() {
    let circle = new Circle(Math.random() * 10, "blue");
    return circle;
}
