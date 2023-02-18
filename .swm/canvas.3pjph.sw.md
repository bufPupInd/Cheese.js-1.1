---
id: 3pjph
title: Canvas
file_version: 1.1.2
app_version: 1.2.4
---

**new Canvas** is a constructor that makes a blank HTML5 canvas to draw on

By default, if they're are no parameters passed, the canvas will default to 500x with a color of black

```javascript
const canvas = new Canvas(500, 500, Color(0));
```

The 1st parameter is the length and the second is the width of the canvas made. The 3rd parameter is the color of the canvas.

**Canvas.length** and **Canvas.width** are attributes of any canvas object that describe it's measurements in pixels. Length is horizontal and width is vertical. If you change these values they won't have effect. After the canvas is created it's length and width can't be changed until the Canvas.resize function is called

```javascript
const canvas = new Canvas(500, 700, Color(0));
console.log(canvas.length); //Expected 500
console.log(canvas.width); //Expected 700
```

**Canvas.color** is an attribute of the canvas that sets the color of the canvas. Updating this value will have no effect until the canvas is cleared.

```javascript
const canvas = new Canvas();
console.log(canvas.color) //Expected black (default)
```

**Canvas.getPixelData** is a function on the canvas constructor that gets the color of every pixel on the canvas is either a 1D or 2D array. To poke an element in a 2D array you can use 'arr\[x\]\[y\]'. The only parameter is the dimensionality of the array: '1D' or '2D'

```javascript
const canvas = new Canvas();
const data = canvas.getPixelData('2D');
console.log(data[0][0]); //Logs the first pixel color
```

**Canvas.drawSprite** takes a sprite as it's only parameter and draws it to the screen.

```javascript
const canvas = new Canvas();
const sprite = new Sprite(250, 250, 'path.png');
canvas.drawSprite(sprite); //Draws the path 'path.png' to the screen
```

**Canvas.drawText** takes a text object as it's only parameter and draws it to the screen.

```javascript
const canvas = new Canvas();
const text = new Text('Hello World', 250, 250, 'Arial', 24, Color(255));
canvas.drawText(text); //Draws Hello World to the screen
```

**Canvas.drawRect** accepts a rectangle object as it's parameter and draws it to the screen.

```javascript
const canvas = new Canvas();
const rect = new Rect(250, 250, 50, 50, Color(255));
canvas.drawRect(rect);
```

**Canvas.drawEllipse** draws an ellipse object to the screen from it's first parameter

```javascript
const canvas = new Canvas();
const ellipse = new Ellipse(250, 250, 50, 50, Color(255));
canvas.drawEllipse(ellipse);
```

**Canvas.drawLine** draws a straight line from one x, y point to another.

```javascript
const canvas = new Canvas();
const line = new Line(0, 0, 500, 500, 3, Color(255));
canvas.drawLine(line); //Draws a line across the screen
```

**Canvas.drawPolygon** draws a path and fills it making a polygon out of an array of vectors. Only 1D arrays can be used, and points will be filled and drawn in the order of the array

```javascript
const arr = [ //Array of x, y points
  new Vector(250, 150),
  new Vector(354, 219.4),
  new Vector(329.9, 332.6),
  new Vector(220.1, 332.6),
  new Vector(196, 219.4)
]
const canvas = new Canvas();
const path = new Path(arr, Color(255));
canvas.drawPolygon(path);
```

**Canvas.drawPath** draws multiple lines connected at their ends in the order given in the path object given as input.

```javascript
const arr = [ //Array of x, y points
  new Vector(250, 150),
  new Vector(354, 219.4),
  new Vector(329.9, 332.6),
  new Vector(220.1, 332.6),
  new Vector(196, 219.4)
]
const canvas = new Canvas();
const path = new Path(arr, Color(255));
canvas.drawPath(path);
```

The code above will draw the same polygon as above but without a fill because the points are the same but the drawing function is different

**Canvas.drawSpline** takes a path as input and draws a cat-mull rom spline (array of curves) between those points. This specific spline passes through all of the points given but curves in between them

The code below will draw the same path as above but with a curve to it.

```javascript
const arr = [ //Array of x, y points
  new Vector(250, 150),
  new Vector(354, 219.4),
  new Vector(329.9, 332.6),
  new Vector(220.1, 332.6),
  new Vector(196, 219.4)
]
const canvas = new Canvas();
const path = new Path(arr, Color(255));
canvas.drawSpline(path);
```

**Canvas.drawCube** takes a cube and draws it to the screen with a z offset

```javascript
const canvas = new Canvas();
const cube = new Cube(250, 250, 50, 70, -10, 3, Color(255));
canvas.drawCube(cube);
```

**Canvas.drawQuadraticBezier** draws the know curve the bezier to the screen with 3 points

```javascript
const arr = [
    new Vector(0, 250),
    new Vector(250, 30),
    new Vector(500, 250
]
const canvas = new Canvas();
const path = new Path(arr, Color(255));
canvas.drawQuadraticBezier(path);
```

**Canvas.drawCubicBezier** draws the know curve the bezier to the screen with 4 points. This will be the same as the previous function but with 1 more control point

```javascript
const arr = [
    new Vector(0, 250),
    new Vector(100, 30),
    new Vector(300, 470),
    new Vector(500, 250)
]
const canvas = new Canvas();
const path = new Path(arr, Color(255));
canvas.drawCubicBezier(path);
```

**Canvas.updatePixel** is a drawing function that changes a single pixel at any specified x, y location on the canvas. If it's off the canvas it will have no effect. This function doesn't take a separate object to draw it. The parameters are the x location, the y location, and the new color of the pixel

```javascript
const canvas = new Canvas();
canvas.updatePixel(100, 100, Color(255));
```

**Canvas.clear** clears the canvas and redraws the background but doesn't resize the canvas. It takes a single parameter color that isn't defaulted to anything, so it must be entered.

```javascript
const canvas = new Canvas(); //Defaults to black
canvas.clear(canvas.color); //Earases everything on the canvas
canvas.clear(Color(255)); //Makes it black
```

**Canvas.translate** takes an x and y value based on the current 0, 0 point on the canvas and it moves the point 0, 0 to where ever you specify. This will effectively changing the perspective.

```javascript
const canvas = new Canvas();
canvas.translate(0, 10);//Moves everything down by 10 pixels
canvas.translate(0, -10); //Moves everythin back to where it was
```

**Canvas.rotate** takes the amount to rotate in radias which is a rotation system based on PI or TOU. 2\*PI is the same as 180 degrees in normal rotation. The next 2 parameters are the x and y to rotate around. This does not have a default value so you must input one.

```javascript
const canvas = new Canvas();
canvas.rotate(PI, 250, 250); //Rotates the canvas by 90 Degrees
canvas.drawRect(new Rect(250, 250, 50, 50, Color(255))); //Draws a rotated rect
canvas.rotate(-PI, 250, 250); //Rotates back
```

In the parameter for radias you can use the **degreesToRadians** function and input your preferred degree amount. The code below will have the same effect as the one above.

```javascript
const canvas = new Canvas();
canvas.rotate(degreesToRadians(90), 250, 250); //Rotates the canvas by 90 Degrees
canvas.drawRect(new Rect(250, 250, 50, 50, Color(255))); //Draws a rotated rect
canvas.rotate(degreesToRadians(-90), 250, 250); //Rotates back
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBQ2hlZXNlLmpzLTEuMSUzQSUzQUpNSDMxNw==/docs/3pjph).
