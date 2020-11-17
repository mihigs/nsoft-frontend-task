let matrix; //The main matrix

// DOM and user input variables
let userInput = parseInt(prompt('Input a number between 1 and 100: '));
let result = document.getElementById('result');
let number = document.getElementById('number');
number.innerText += userInput;
result.innerText += getNeighborSum(userInput);

// Initializes the matrix
function populateMatrix(){ 
    let element = 1;
    let matrixSize = 10;
    //Populates the matrix
    matrix = new Array(matrixSize)
        .fill(0)
        .map(elem => (new Array(matrixSize)
        .fill(0)
        .map(elem => element++)));
}

// The main function, calculates the sum of selected elements' neigbours
function getNeighborSum(num){
    if(num < 1 || num > 100) return -1; // Edge case, if the user inputs an invalid number

    let x = parseInt((num-1) / 10); // Calculates "i" index
    let y = (num-1) % 10; // Calculates "j" index
    let result = 0; // Initiates result

    let startX = x - 1 >= 0 ? x - 1 : x;
    let startY = y - 1 >= 0 ? y - 1 : y;
    let endX = startX + (x + 1 > 9 || x - 1 < 0 ? 1 : 2);
    let endY = startY + (y + 1 > 9 || y - 1 < 0 ? 1 : 2);


    for(let i = startX; i <= endX; i++){
        for(let j = startY; j <= endY; j++){
            result += matrix[i][j];
        }
    }

    drawTable(x, y);
    return result;
}

// Creates a table for visual respresentation
function drawTable(x, y){
    const table = document.getElementsByTagName('table')[0];

    matrix.forEach((arrX) => {
        let tableRow = table.appendChild(document.createElement('tr'));
        arrX.forEach((elem) => {
            let tempValue = document.createElement('td');
            tempValue.innerText = elem;
            tableRow.appendChild(tempValue);
        })
    })
}



