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

//The sum function
function getNeighborSum(num){
    if(num < 1 || num > 100) return; // Validation, if the user inputs an invalid number

    //Declare variables
    let x = parseInt((num-1) / 10); // Calculates "i" index
    let y = (num-1) % 10; // Calculates "j" index
    let result = 0; // Initiates result

    //Sum up the elements
    for(let i = x - 1; i <= x + 1; i++){ // From (i - 1) to (i + 1)
        for(let j = y - 1; j <= y + 1; j++){ // From (j - 1) to (j + 1)
            if((i >= 0 && i < 10)&&(j >= 0 && j < 10)) // Excludes elements outside of the matrix
                result += matrix[i][j]; // Adds valid value to the result
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