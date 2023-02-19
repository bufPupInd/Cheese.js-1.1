---
id: dhr0e
title: Input Options
file_version: 1.1.2
app_version: 1.2.4
---

Mouse input can be fount in the **mouse** object. You can find mouse position, if the mouse is clicked, an onClick function.

To get the current mouse position you can use **mouse.x** and **mouse.y**. These are not to be changed by the user. On any change as soon as another frame passes it'll update to it's real position. The position is relative to 0, 0 and doesn't have to be on the canvas.

```javascript
const mousePos = new Vector(mouse.x, mouse.y);
```

**mouse.onClick** is an event to find when the mouse is clicked. The only parameter is a callback function. When the mouse is clicked the function will be called. The index of the mouse button clicked is passed through as a parameter to your callback.

```
mouse.onClick((mouseButton) => {
    console.log(mouseButton) //Logs the button pressed
}); //Uses the arrow syntax () => {}
```

Bellow is a table that describes what each mouse button index is called: for example mouse button one is commonly known as 'left click'

<br/>

|Button Index                 |Name                                                     |
|-----------------------------|---------------------------------------------------------|
|1<br><br>2<br><br>3<br><br>4+|Left<br><br>Right<br><br>Scroll Wheel<br><br>Side Buttons|

<br/>

To get keyboard input you can use the **key** object. You can find the current key, onUp, onDown, and more in this object

**key.onDown** is a function with a callback that is called when any key is pressed down on the keyboard

```
key.onDown(() => {
    console.log('Button pressed');
})
```

**key.onUp** is a function with a callback that is called when any key is lifted on the keyboard

```
key.onUp(() => {
    console.log('Button lifted');
})
```

**key.current** is the current button being pressed. This is a single letter string for most keys. All are not capital

```
key.onDown(() => {
    console.log(key.current); //Logs the key being pressed
})
```

**key.gameDir** is a number value of the index of the wasd key being pressed. If a wasd key isn't being pressed then it will be null.

```
key.onDown(() => {
    console.log(key.gameDir); 
})
```

<br/>

|gameDir                                 |Name                                             |
|----------------------------------------|-------------------------------------------------|
|1<br><br>2<br><br>3<br><br>4<br><br>null|W<br><br>D<br><br>S<br><br>A<br><br>Any other key|

<br/>

Above is a chart for the index in gameDir and the name of the key

**key.gameAxis** is a vector object that holds a value between -1 and 1 depending on the game key being pressed currently. If none are pressed both values are 0

```
key.onDown(() => {
    console.log(key.gameAxis)
})
```

<br/>

|Button                                  |gameAxis value                                              |
|----------------------------------------|------------------------------------------------------------|
|W<br><br>D<br><br>S<br><br>A<br><br>None|Y: 1<br><br>X: 1<br><br>Y: -1<br><br>X: -1<br><br>X: 0, Y: 0|

<br/>

The table above shows what axis is what value when any of the game keys are being pressed at the frame chosen

