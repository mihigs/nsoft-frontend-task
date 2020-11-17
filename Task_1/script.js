// Global variables
let matrix = initiateMatrix();
let userInput;

do{ //Input validatition
    userInput = parseInt(prompt('Input a number between 1 and 100: '));
}while(userInput < 1 || userInput > 100 || isNaN(userInput));

let result = getNeighborSum(userInput);

//DOM elements
const resultElement = document.getElementById('result');
const userInputElement = document.getElementById('number');

//DOM manipulation
userInputElement.innerText = `Number: ${userInput}`;
resultElement.innerText = `Result: ${result}`;

// Initializes the matrix
function initiateMatrix(){ 
    let element = 1;
    let matrixSize = 10;

    return new Array(matrixSize) //Populates the matrix
        .fill(0)
        .map(() => (new Array(matrixSize)
        .fill(0)
        .map(() => element++)));
}

// The main function, calculates the sum of selected elements' neigbours
function getNeighborSum(num){
    if(num < 1 || num > 100) return; // Edge case, if the user inputs an invalid number

    let x = parseInt((num-1) / 10); // Calculates "i" index
    let y = (num-1) % 10; // Calculates "j" index
    let result = 0; // Initiates result

    //Defines the boundaries of the new matrix
    let startX = x - 1 >= 0 ? x - 1 : x; //top edge
    let startY = y - 1 >= 0 ? y - 1 : y; //left edge
    let endX = startX + (x + 1 > 9 || x - 1 < 0 ? 1 : 2); //bottom edge
    let endY = startY + (y + 1 > 9 || y - 1 < 0 ? 1 : 2); //right edge

    //Sums up the elements of the new matrix
    for(let i = startX; i <= endX; i++){
        for(let j = startY; j <= endY; j++){
            result += matrix[i][j];
        }
    }

    drawTable(x, y);
    return result;
}

// Creates a table for visual respresentation
function drawTable(x, y){ //Two arguments representing the selected numbers' position
    const table = document.getElementsByTagName('table')[0]; //DOM table

    matrix.forEach((arrX, i) => {
        let tableRow = table.appendChild(document.createElement('tr'));

        arrX.forEach((elem, j) => {
            let currentElement = document.createElement('td');
            currentElement.innerText = elem;

            //Colors the selected element with red, and his neighbors with green
            if(Math.abs(x - i) <= 1 && Math.abs(y - j) <= 1) 
                currentElement.style.backgroundColor = 'lightgreen';
            if(x === i && y === j) 
                currentElement.style.backgroundColor = 'red';

            tableRow.appendChild(currentElement);
        })
    })
}



