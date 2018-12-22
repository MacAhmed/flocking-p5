# Flocing Simulation - p5
A flocking simulation built using [p5.js](https://p5js.org/).

# Description
In general, the program models coordinated animal motion such as bird flocks, fish schools etc. The basic flocking model consists of three principles :

1. **Alignment** : Each boid (flocking creature) steers towards the average direction of local flockmates movements.
2. **Cohesion** : Each boid (flocking creature) steers towards the average position of the local flockmates.
3. **Seperation** : Each boid (flocking creature) steers to avoid crowding the local flockmates.

Locality is currently defined as all flockmates in a certain distance. Howeve,r a better representation would be a distance and an angle measured from the direction of flight. So, that those within the angle and the distance would be considered as being in the neighbourhood.

# Todo
* Improve the seperation behaviour.
* Implement the angle-based idea of a neighbourhood - not just a distance-based neighbourhood. 

[1]. Reynolds, C. (2001). Boids (Flocks, Herds, and Schools: a Distributed Behavioral Model). [online] Red3d.com. Available at: https://www.red3d.com/cwr/boids/
