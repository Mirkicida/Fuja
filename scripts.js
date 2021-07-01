var field, player

class Field{
        constructor (cols, rows, containerId){
    
            this.cols = cols;
            this.rows = rows;
            this.container = document.querySelector(containerId);
            this.createField();
    
        }
       
    createField(){
        var field = [];

        for(var i = 0; i < this.rows; i++){
            
            field[i] = [];

            for(var j = 0; j < this.cols; j++){
                field[i] .push(this.createRock());
            }
        }

        this.field = field;
        this.drawField();
    }

        createRock(){
            return Math.trunc(Math.random()*5) === 1 ? 'X' : '';
        }

    drawField(){
        var template = '';

        for(var i = 0; i < this.rows; i++){

            template += '<tr>';

            for(var j = 0; j < this.cols; j++){

                template +=`<td>${this.field[i][j]}</td>`;

            }

            template += '</tr>';


        }
        this.container.innerHTML = template;
    }

}

class Character{
	constructor(field, x, y, skin){

        this.table = field;
		this.skin = skin;
		this.x = x;
		this.y = y;
		if(!this.setPosition(this.x, this.y)){
			throw Error();
		}

	}

	up(){
		if(this.y > 0){

			this.setPosition(this.x, this.y - 1);

		}
	}

	down(){
		if(this.y+1 < this.table.rows){

			this.setPosition(this.x, this.y + 1);

		}
	}

	left(){
		if(this.x > 0){

			this.setPosition(this.x - 1, this.y);

		}
	}

	right(){
		if(this.x+1 < this.table.cols){

			this.setPosition(this.x + 1, this.y);

		}
	}

	setPosition(x, y){
		if(this.table.field[y][x] === ''){

			this.table.field[this.y][this.x] = '';
			this.x = x;
			this.y = y;
			this.table.field[this.y][this.x] = this.skin;

			this.table.drawField();
			return true;
		}
		return false;
	}
}

class Player extends Character{
	constructor(field){

		super(field, 0, 0, 'o-o');

	}
}

class Npc extends Character{
	constructor(field){

		var x = Math.trunc(Math.random()*field.cols),
			y = Math.trunc(Math.random()*field.rows);

		super(field, x, y, '*-*');
		setInterval(this.walk.bind(this), 500);
	}

	walk(){
		var direction = Math.trunc(Math.random() * 4 ) + 1;

		switch(direction){
			case 1: this.up(); break;
			case 2: this.down();break;
			case 3: this.right(); break;
			case 4: this.left(); break;
		}
	}


}



function startField(){

	var cols = document.querySelector('#cols').value || 5,
		rows = document.querySelector('#rows').value || 5;

	document.querySelector('button').disabled = true;

	field = new Field(cols, rows, '#myTable');
	try{
		player = new Player(field);
		npc = new Npc(field);
	}catch(e){
		console.log(`Montando mapa novamente . . .`);
		startField();
	}
	
}

window.addEventListener('keyup', function(event){

	if(Player){
		const A = 65,
			S = 83,
			D = 68,
			W = 87;

		switch(event.keyCode){

			case A: player.left(); break;

			case S: player.down(); break;

			case D: player.right(); break;

			case W: player.up(); break;
		}


	}


})