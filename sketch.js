var mode;
var pattern = [];
var opc = 30;
var turn = 1;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	for (i = 0; i < 30; i ++){
    pattern [i] = new Pattern();//Creating new objects
  }
}

function draw() {
	mode = int(random(0, 4)); //Shifting mode
	fill(255, 255, 255, opc); //Setting the opacity
	rect(0, 0, windowWidth, windowHeight);// Refresh the background
	if (turn == 1){
  	for (i = 0; i < 30; i ++){
			pattern[i].bounce();
			pattern[i].track();
   	 	pattern[i].brush(mode);
		} 
		}else {
			for (i = 0; i < 30; i ++){
				pattern[i].fall();
				pattern[i].bounce();
   			pattern[i].brush(mode);
			}
		}
}

function mousePressed() {
	if (turn >= 1){
		turn = 0;
	} else {
		turn = 1;
	}
}

class Pattern{ 
	constructor(){
		this.p = createVector(random(width), random(height)); 
		this.v = createVector();
		this.a = createVector(); 
	}

	brush(mode){
		//first brush: draw triangle
		if (mode == 0) {
  		fill(240, 120, 20);
  		noStroke();
			triangle (this.p.x, this.p.y - 10, this.p.x - 7, this.p.y + 4, this.p.x + 7, this.p.y + 4);
		} 
		//second brush: draw circle
		else if (mode == 1) {
			fill(250, 180, 20);
  		noStroke();
			ellipse(this.p.x, this.p.y, 16, 16);
		} 
		//third brush: draw cross
		else if (mode == 2) {
			fill(230, 120, 50);
			noStroke();
			quad(this.p.x - 10, this.p.y - 5, this.p.x - 5, this.p.y - 10, this.p.x + 10, this.p.y + 5, this.p.x + 5, this.p.y + 10);
			quad(this.p.x + 10, this.p.y - 5, this.p.x + 5, this.p.y - 10, this.p.x - 10, this.p.y + 5, this.p.x - 5, this.p.y + 10);
		} 
		//fourth brush: draw square
		else if (mode == 3) {
			fill(213, 102, 30);
			noStroke();
			rect(this.p.x - 8, this.p.y - 8, 16, 16);
		}
	}
	/* //Brush test
	brush2(){
	  fill(255);
  	noStroke();
		ellipse(this.p.x, this.p.y, 14, 14);
	}
	
	brush3(){
		this.r = random(230, 255);
		this.g = random(120, 180);
		this.g = random(20, 60);
		fill(this.r, this.g, this.b, this.c)
		noStroke();
		quad(this.p.x - 10, this.p.y - 5, this.p.x - 5, this.p.y - 10, this.p.x + 10, this.p.y + 5, this.p.x + 5, this.p.y + 10);
		quad(this.p.x + 10, this.p.y - 5, this.p.x + 5, this.p.y - 10, this.p.x - 10, this.p.y + 5, this.p.x - 5, this.p.y + 10);
	}
	*/
	
	track(){
		//The center of the motion changes to the mouse
		this.a = createVector(mouseX-this.p.x, mouseY -this.p.y); //Circles chase the mouse
		this.a.limit(0.5);
		this.v.add(this.a);//The acceleration is added on velocity
		this.v.limit(20) 
		this.p.add(this.v)//The velocity change the displacement
		//All particles stay within the window
		if (this.p.x >= windowWidth || this.p.x <= 0){
			this.v.x *= 0.8;
		}
		if (this.p.y >= windowHeight || this.p.y <= 0){
			this.v.y *= 0.8;
		}
	}
	
	fall(){
		//Circles fall away
		this.a = createVector(0, 0.1); //Apply the gravity
		this.v.add(this.a)
		this.p.add(this.v)
				if (this.p.x >= windowWidth || this.p.x <= 0){
			this.v.x *= 0.8;
		}
		if (this.p.y >= windowHeight || this.p.y <= 0){
			this.v.y *= 0.8;
		}
	}
	//bounce test
	bounce(){
		if (this.p.x >= windowWidth || this.p.x <= 0){
			this.v.x *= 0.8;
		}
		if (this.p.y >= windowHeight || this.p.y <= 0){
			this.v.y *= 0.8;
		}
	}
	


}