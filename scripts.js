var field;

function Field(cols, rows, containerId){

    this.cols = cols;
    this.rows = rows;
    this.container = document.querySelector(containerId);

    this.createField = function(){
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

        this.createRock = function(){
            return Math.trunc(Math.random()*5) === 1 ? 'X' : '';
        }

    this.drawField = function(){
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



field = new Field(3, 4, '#myTable');
field.createField();
