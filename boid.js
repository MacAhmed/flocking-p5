class Boid{
    constructor(){
        this.position = createVector(random(width), random(height));
        this.velocity  = p5.Vector.random2D();
        this.velocity.setMag(random(1, 5));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 5;

		this.hue = random(150, 240);
		this.saturation = random(50, 100);
		this.brightness = random(30, 100);
    }

    edges(){
        if(this.position.x > width ){
            this.position.x = 0;
        } else if ( this.position.x < 0){
            this.position.x = width;
        }

        if(this.position.y > height ){
            this.position.y = 0;
        } else if ( this.position.y < 0){
            this.position.y = height;
        }
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    align(){
        let perception = 100;
        let total = 0;
        let perceptionCount = 5;

        let steering = createVector();
        
        for( let other of quadTree.getItemsInRadius(this.position.x, this.position.y, perception, perceptionCount)){
            steering.add(other.velocity);
            total++;
        }

        if( total > 0 ){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
    }

    cohesion(){
        let perception = 100;
        let total = 0;
        let perceptionCount = 5;

        let steering = createVector();

        for( let other of quadTree.getItemsInRadius(this.position.x, this.position.y, perception, perceptionCount)){
            steering.add(other.position);
            total++;
        }

        if( total > 0 ){
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
    }

    seperation(){
        let perception = 100;
        let total = 0;
        let perceptionCount = 5;

        let steering = createVector();

        for( let other of quadTree.getItemsInRadius(this.position.x, this.position.y, perception, perceptionCount)){
            let diff = p5.Vector.sub(this.position, other.position);
            let d = diff.x * diff.x + diff.y * diff.y;
            if (d === 0) continue;

            diff.div(d);
            steering.add(diff);
            total++;
        }

        if( total > 0 ){
            steering.div(total);
            
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
    }

    flock(boids){
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.seperation(boids);
        
        this.acceleration = alignment;
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    show(){
        strokeWeight(4);
        stroke(this.hue, this.saturation, this.brightness);
        point(this.position.x, this.position.y);
    }
}