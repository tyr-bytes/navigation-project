 # Notes

## Math Definitions

* The *radius* is Euclidian distance from **O**rigin to P

* The *inclination, or polar angle, or elevation* is the signed angle from the zenith reference direction measured from the line segment *OP*

* The *azimuth* is the the signed angle measured from the azimuth reference direction to the orthogonal projection of the radial line segmenet OP on the reference plane

* The sign of the azimuth is determined by designating the rotation that is the positive sense of turning about the zenith. This choice is arbitrary, and is part of the coordinate system definition. (If the inclination is either zero or 180 degrees (= $\pi$ radians), the azimuth is arbitrary. If the radius is zero, both azimuth and inclination are arbitrary.) 

* The elevation is the signed angle from the x-y reference plane to the radial line segment OP, where positive angles are designated as upward, towards the zenith reference. Elevation is 90 degrees (= π/2 radians) minus inclination. Thus, if the inclination is 60 degrees (= π/3 radians), then the elevation is 30 degrees (= π/6 radians). 

## Geographic Coordinates
This uses latitude (elevation angle) measured -90 <= $\phi$ <= 90. Longitude is -180 to 180 East and West.  This is in contrast to using inclination.  Inclination would be 90 - the latiude, 0 to 180.

 ## ThreeJS

 * phi (the polar angle) is measured from the positive y-axis. The positive y-axis is up. When ThreeJS says y, though, that shit's actually z.
 * theta (the azimuthal angle) is measured from the positive z-axis. When ThreeJS says z, though, they actually mean y. 

 ## Seb
 * His is lat = Asin(y), long= Atan(x, -z) for some reason

 ```javascript
 	function setFromSphericalCoords( radius, phi, theta ) {

		const sinPhiRadius = Math.sin( phi ) * radius;

		this.x = sinPhiRadius * Math.sin( theta );
		this.y = Math.cos( phi ) * radius;
		this.z = sinPhiRadius * Math.cos( theta );

		return this;
	}
```

```javascript
	function setFromCartesianCoords( x, y, z ) {

		this.radius = Math.sqrt( x * x + y * y + z * z );

		if ( this.radius === 0 ) {

			this.theta = 0;
			this.phi = 0;

		} else {

			this.theta = Math.atan2( x, z );
			this.phi = Math.acos( MathUtils.clamp( y / this.radius, - 1, 1 ) );

		}

		return this;

	}

```

### Note that Theta will be -pi to pi and not 0 to 2pi.
## Wiki Math

$x = r\sin(\theta)\cos(\phi)$  

$y = r\sin(\theta)\sin(\phi)$

$z = r\cos(\theta)$

## ThreeJS Math

$x = r\sin(\phi)\sin(\theta)$  

$y = r\cos(\phi)$  

$z = r\sin(\phi)\cos(\theta)$



