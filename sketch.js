const flock = [];
let alignSlider, cohesionSlider, separationSlider;
let trail = 0.2;
let quadTree;
let sTotal;

function setup(){
    colorMode(HSB,360,100,100,1);

    createCanvas(window.innerWidth, window.innerHeight);
    quadTree = new QuadTree(Infinity, 30, new Rect(0, 0, width, height));

    for(let i = 0; i < 600 ; i++){
        flock.push(new Boid());
    }
}

function draw() {

    quadTree.clear();
    for (const boid of flock) {
      quadTree.addItem(boid.position.x, boid.position.y, boid);
    }
    
    background(249,30,10,trail);
    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
    }  
  }