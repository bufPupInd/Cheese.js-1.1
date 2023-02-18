/*
    Cheese.js by bufPupIndustries;
    version 1.0.0
    www.bufpupindustries.com/home
    Creative drawing and math
    framework for js devs
*/
const PI = 3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019893809525720106548586327886593615338182796823030195203530185296899577362259941389124972177528347913151557485724245415069595082953311686172785588907509838175463746493931925506040092770167113900984882401285836160356370766010471018194295559619894676783744944825537977472684710404753464620804668425906949129331367702898915210475216205696602405803815019351125338243003558764024749647326391419927260426992279678235478163600934172164121992458631503028618297455570674983850549458858692699569092721079750930295532116534498720275596023648066549911988183479775356636980742654252786255181841757467289097777279380008164706001614524919217321721477235014144197356854816136115735255213347574184946843852332390739414333454776241686251898356948556209921922218427255025425688767179049460165346680498862723279178608578438382796797668145410095388378636095068006422512520511739298489608412848862694560424196528502221066118630674427862203919494504712371378696095636437191728746776465757396241389086583264599581339047802759009946576407895126946839835259570982582262052248940772671947826848260147699090264013639443745530506820349625245174939965143142980919065925093722169646151570985838741059788595977297549893016175392846813826868386894277415599185592524595395943104997252468084598727364469584865383673622262609912460805124388439045124413654976278079771569143599770012961608944169486855584840635342207222582848864815845602850601684273945226746767889525213852254995466672782398645659611635488623057745649803559363

const X = 'x axis';
const Y = 'y axis';
const RETURN = 'RETURN DATA';

let pageTitle = 'Cheese.js Window';
let framesPerSecond;
let frame = 0;
let startTime, currentTime;
let framesMeasured = false;

function update(func, frameRate) {
    if (!framesMeasured) {
        setInterval(() => { frame++ }, 1000 / frameRate);
        setInterval(() => { document.title = pageTitle }, 1000 / frameRate);
        framesMeasured = true;
    }
    startTime = performance.now();
    setInterval(func, 1000 / frameRate);
    setInterval(() => { windowWidth = window.innerWidth; windowHeight = window.innerHeight; }, 1000 / frameRate);

    currentTime = performance.now();
    framesPerSecond = 1000 / (currentTime - startTime);
}

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.mem = null;
        // Calculate the magnitude of the vector
        this.mag = Math.sqrt(this.x ** 2 + this.y ** 2);

        this.normalize = function (statement) {
            if (statement == RETURN) {
                return new Vector(this.x / this.mag, this.y / this.mag)
            } else {
                this.x = this.x / this.mag;
                this.y = this.y / this.mag;
            }
        }
        this.reflect = function (axis) {
            if (axis == X) {
                this.x = this.x * -1;
            } else if (axis == Y) {
                this.y = this.y * -1;
            } else {
                this.x = this.x * -1;
                this.y = this.y * -1;
            }
        }
        this.save = function () {
            this.mem = new Vector(this.x, this.y);
        }
        this.restore = function (statement) {
            if (statement == RETURN) {
                return new Vector(this.mem.x, this.mem.y)
            } else {
                this.x = this.mem.x;
                this.y = this.mem.y;
            }
        }
        this.flip = function (statement) {
            if (statement == RETURN) {
                return new Vector(this.y, this.x);
            } else {
                const oldX = this.x;
                this.x = this.y;
                this.y = oldX;
            }
        }
        this.add = function (v, statement) {
            if (v instanceof Vector) {
                if (statement == RETURN) return new Vector(this.x + v.x, this.y + v.y);
                else this.x += v.x; this.y += v.y;
            } else {
                if (statement == RETURN) return new Vector(this.x + v, this.y + v);
                else this.x += v; this.y += v;
            }
        }
        this.sub = function (v, statement) {
            if (v instanceof Vector) {
                if (statement == RETURN) return new Vector(this.x - v.x, this.y - v.y);
                else this.x -= v.x; this.y -= v.y;
            } else {
                if (statement == RETURN) return new Vector(this.x - v, this.y - v);
                else this.x -= v; this.y -= v;
            }
        }
        this.mult = function (v, statement) {
            if (v instanceof Vector) {
                if (statement == RETURN) return new Vector(this.x * v.x, this.y * v.y);
                else this.x *= v.x; this.y *= v.y;
            } else {
                if (statement == RETURN) return new Vector(this.x * v, this.y * v);
                else this.x *= v; this.y *= v;
            }
        }
        this.div = function (v, statement) {
            if (v instanceof Vector) {
                if (statement == RETURN) return new Vector(this.x / v.x, this.y / v.y);
                else this.x /= v.x; this.y /= v.y;
            } else {
                if (statement == RETURN) return new Vector(this.x / v, this.y / v);
                else this.x /= v; this.y /= v;
            }
        }
    }
}

function randomVector(maxX = 1, maxY = maxX) {
    return new Vector(random(0, maxX), random(0, maxY));
}

function polarToCartesian(radias, theata) {
    let output = { x: 0, y: 0 };
    output.x = Math.cos(theata) * radias;
    output.y = Math.sin(theata) * radias;
    return output
}

