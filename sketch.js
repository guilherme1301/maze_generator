// import Cell from './cell'

var cols, rows;
var w = 20;

var current;

var grid = [];

var stack = [];

var pointer;

function setup(){
    createCanvas(400, 400);
    cols = floor(width/w);
    rows = floor(height/w);
    // frameRate(250);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }        
    }
    current = grid[0];
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
        return -1;
    }
    return i + j * cols;
}

function Cell(i, j){
    
    this.i = i;
    this.j = j;

    this.visited = false;
    this.walls = [true, true, true, true];

    this.checkNeighbors = function (){
        var neighbors = [];

        var top = grid[index(i, j-1)]
        var right = grid[index(i + 1, j)]
        var bottom = grid[index(i, j + 1)]
        var left = grid[index(i - 1, j)]

        if(top && !top.visited)
            neighbors.push(top)
        if(right && !right.visited)
            neighbors.push(right)
        if(bottom && !bottom.visited)
            neighbors.push(bottom)
        if(left && !left.visited)
            neighbors.push(left)
            
        if(neighbors.length > 0 ){
            var r = floor(random(0, neighbors.length))
            return neighbors[r];
        }
        else{
            return undefined
        }
    }

    this.show = function() {
        var x = this.i*w;
        var y = this.j*w;

        stroke(255);
        if (this.walls[0]) {
            line(x    , y    , x + w, y);
          }
          if (this.walls[1]) {
            line(x + w, y    , x + w, y + w);
          }
          if (this.walls[2]) {
            line(x + w, y + w, x    , y + w);
          }
          if (this.walls[3]) {
            line(x    , y + w, x    , y);
          }

        if(this.visited){
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }
    }

    this.highlight = function (){
        var x = this.i*w;
        var y = this.j*w;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, w, w);    
    }
    
}

function removeWalls(a, b){
    var x = a.i - b.i;
    var y = a.j - b.j;

    if(x === 1){
        a.walls[3] = false;
        b.walls[1] = false;
    } else if(x === -1){
        a.walls[1] = false;
        b.walls[3] = false;
    }
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
    
}

function draw(){
    background(55);

    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    current.visited = true;
    current.highlight();

    var next = current.checkNeighbors();

    if(next){
        next.visited = true;

        stack.push(current);

        removeWalls(current, next);

        current = next;
    } else if(stack.length > 0){
        current = stack.pop();
    }

    if(stack.length == 0){
        if(keyIsPressed == true && keyCode == UP_ARROW && !current.walls[0]){
            current = grid[(current.i + current.j * cols) - cols];
            console.log(next)
        } else if(keyIsPressed == true && keyCode == DOWN_ARROW && !current.walls[2]){
            current = grid[(current.i + current.j * cols) + cols];
            console.log(next)
        } else if(keyIsPressed == true && keyCode == LEFT_ARROW && !current.walls[3]){
            current = grid[(current.i + current.j * cols) - 1];
            console.log(next)
        } else if(keyIsPressed == true && keyCode == RIGHT_ARROW && !current.walls[1]){
            current = grid[(current.i + current.j * cols) + 1];
            console.log(next)
        }

        var lastPosition = new Cell(cols-1, rows-1);
        lastPosition.highlight('f1f1f1');
        let x = (cols-1)*w;
        let y = (rows-1)*w;
        noStroke();
        fill(0, 255, 0, 100);
        rect(x, y, w, w);
        if(current.i == lastPosition.i && current.j == lastPosition.j){
            confirm("You win bro!!")
        } 
    }

    // keyCode = 0;

}