**Canvas.Button** is a constructor for a button to be shown on the canvas. It is rendered with a simple rectangle and text. It takes these parameters (x, y, length, width, text, text font, text size, text color, and background rectangle color. Unlike the rectangle the button is centered at it's center, so where it's drawn will be it's center pixel. The code below makes a button centered at 250, 250 with a length of 100 and a width of 50. Text of 'Hello World' and a size of 25 with colors of gray and pink.

```javascript
const canvas = new Canvas();
const button = new canvas.Button(250, 250, 100, 50, 'Hello World', 'Arial', 24, Color(255, 0, 255), Color(150));
```

**Button.drawButton** takes no parameters and simply draws the button object to the screen

```javascript
const canvas = new Canvas();
const button = new canvas.Button(250, 250, 100, 50, 'Hello World', 'Arial', 24, Color(255, 0, 255), Color(150));
button.drawButton(); //Draws the button to the screen
```

**Button.onClick** is a function similar to mouse.onClick where whenever the button is pressed the callback function is called with a parameter of mouse button clicked with

```javascript
const canvas = new Canvas();
const button = new canvas.Button(250, 250, 100, 50, 'Hello World', 'Arial', 24, Color(255, 0, 255), Color(150));
button.drawButton(); //Draws the button to the screen
button.onClick((mouseButton) => {
    console.log(`Button clicked with ${mouseButton}`);
})
```

The button has all the attributes of a Rect object and a text object

```javascript
const canvas = new Canvas();
const button = new canvas.Button(250, 250, 100, 50, 'Hello World', 'Arial', 24, Color(255, 0, 255), Color(150));

console.log(button.length, button.width) //The dimensions of the button's rectangle
console.log(button.x, button.y) //The center position of the button
console.log(button.str) //The text on the button
console.log(button.font) //Text font
console.log(button.size) //Size of the text in pixels
console.log(button.textColor) //Color of the text
console.log(button.bgColor) //Background color
```

**Canvas.Slider** is a constructor in the canvas object that makes an editable slider that you can customize with sizes and colors and either can be edited by the user or the code

The parameters to make a slider are (x, y, length, width, startValue, minValue, maxValue, knobRadias, knobColor, backgroundColor).

The code below draws a slider at 250 250 with dimensions of 100x50 with a value range from 0 to 100 that starts at 50

```javascript
const canvas = new Canvas();
const slider = new Slider(250, 250, 100, 5, 50, 0, 100, 7, Color(255, 0, 255), Color(150));
```

**Slider.drawSlider** draws a slider element to the screen at it's specified x, y coordinates

```javascript
const canvas = new Canvas();
const slider = new Slider(250, 250, 100, 5, 50, 0, 100, 7, Color(255, 0, 255), Color(150));
slider.drawSlider();
```

**Slider.onChange** takes a callback and calls that function every time the user or the code changes the value of the slider

```javascript
const canvas = new Canvas();
const slider = new Slider(250, 250, 100, 5, 50, 0, 100, 7, Color(255, 0, 255), Color(150));
slider.drawSlider();
slider.onChange(() => {
    console.log('Slider Edited');
})
```

**Slider.value** represents the value at which the slider is currently at between it's minimum and maximum points. This value doesn't have to be a whole number nor does it have to be in pixels.

```javascript
const canvas = new Canvas();
const slider = new Slider(250, 250, 100, 5, 50, 0, 100, 7, Color(255, 0, 255), Color(150));
slider.drawSlider();
slider.onChange(() => {
    console.log('Slider Edited');
    console.log(slider.value); //Logs the current value of the slider knob
})
```

**Slider.editable** is a boolean value automatically set to true if it isn't changed. This bool represents if the user is able to use the slider and edit the value. If it is turned to false the knob and value won't change on user input.

**Slider.x** and **Slider.y** represent the current position in pixels of the slider.

```javascript
const canvas = new Canvas();
const slider = new Slider(250, 250, 100, 5, 50, 0, 100, 7, Color(255, 0, 255), Color(150));
slider.drawSlider();
console.log(slider.x, slider.y); //Expected 250, 250
```

**Slider.length** and **Slider.width** are the values of the dimensions of the slider. Length being the x measurement and width being the measurement along the y axis.

```javascript
const canvas = new Canvas();
const slider = new Slider(250, 250, 100, 5, 50, 0, 100, 7, Color(255, 0, 255), Color(150));
slider.drawSlider();
console.log(slider.width, slider.width); //Expected 100, 5
```

**Slider.min** and **Slider.max** represent the values entered at the creation of the slider for the minimum for Slider.value and the maximum. This value is a constant and should never be changed. If changed there will be no effect.

```javascript
const canvas = new Canvas();
const slider = new Slider(250, 250, 100, 5, 50, 0, 100, 7, Color(255, 0, 255), Color(150));
slider.drawSlider();
console.log(slider.min, slider.max); //Expected 0, 100
```

**Slider.knobRadias** is the radias for the circular knob on the slider.

```javascript
const canvas = new Canvas();
const slider = new Slider(250, 250, 100, 5, 50, 0, 100, 7, Color(255, 0, 255), Color(150));
slider.drawSlider();
console.log(slider.knobRadias); //Expected 7
```

**Slider.backgroundColor** and **Slider.knobColor** are the 2 colors chosen for the parts of the slider. If changed they won't have any effect

```javascript
const canvas = new Canvas();
const slider = new Slider(250, 250, 100, 5, 50, 0, 100, 7, Color(255, 0, 255), Color(150));
slider.drawSlider();
console.log(slider.knobColor, slider.backgroundColor);
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBQ2hlZXNlLmpzLTEuMSUzQSUzQUpNSDMxNw==/docs/dhr0e).