function average(arr) {
    let total = 0;
    for (i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total / arr.length;
}

function divisibleBy(val, mod) {
    if (val % mod === 0) return true;
    else return false;
}

function constrain(value, n1, n2) {
    if (value < n1) return n1;
    if (value > n2) return n2;
    else return value;
}

function map(number, originalMin, originalMax, desiredMin, desiredMax) {
    return (desiredMax - desiredMin) * (number - originalMin) / (originalMax - originalMin) + desiredMin;
}

function random(n1, n2, whole) {
    const r = Math.random() * (n2 - n1);
    if (whole == true) return Math.floor(map(r, 0, n2 - n1, n1, n2));
    else return map(r, 0, n2 - n1, n1, n2);
}

function randomIndex(arr) {
    return arr[random(0, arr.length - 1)];
}

function randomArray(length, n1, n2) {
    let output = new Array(length);
    for (i = 0; i < length; i++) {
        output[i] = random(n1, n2);
    }
    return output
}

function noise(length) {
    let output = new Array(length);
    let gradient = new Array(length);

    // Initialize gradient vectors with random values
    for (let i = 0; i < gradient.length; i++) {
        gradient[i] = Math.random();
    }

    // Interpolate between gradient vectors to generate the noise
    for (let i = 0; i < output.length; i++) {
        let position = i / output.length;
        let left = Math.floor(position * gradient.length);
        let right = (left + 1) % gradient.length;
        let interpolation = position * gradient.length - left;

        output[i] = lerp(gradient[left], gradient[right], interpolation);
    }

    return output;
}

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}


function dist(x1, y1, x2, y2) {
    let xoff;
    if (x1 > x2) {
        xoff = x1 - x2;
    } else if (x2 > x1) {
        xoff = x2 - x1;
    } else {
        xoff = 0;
    };
    let yoff;
    if (y1 > y2) {
        yoff = y1 - y2;
    } else if (y2 > y1) {
        yoff = y2 - y1;
    } else {
        yoff = 0;
    };
    return Math.floor(Math.sqrt((xoff * xoff) + (yoff * yoff)));
}

function resize(rx, ry, rpercent) {
    return (
        {
            x: rx * rpercent,
            y: ry * rpercent
        }
    )
}

function percentToDecimal(percent) {
    if (typeof percent === 'string') {
        const str = percent.split('').slice(percent.split().length - 1, -1).join('');
        return parseInt(str) / 100;
    } else if (typeof percent === 'number') {
        return percent / 100;
    }
}

function derivative(f, x) {
    const h = 0.0001; // Step size
    const fx = f(x); // Evaluate f(x)
    const fxh = f(x + h); // Evaluate f(x + h)
    return (fxh - fx) / h; // Calculate the derivative using the definition
}

//Value to color conveters
function rgb(r, g, b) {
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
function rgba(r, g, b, a) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")"
}
function grayscale(val) {
    return rgb(val, val, val);
}

function degreesToRadians(degrees) {
    return (degrees * PI / 180);
}

function textWidth(text, fontFamily, fontSize) {
    // Create a canvas element
    const context = canvas.getContext("2d");
    // Set the font styles
    context.font = fontSize + " " + fontFamily;
    // Measure the text
    const metrics = context.measureText(text);
    // Return the width
    return metrics.width;
}


function textHeight(text, fontFamily, fontSize) {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the font styles
    context.font = fontSize + "px " + fontFamily;

    // Measure the text
    const metrics = context.measureText(text);

    // Return the height
    return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
}

function loadFont(path) {
    //Finds the name based on the ttf path
    const name = path
    //Loads the font
    var fontStyle = document.createElement("style");
    fontStyle.innerHTML = `@font-face { font-family: '${name}'; src: url('${path}') format('truetype'); }`;
    document.head.appendChild(fontStyle);
    //Returns the font name
    console.log(`Font loaded: ${name}`);
    return (name);
}


class PhysicsObject {
    constructor(x, y, rate) {
        this.x = x;
        this.y = y;
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        update(() => {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.x += this.acceleration.x;
            this.velocity.y += this.acceleration.y;
        }, rate)
        this.forces = new Array();
        this.unitForce = new Vector(0, 0);
        this.applyForce = function (force) {
            for (i = 0; i < this.forces.length; i++) {
                this.unitForce = this.unitForce.add(this.forces[i]);
            }
            this.acceleration.x = this.unitForce.x;
            this.acceleration.y = this.unitForce.y;
            this.forces.push(new Vector(force.x, force.y));
        }
    }
}

//Gravity Constant
const gravity = new Vector(0, 9.81);

const file = {
    read: function (url) {
        let output = {
            data: '',
            ending: '',
        };
        fetch(url)
            .then(response => response.json())
            .then(data => output.data = data)
            .catch(error => console.error(error));
        output.ending = output.data.split('.').pop();
        return output;
    },
    download: function (fileEnding, fileData, fileName) {
        const blob = new Blob([fileData], { type: endingToFileType(fileEnding) });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName + fileEnding;
        link.href = url;
        link.click();
    }
}

