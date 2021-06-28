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
		this.setPosition(this.x, this.y);

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
		}
	}
}

class Player extends Character{
	constructor(field){

		super(field, 0, 0, '<=>');

	}
}




field = new Field(8, 8, '#myTable');
player = new Player(field);