function formatToHTML(jsArr, title = '') {
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title></head><script>${jsArr.join(';')}</script></body></html>`
}

function endingToFileType(ending) {
    if (ending == '.txt') return 'text/plain';
    else if (ending == '.html') return 'text/html';
    else if (ending == '.css') return 'text/css';
    else if (ending == '.js') return 'application/javascript';
    else if (ending == '.json') return 'application/json';
    else if (ending == '.xml') return 'application/xml';
    else if (ending == '.jpeg' || ending == '.jpg') return 'image/jpeg';
    else if (ending == '.png') return 'image/png';
    else if (ending == 'gif') return 'image/gif';
    else if (ending == '.bmp') return 'image/bmp';
    else if (ending == '.tiff') return 'image/tiff';
    else if (ending == '.svg') return 'image/svg+xml';
    else if (ending == '.pdf') return 'application/pdf';
    else throw new Error(`${ending} isn't a valid ending(Don't forget the . before)`);
}

function VectorArray(length) {
    let arr = new Array(length);
    for (i = 0; i < length; i++) {
        arr[i] = new Vector();
    }
    return arr;
}

function Array2D(length, width) {
    let output = new Array(length);
    for (i = 0; i < output.length; i++) {
        output[i] = new Array(width);
    }
    return output
}

class Particles {
    constructor(num, x, y) {
        this.particles = new Array(num);
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i] = {
                x: x,
                y: y,
            }
        }

        this.applyForce = function (func) {
            //Loops through particles and draws them acording to rules
            for (i = 0; i < this.particles.length; i++) {
                this.particles[i].x = func(this.particles[i]);
                this.particles[i].y = func(this.particles[i]);
            }
        }
        this.render = function (func) {
            for (i = 0; i < this.particles.length; i++) {
                func(this.particles[i]);
            }
        }
    }
}

function loadSprite(path) {
    const sprite = new Image();
    sprite.src = path;
    return sprite;
}

class Sprite {
    constructor(x, y, path) {
        this.sprite = loadSprite(path)
        this.length = this.sprite.width;
        this.width = this.sprite.height;
        this.x = x;
        this.y = y;
        this.hitBox = null;
        this.addHitBox = function (type) {
            if (type == 'rect') {
                this.hitBox = new Rect(this.x - this.length / 2, this.y - this.width / 2, this.length, this.width, rgb(255, 0, 255));
            } else if (type == 'ellipse') {
                this.hitBox = new Ellipse(this.x, this.y, this.length, this.width, rgb(255, 0, 255))
            } else if (type == 'triangle') {
                this.hitBox = new Triangle(this.x, this.y, this.length, this.width, rgb(255, 0, 255));
            }
        }
    }
}

//Shape classes with x, y, length, width, color, and rotation(depending on the)
class Rect {
    constructor(x, y, l, w, color) {
        this.x = x;
        this.y = y;
        this.length = l;
        this.width = w;
        this.area = this.length * this.width;
        this.perimeter = this.length * 2 + this.width * 2;
        this.color = color;
        this.touchingRect = function (otherRect) {
            // Check if the x-coordinate of one rectangle is between the x-coordinates of the other rectangle
            let xOverlap = (this.x + this.length / 2 > otherRect.x - otherRect.length / 2) && (this.x - this.length / 2 < otherRect.x + otherRect.length / 2);
            // Check if the y-coordinate of one rectangle is between the y-coordinates of the other rectangle
            let yOverlap = (this.y + this.width / 2 > otherRect.y - otherRect.width / 2) && (this.y - this.width / 2 < otherRect.y + otherRect.width / 2);
            // If both the x and y overlap, then the rectangles are touching
            return xOverlap && yOverlap;
        }
        this.touchingEllipse = function (ellipse) {
            // Calculate equivalent circle for the ellipse
            const ellipseArea = ellipse.length * ellipse.width * Math.PI;
            const radius = Math.sqrt(ellipseArea / Math.PI);

            // Calculate circle's center
            const cx = ellipse.x + ellipse.length / 2;
            const cy = ellipse.y + ellipse.width / 2;

            // Check if circle's center is inside the thisangle
            if (cx + radius >= this.x && cx - radius <= this.x + this.length &&
                cy + radius >= this.y && cy - radius <= this.y + this.width) {
                return true;
            }

            // Check for thisangle corners inside the circle
            const distanceFromCircleCenter = (x, y) => (cx - x) * (cx - x) + (cy - y) * (cy - y);
            if (distanceFromCircleCenter(this.x, this.y) <= radius * radius ||
                distanceFromCircleCenter(this.x + this.length, this.y) <= radius * radius ||
                distanceFromCircleCenter(this.x, this.y + this.width) <= radius * radius ||
                distanceFromCircleCenter(this.x + this.length, this.y + this.width) <= radius * radius) {
                return true;
            }

            // Check for overlapping edges
            const rectCenterX = this.x + this.length / 2;
            const rectCenterY = this.y + this.width / 2;
            if (Math.abs(cx - rectCenterX) <= (this.length + radius) / 2 &&
                Math.abs(cy - rectCenterY) <= (this.width + radius) / 2) {
                return true;
            }

            return false;
        }
        this.touchingTriangle = function (triangle) {
            // calculate the center of the triangle
            let centerX = triangle.x + triangle.length / 2;
            let centerY = triangle.y + triangle.width / 2;

            // find the distance between the center of the triangle and the rectangle
            let distX = Math.abs(centerX - this.x - this.length / 2);
            let distY = Math.abs(centerY - this.y - this.width / 2);

            // if the center of the triangle is inside the thisangle, return true
            if (distX <= this.length / 2 && distY <= this.width / 2) {
                return true;
            }

            // calculate the half width and height of the triangle
            let triangleHalfWidth = triangle.length / 2;
            let triangleHalfHeight = triangle.width / 2;

            // check if any of the corners of the triangle are inside the thisangle
            let corner1X = triangle.x + triangleHalfWidth;
            let corner1Y = triangle.y + triangleHalfHeight;
            let corner2X = triangle.x - triangleHalfWidth;
            let corner2Y = triangle.y - triangleHalfHeight;
            let corner3X = triangle.x - triangleHalfWidth;
            let corner3Y = triangle.y + triangleHalfHeight;
            let corner4X = triangle.x + triangleHalfWidth;
            let corner4Y = triangle.y - triangleHalfHeight;

            let rectLeftX = this.x - this.length / 2;
            let rectRightX = this.x + this.length / 2;
            let rectTopY = this.y + this.width / 2;
            let rectBottomY = this.y - this.width / 2;

            if (corner1X >= rectLeftX && corner1X <= rectRightX && corner1Y >= rectBottomY && corner1Y <= rectTopY) {
                return true;
            }
            if (corner2X >= rectLeftX && corner2X <= rectRightX && corner2Y >= rectBottomY && corner2Y <= rectTopY) {
                return true;
            }
            if (corner3X >= rectLeftX && corner3X <= rectRightX && corner3Y >= rectBottomY && corner3Y <= rectTopY) {
                return true;
            }
            if (corner4X >= rectLeftX && corner4X <= rectRightX && corner4Y >= rectBottomY && corner4Y <= rectTopY) {
                return true;
            }
            return false;
        }
    }
}

class Ellipse {
    constructor(x, y, l, w, r, color) {
        this.x = x;
        this.y = y;
        this.length = l;
        this.width = w;
        this.rotation = r;
        this.color = color;
        this.area = PI * this.length * this.width;
        if (this.length > this.width) {
            this.major = this.length;
            this.minor = this.width;
        } else {
            this.major = this.width;
            this.minor = this.length
        }
        this.circumference = PI * (3 * (this.major / 2 + this.minor / 2) - Math.sqrt((3 * this.major + this.minor) * (this.major + 3 * this.minor)));
        this.touchingEllipse = function (otherEllipse) {
            // Calculate the distance between the centers of the two ellipses
            let distance = dist(this.x, this.y, otherEllipse.x, otherEllipse.y);
            // Calculate the sum of the major axes of the two ellipses
            let sumOfMajorAxes = this.major + otherEllipse.major;
            // If the distance between the centers is less than the sum of the major axes, the ellipses are colliding
            return distance < sumOfMajorAxes;
        }
        this.touchingRect = function (rect) {
            // Calculate equivalent circle for the ellipse
            const ellipseArea = this.length * this.width * Math.PI;
            const radius = Math.sqrt(ellipseArea / Math.PI);

            // Calculate circle's center
            const cx = this.x + this.length / 2;
            const cy = this.y + this.width / 2;

            // Check if circle's center is inside the rectangle
            if (cx + radius >= rect.x && cx - radius <= rect.x + rect.length &&
                cy + radius >= rect.y && cy - radius <= rect.y + rect.width) {
                return true;
            }

            // Check for rectangle corners inside the circle
            const distanceFromCircleCenter = (x, y) => (cx - x) * (cx - x) + (cy - y) * (cy - y);
            if (distanceFromCircleCenter(rect.x, rect.y) <= radius * radius ||
                distanceFromCircleCenter(rect.x + rect.length, rect.y) <= radius * radius ||
                distanceFromCircleCenter(rect.x, rect.y + rect.width) <= radius * radius ||
                distanceFromCircleCenter(rect.x + rect.length, rect.y + rect.width) <= radius * radius) {
                return true;
            }

            // Check for overlapping edges
            const rectCenterX = rect.x + rect.length / 2;
            const rectCenterY = rect.y + rect.width / 2;
            if (Math.abs(cx - rectCenterX) <= (rect.length + radius) / 2 &&
                Math.abs(cy - rectCenterY) <= (rect.width + radius) / 2) {
                return true;
            }

            return false;
        }
        this.touchingTriangle = function (triangle) {
            // First, get the minimum distance between the ellipse and triangle
            const distance = dist(this.x, this.y, triangle.x, triangle.y);

            // Then, check if the distance is less than or equal to the sum of the
            // ellipse's minor axis and the triangle's height
            return distance <= (this.minor + triangle.width);
        }
    }
}

class Triangle {
    constructor(x, y, l, w, color) {
        this.x = x;
        this.y = y;
        this.length = l;
        this.width = w;
        this.color = color;
        this.area = (this.length * this.width) / 2;
        this.unequalSide = this.length;
        this.equalSides = (this.unequalSide + Math.sqrt(this.unequalSide * this.unequalSide - (this.unequalSide * this.unequalSide))) / 2;
        this.perimeter = 2 * this.equalSides + this.unequalSide;
        this.touchingEllipse = function (ellipse) {
            // First, get the minimum distance between the ellipse and triangle
            const distance = dist(ellipse.x, ellipse.y, this.x, this.y);
            // Then, check if the distance is less than or equal to the sum of the
            // ellipse's minor axis and the triangle's height
            return distance <= (ellipse.minor + this.width);
        }
        this.touchingTriangle = function (otherTriangle) {
            let d1 = dist(this.x, this.y, otherTriangle.x, otherTriangle.y);
            let d2 = dist(this.x + this.length, this.y, otherTriangle.x, otherTriangle.y);
            let d3 = dist(this.x, this.y + this.width, otherTriangle.x, otherTriangle.y);
            let d4 = dist(this.x + this.length, this.y + this.width, otherTriangle.x, otherTriangle.y);
            let d5 = dist(otherTriangle.x, otherTriangle.y, this.x, this.y);
            let d6 = dist(otherTriangle.x + otherTriangle.length, otherTriangle.y, this.x, this.y);
            let d7 = dist(otherTriangle.x, otherTriangle.y + otherTriangle.width, this.x, this.y);
            let d8 = dist(otherTriangle.x + otherTriangle.length, otherTriangle.y + otherTriangle.width, this.x, this.y);

            return (d1 <= this.unequalSide + otherTriangle.unequalSide ||
                d2 <= this.unequalSide + otherTriangle.unequalSide ||
                d3 <= this.equalSides + otherTriangle.equalSides ||
                d4 <= this.equalSides + otherTriangle.equalSides ||
                d5 <= this.unequalSide + otherTriangle.unequalSide ||
                d6 <= this.unequalSide + otherTriangle.unequalSide ||
                d7 <= this.equalSides + otherTriangle.equalSides ||
                d8 <= this.equalSides + otherTriangle.equalSides)
        }
        this.touchingRect = function (rect) {
            // calculate the center of the triangle
            let centerX = this.x + this.length / 2;
            let centerY = this.y + this.width / 2;

            // find the distance between the center of the triangle and the rectangle
            let distX = Math.abs(centerX - rect.x - rect.length / 2);
            let distY = Math.abs(centerY - rect.y - rect.width / 2);

            // if the center of the triangle is inside the rectangle, return true
            if (distX <= rect.length / 2 && distY <= rect.width / 2) {
                return true;
            }

            // calculate the half width and height of the triangle
            let triangleHalfWidth = this.length / 2;
            let triangleHalfHeight = this.width / 2;

            // check if any of the corners of the triangle are inside the rectangle
            let corner1X = this.x + triangleHalfWidth;
            let corner1Y = this.y + triangleHalfHeight;
            let corner2X = this.x - triangleHalfWidth;
            let corner2Y = this.y - triangleHalfHeight;
            let corner3X = this.x - triangleHalfWidth;
            let corner3Y = this.y + triangleHalfHeight;
            let corner4X = this.x + triangleHalfWidth;
            let corner4Y = this.y - triangleHalfHeight;

            let rectLeftX = rect.x - rect.length / 2;
            let rectRightX = rect.x + rect.length / 2;
            let rectTopY = rect.y + rect.width / 2;
            let rectBottomY = rect.y - rect.width / 2;

            if (corner1X >= rectLeftX && corner1X <= rectRightX && corner1Y >= rectBottomY && corner1Y <= rectTopY) {
                return true;
            }
            if (corner2X >= rectLeftX && corner2X <= rectRightX && corner2Y >= rectBottomY && corner2Y <= rectTopY) {
                return true;
            }
            if (corner3X >= rectLeftX && corner3X <= rectRightX && corner3Y >= rectBottomY && corner3Y <= rectTopY) {
                return true;
            }
            if (corner4X >= rectLeftX && corner4X <= rectRightX && corner4Y >= rectBottomY && corner4Y <= rectTopY) {
                return true;
            }
            return false;
        }
    }
}

class Line {
    constructor(x1, y1, x2, y2, thick, color) {
        this.point = {
            one: {
                x: x1,
                y: y1,
            },
            two: {
                x: x2,
                y: y2,
            }
        }
        this.thickness = thick;
        this.color = color;
        this.area = dist(this.point.one.x, this.point.one.y, this.point.two.x, this.point.two.y) * this.thickness;
        this.perimeter = (dist(this.point.one.x, this.point.one.y, this.point.two.x, this.point.two.y) * 2) + (this.thickness * 2);
    }
}

class Text {
    constructor(str, x, y, font, size, color) {
        this.str = str;
        this.x = x;
        this.y = y;
        this.font = font;
        this.size = size;
        this.color = color;
    }
}

class Path {
    constructor(points, color) {
        this.points = points;
        this.color = color;
    }
}

class Cube {
    constructor(x, y, l, w, h, thickness, color) {
        this.x = x;
        this.y = y;
        this.length = l;
        this.width = w;
        this.height = h;
        this.thickness = thickness;
        this.color = color;
    }
}

function Color(v1, v2, v3, v4) {
    if (v4 == undefined && v3 == undefined && v2 == undefined) {
        if (typeof v1 == 'string') {
            return v1;
        } else if (typeof v1 == 'number') {
            return grayscale(v1);
        }
    } else if (v4 == undefined) {
        return rgb(v1, v2, v3);
    } else {
        return rgba(v1, v2, v3, v4);
    }

}

function deCasteljau(t, controlPoints) {
    if (controlPoints.length === 1) {
        return controlPoints;
    }
    const left = [];
    const right = [];
    for (let i = 0; i < controlPoints.length - 1; i++) {
        const x =
            (1 - t) * controlPoints[i].x + t * controlPoints[i + 1].x;
        const y =
            (1 - t) * controlPoints[i].y + t * controlPoints[i + 1].y;
        left.push({ x, y });
        right.unshift({ x, y });
    }
    const leftPoints = deCasteljau(t, left);
    const rightPoints = deCasteljau(t, right);
    return leftPoints.concat(rightPoints);
}

function catmullRomSpline(p0, p1, p2, p3, t) {
    const v0 = (p2.x - p0.x) / 2;
    const v1 = (p3.x - p1.x) / 2;
    const a = 2 * p1.x - 2 * p2.x + v0 + v1;
    const b = -3 * p1.x + 3 * p2.x - 2 * v0 - v1;
    const c = v0;
    const d = p1.x;

    const v2 = (p2.y - p0.y) / 2;
    const v3 = (p3.y - p1.y) / 2;
    const e = 2 * p1.y - 2 * p2.y + v2 + v3;
    const f = -3 * p1.y + 3 * p2.y - 2 * v2 - v3;
    const g = v2;
    const h = p1.y;

    const x = a * Math.pow(t, 3) + b * Math.pow(t, 2) + c * t + d;
    const y = e * Math.pow(t, 3) + f * Math.pow(t, 2) + g * t + h;

    return { x, y };
}


let canvas;
let height, width, major, minor;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
class Canvas {
    constructor(l, w, color) {
        height = l;
        width = w;
        this.length = l;
        this.width = w;
        this.color = color;
        //creates canvas
        canvas = document.createElement("canvas");
        if (l === undefined && w === undefined && color === undefined) this.length = 500; this.width = 500; this.color = grayscale(0);
        canvas.width = this.length;
        canvas.height = this.width;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        document.body.appendChild(canvas);

        this.getPixelData = function (arrayType) {
            const ctx = canvas.getContext("2d");
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixelData = imageData.data;
            if (arrayType == '1D') return pixelData;
            else if (arrayType == '2D') {
                // Use the Array2D function to create a 2D array with the same dimensions as the canvas
                const width = this.length;
                const height = this.width;
                const pixels2D = Array2D(width, height);
                // Populate the 2D array with pixel data from the 1D array
                for (let i = 0; i < pixelData.length; i += 4) {
                    const x = Math.floor(i / 4) % width;
                    const y = Math.floor(i / 4 / width);
                    const r = pixelData[i];
                    const g = pixelData[i + 1];
                    const b = pixelData[i + 2];
                    const a = pixelData[i + 3];
                    pixels2D[x][y] = new Color(r, g, b, a);
                    return pixels2D;
                }
            }
        }
        this.drawSprite = function (sprite) {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(sprite.sprite, sprite.x, sprite.y);
        }
        this.drawText = function (text) {
            var ctx = canvas.getContext("2d");
            ctx.font = `${text.size}px '${text.font}'`; //size is taken in pixels
            ctx.fillStyle = text.color
            ctx.fillText(text.str, text.x, text.y);
        }
        this.drawRect = function (rect) {
            //Draws a rectangle
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = rect.color;
            ctx.fillRect(rect.x, rect.y, rect.length, rect.width);
        }
        this.drawEllipse = function (ellipse) {
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.ellipse(ellipse.x, ellipse.y, ellipse.length, ellipse.width, 0, 0, 2 * Math.PI);
            ctx.fillStyle = ellipse.color;
            ctx.fill();
            ctx.stroke();
        }
        this.drawTriangle = function (triangle) {
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(triangle.x, triangle.y);
            ctx.lineTo(triangle.x + triangle.length / 2, triangle.y + triangle.width);
            ctx.lineTo(triangle.x - triangle.length / 2, triangle.y + triangle.width);
            ctx.fillStyle = triangle.color;
            ctx.fill();
        }
        this.drawLine = function (line) {
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(line.point.one.x, line.point.one.y);
            ctx.lineTo(line.point.two.x, line.point.two.y);
            ctx.lineWidth = line.thickness;
            ctx.strokeStyle = line.color;
            ctx.stroke();
        }
        this.drawPolygon = function (path) {
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(path.points[0].x, path.points[0].y);
            for (let i = 1; i < path.points.length; i++) {
                ctx.lineTo(path.points[i].x, path.points[i].y);
            }
            ctx.closePath();
            ctx.fillStyle = path.color;
            ctx.fill();
        }

        this.drawPath = function (path) {
            this.drawLine(path.points[0].x, path.points[0].y, path.points[1].x, path.points[1].y, 1, path.color);
            for (let i = 1; i < path.points.length - 1; i++) {
                this.drawLine(path.points[i].x, path.points[i].y, path.points[i + 1].x, path.points[i + 1].y, 1, path.color);
            }
        }

        this.drawSpline = function (path) {
            //catmull rom spline
            const ctx = canvas.getContext("2d");
            ctx.strokeStyle = path.color;
            ctx.beginPath();
            ctx.moveTo(path.points[0].x, path.points[0].y);

            for (let i = 1; i < path.points.length - 2; i++) {
                const p0 = path.points[i - 1];
                const p1 = path.points[i];
                const p2 = path.points[i + 1];
                const p3 = path.points[i + 2];

                for (let t = 0; t <= 1; t += 0.01) {
                    const { x, y } = catmullRomSpline(p0, p1, p2, p3, t);
                    ctx.lineTo(x, y);
                }
            }

            ctx.lineTo(path.points[path.points.length - 1].x, path.points[path.points.length - 1].y);
            ctx.stroke();
        }

        this.drawCube = function (cube) {
            const points = [
                { x: cube.x, y: cube.y },
                { x: cube.x + cube.length, y: cube.y },
                { x: cube.x + cube.length, y: cube.y + cube.width },
                { x: cube.x, y: cube.y + cube.width }
            ]
            const points2 = [
                { x: cube.x + cube.height, y: cube.y + cube.heighth },
                { x: cube.x + cube.height + cube.length, y: cube.y + cube.height },
                { x: cube.x + cube.height + cube.length, y: cube.y + cube.width + cube.height },
                { x: cube.x + cube.height, y: cube.y + cube.width + cube.height }
            ]
            //Draws front box
            this.drawLine(points[0].x, points[0].y, points[1].x, points[1].y, cube.thickness, cube.color);
            this.drawLine(points[1].x, points[1].y, points[2].x, points[2].y, cube.thickness, cube.color);
            this.drawLine(points[2].x, points[2].y, points[3].x, points[3].y, cube.thickness, cube.color);
            this.drawLine(points[3].x, points[3].y, points[0].x, points[0].y, cube.thickness, cube.color);
            //Draws back box
            this.drawLine(points2[0].x, points2[0].y, points2[1].x, points2[1].y, cube.thickness, cube.color);
            this.drawLine(points2[1].x, points2[1].y, points2[2].x, points2[2].y, cube.thickness, cube.color);
            this.drawLine(points2[2].x, points2[2].y, points2[3].x, points2[3].y, cube.thickness, cube.color);
            this.drawLine(points2[3].x, points2[3].y, points2[0].x, points2[0].y, cube.thickness, cube.color);
            //Draws lines connecting them
            this.drawLine(points[0].x, points[0].y, points2[0].x, points2[0].y, cube.thickness, cube.color);
            this.drawLine(points[1].x, points[1].y, points2[1].x, points2[1].y, cube.thickness, cube.color);
            this.drawLine(points[2].x, points[2].y, points2[2].x, points2[2].y, cube.thickness, cube.color);
            this.drawLine(points[3].x, points[3].y, points2[3].x, points2[3].y, cube.thickness, cube.color);
        }

        this.drawQuadraticBezier = function (path) {
            const ctx = canvas.getContext("2d");
            ctx.strokeStyle = path.color;
            ctx.beginPath();
            ctx.moveTo(path.points[0].x, path.points[0].y);
            ctx.quadraticCurveTo(path.points[1].x, pathpoints[1].y, path.points[2].x, path.points[2].y);
            ctx.stroke();
        }

        this.drawCubicBezier = function (path, points, color) {
            const ctx = canvas.getContext("2d");
            ctx.strokeStyle = path.color;
            ctx.beginPath();
            ctx.moveTo(path.points[0].x, path.points[0].y);
            ctx.bezierCurveTo(path.points[1].x, path.points[1].y, path.points[2].x, path.points[2].y, path.points[3].x, path.points[3].y);
            ctx.stroke();
        }

        this.Button = class {
            constructor(x, y, length, width, str, font, size, textColor, bgColor) {
                this.x = x;
                this.y = y;
                this.length = length;
                this.width = width;
                this.str = str;
                this.font = font;
                this.size = size;
                this.textColor = textColor;
                this.bgColor = bgColor;
                this.rect = new Rect(this.x, this.y, this.length, this.width, grayscale(0));
                this.drawButton = function () {
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = this.bgColor;
                    ctx.fillRect(this.x - this.length / 2, this.y - this.width / 2, this.length, this.width);
                    // Write text on the button
                    ctx.fillStyle = this.textColor;
                    ctx.font = this.size + ' ' + this.font;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(this.str, this.x, this.y);
                }
                this.onClick = function (func) {
                    mouse.onClick((mb) => {
                        const mouseRect = new Rect(mouse.x, mouse.y, 3, 3, grayscale(255));
                        if (mouseRect.touchingRect(this.rect)) {
                            board.drawRect(mouseRect.x, mouseRect.y, mouseRect.length, mouseRect.width, mouseRect.color);
                            func(mb);
                        }
                    })
                }
            }
        }
        this.Slider = class {
            constructor(x, y, length, width, startValue, minValue, maxValue, knobRadias, knobColor, backgroundColor) {
                this.x = x;
                this.y = y;
                this.length = length;
                this.width = width;
                this.value = startValue;
                this.min = minValue;
                this.max = maxValue;
                this.knobColor = knobColor;
                this.knobRadias = knobRadias;
                this.backgroundColor = backgroundColor;
                this.editable = true;
                this.beingHeld;

                this.drawSlider = function () {
                    // Draw the background
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = this.backgroundColor;
                    ctx.fillRect(this.x, this.y, this.length, this.width);
                    // Calculate the position of the knob
                    var knobX = this.x + (this.value - this.min) / (this.max - this.min) * this.length;
                    //Draws elliptical knob
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath();
                    ctx.ellipse(knobX, this.y + this.width / 2, this.knobRadias, this.knobRadias, 0, 0, 2 * Math.PI);
                    ctx.fillStyle = this.knobColor;
                    ctx.fill();
                    ctx.stroke();
                };

                this.onChange = function (func) {
                    update(() => {
                        var knobX = this.x + (this.value - this.min) / (this.max - this.min) * this.length;
                        const knobRect = new Rect(knobX, this.y + this.width / 2, this.knobRadias, this.knobRadias, grayscale(255));
                        const mouseRect = new Rect(mouse.x, mouse.y, 3, 3, grayscale(255));
                        if (this.editable && mouse.isPressed && mouseRect.touchingRect(knobRect)) {
                            this.value = constrain(map(mouse.x, this.x, this.length, this.min, this.max), this.min, this.max)//knobX, mouse.x, this.value
                            func();
                        }
                    })
                }
                update(() => {
                    var knobX = this.x + (this.value - this.min) / (this.max - this.min) * this.length;
                    const knobRect = new Rect(knobX, this.y + this.width / 2, this.knobRadias, this.knobRadias, grayscale(255));
                    const mouseRect = new Rect(mouse.x, mouse.y, 3, 3, grayscale(255));
                    if (this.editable && mouse.isPressed && mouseRect.touchingRect(knobRect)) {
                        this.value = constrain(map(mouse.x, this.x, this.length, this.min, this.max), this.min, this.max)//knobX, mouse.x, this.value
                    }
                }, framesPerSecond);
            }
        }
        this.drawFunction = function (ffunc, flength, fwidth) {
            let data = new Array(flength);
            for (i = 0; i < data.length; i++) {
                const out = ffunc(i);
                if (out <= fwidth) data[i] = out;
                else data[i] = null;
            }
        }
        this.updatePixel = function (x, y, color) {
            this.drawRect(x, y, 1, 1, color)
        }
        this.clear = function (ccolor) {
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = ccolor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        this.resize = function (rw, rl) {
            if (rl === undefined) {
                canvas.length = rw;
                canvas.width = rw;
                width = rw;
                height = rw;
                this.clear();
            } else {
                canvas.length = rl;
                canvas.width = rw;
                width = rl;
                height = rw;
                this.clear();
            }
        }
        this.translate = function (ox, oy) {
            var ctx = canvas.getContext("2d");
            ctx.translate(ox, oy);
        }
        this.rotate = function (radians, rx, ry) {
            var ctx = canvas.getContext('2d');
            ctx.translate(rx, ry);
            ctx.rotate(radians);
        }
        this.Camera = class {
            constructor() {
                this.x = 0;
                this.y = 0;
                this.width = width;
                this.height = height;
                this.update = function () {
                    const ctx = canvas.getContext('2d');
                    // Translate the coordinate system by 100 pixels to the right and 50 pixels down
                    ctx.translate(this.x, this.y);
                    this.x = 0;
                    this.y = 0;
                }
            }
        }
    }
}

class Sound {
    constructor(path, volume = 100) {
        this.sound = document.createElement('audio');
        this.sound.src = path;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);

        this.volume = volume;
        this.sound.volume = this.volume / 100;
        this.play = function () {
            this.sound.volume = this.volume / 100;
            this.sound.play();
        }
        this.stop = function () {
            this.sound.pause();
        }
    }
}

const mouse = {
    x: 0,
    y: 0,
    isPressed: false,
    onClick: function (func) {
        document.addEventListener("click", function (event) {
            func(event.button);
        });
    }
};

document.addEventListener("mousemove", function (event) {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
});

document.addEventListener("mousedown", function (event) {
    mouse.isPressed = true;
});

document.addEventListener("mouseup", function (event) {
    mouse.isPressed = false;
});

const key = {
    onDown: function (button, func) {
        document.addEventListener("keydown", function (event) {
            if (event.key == button || button == 'any') {
                func();
            }
        });
    },
    onUp: function (button, func) {
        document.addEventListener("keyup", function (event) {
            if (event.key == button || button == 'any') {
                func();
            }
        });
    },
    current: null,
    gameDir: null,
    gameAxis: new Vector(),
}

document.addEventListener("keydown", function (event) {
    key.current = event.key;
    if (event.key == 'w') {
        key.gameDir = 0; key.gameAxis.y = -1;
    } else if (event.key == 'd') {
        key.gameDir = 1; key.gameAxis.x = 1;
    } else if (event.key == 's') {
        key.gameDir = 2; key.gameAxis.y = 1;
    } else if (event.key == 'a') {
        key.gameDir = 3; key.gameAxis.x = -1;
    } else {
        key.gameDir = null;
        key.gameAxis.x = null;
        key.gameAxis.y = null;
    }
});
document.addEventListener("keyup", function (event) {
    key.current = null;
    key.gameDir = null;
    key.gameAxis.x = null;
    key.gameAxis.y = null;
});