const carSpeed = [
    ["Lamborghini Aventador SVJ", 350],
    ["McLaren Speedtail", 403],
    ["Rimac C_Two", 412],
    ["Bugatti Chiron", 420],
    ["Koenigsegg Agera RS", 447],
    ["Hennessey Venom F5", 484]
]
const salaryInIT = [
    ["DevOps", 3500],
    ["Data / Big Data Engineer", 3650],
    ["DBA", 3800],
    ["Site Reliability Engineer", 4123],
    ["CEO", 4400],
    ["Delivery Manager", 4500],
    ["Program Manager", 5000],
    ["Director of Engineering", 6500]
]
const priceForTiket = [
    ["Хмельницький", 300],
    ["Тернопіль", 500],
    ["Львів", 650],
    ["Київ", 700]
]

let matrix;
let inputData;
let line_one;
let line_two;
let line_Mx; 

function calculateAll(arr) {
    inputData = []
    for(let i = 0; i < arr.length; i++) {
        inputData.push(arr[i][1])
    }

    matrix = createMatrix(inputData, getStep(inputData));

    line_one = productOfEachColumn(matrix);
    line_two = reciprocalArr(line_one);
    line_Mx = normalizeReciprocalArr(line_two);
}

function makeVisual(...str) {
    for(let i = 0; i < str.length; i++) {
        var tmp = document.getElementById(`${str[i]}`);
        tmp.style.display = 'inline-block';
    }
}
function deleteTable(table) {
    var rowCount = table.rows.length;
  
    for (var i = rowCount - 1; i > 0; i--) {
      table.deleteRow(i);
    }
}
function deleteTable_2(table) {
    var rowCount = table.rows.length;

    for (var i = rowCount - 1; i >= 0; i--) {
      table.deleteRow(i);
    }
}

function chooseVariant() {
    var table = document.getElementById("myTable");
    var select = document.getElementById("mySelect");
    
    makeVisual("firstButton", "variantTable")
    deleteTable(table);

    var thElements = table.getElementsByTagName("th");

    let arr = [];
    if(select.value === 'value1') {
        arr = carSpeed;
        thElements[0].textContent = "Назва машини";
        thElements[1].textContent = "Швидкість в км/год";
    } else if(select.value === 'value2') {
        arr = salaryInIT;
        thElements[0].textContent = "Посада";
        thElements[1].textContent = "Зарплатня в $"
    } else if(select.value === 'value3') {
        arr = priceForTiket;
        thElements[0].textContent = "Місто";
        thElements[1].textContent = "Ціна за 1 білет"
    }

    calculateAll(arr);

    for (let i = 0; i < arr.length; i++) {
        var row1 = table.insertRow();
        var cell1_1 = row1.insertCell(0);
        var cell1_2 = row1.insertCell(1);
        cell1_1.innerHTML = arr[i][0];
        cell1_2.innerHTML = arr[i][1];
    }
}

function createTable() {
    var table = document.getElementById("myMatrix");

    deleteTable_2(table)
    makeVisual("div_for_table", "secondButton")

    for (let i = 0; i < matrix.length; i++) {
        var row = table.insertRow();
        for(let j = matrix.length - 1; j >= 0; j--) {
            var cell = row.insertCell(0);
            cell.innerHTML = matrix[i][j];
        }
    }
}

function createTable_2() {
    var table = document.getElementById("wholeMatrix");

    makeVisual("thirdButton")
    deleteTable_2(table);

    for (let i = 0; i < matrix.length; i++) {
        var row = table.insertRow();
        for(let j = matrix.length - 1; j >= 0; j--) {
            var cell = row.insertCell(0);
            cell.innerHTML = matrix[i][j];
        }
    }

    for (let i = 0; i < 3; i++) {
        var row = table.insertRow();
        for(let j = line_one.length; j >= 0; j--) {
            if(i === 0) {
                if(j === 0) {
                    var cell = row.insertCell(0);
                    cell.innerHTML = "Сума стовпчика";
                    continue;
                }
                var cell = row.insertCell(0);
                cell.innerHTML = line_one[j - 1];
            } else if(i === 1) {
                if(j === 0) {
                    var cell = row.insertCell(0);
                    cell.innerHTML = "Обернена сума";
                    continue;
                }
                var cell = row.insertCell(0);
                cell.innerHTML = line_two[j - 1];
            } else if(i === 2) {
                if(j === 0) {
                    var cell = row.insertCell(0);
                    cell.innerHTML = "M(x)";
                    continue;
                }
                var cell = row.insertCell(0);
                cell.innerHTML = line_Mx[j - 1];
            }

        }
    }

}

function createGraph() {
    var select = document.getElementById("mySelect");
    // var div_ = document.getElementById("graphh");
    // div_.style.display = 'inline-block'

    // var b = document.getElementById("fourthButton");
    // b.style.display = 'block'

    makeVisual("graphh", "fourthButton")

    var canvas = document.getElementById("myCanvas");
    if(canvas) {
      canvas.remove();
    }
    var canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    document.getElementById("graphh").appendChild(canvas);

    var ctx = document.getElementById('myCanvas').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: inputData,
            datasets: [{
                label: 'Функція невизначеності',
                data: line_Mx,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function getStep(arr = []) {
    var step = Math.floor((arr[arr.length - 1] - arr[0]) / 5);
    
    return step;
}

function createMatrix(arr = [], step) {
    var myMatrix = makeDefaultMatrix(arr.length + 1);

    myMatrix = fillLastRow(myMatrix, arr, step);

    myMatrix = fillInputData(myMatrix, arr);

    for(let i = myMatrix.length - 2; i > 1; i--) {
        for(let j = 1; j !== i; j++) {
            myMatrix[i][j] = roundNumber(myMatrix[i + 1][j] / myMatrix[i + 1][i]);
        }
    }
    for(let i = 1; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length + 1; j++) {
            myMatrix[i][j] = roundNumber(1 / myMatrix[j][i]);
        }
    }

    return myMatrix;
}

function makeDefaultMatrix(size) {
    var myMatrix = [];

    for(let i = 0; i < size; i++) {
        let tmpArr = [];
        for(let j = 0; j < size; j++) {
            if(i === j && i !== 0) {
                tmpArr.push(1);
                continue;
            }
            tmpArr.push(0)
        }
        myMatrix.push(tmpArr)
    }

    return myMatrix;
}

function fillLastRow(myMatrix = [], arr = [], step) {
    for(let i = 0; i < arr.length - 1; i++) {
        var diff = Math.abs(arr[arr.length - 1] - arr[i]) / step
        if(diff <= 1) {
            myMatrix[myMatrix.length - 1][i + 1] = 1;
        } else if (diff > 1 && diff <= 2) {
            myMatrix[myMatrix.length - 1][i + 1] = 3;
        } else if (diff > 2 && diff <= 3) {
            myMatrix[myMatrix.length - 1][i + 1] = 5;
        } else if (diff > 3 && diff <= 4) {
            myMatrix[myMatrix.length - 1][i + 1] = 7;
        } else {
            myMatrix[myMatrix.length - 1][i + 1] = 9;
        }
    }

    return myMatrix;
}

function fillInputData(myMatrix = [], arr = []) {
    for(let i = 0; i < arr.length + 1; i++) {
        for(let j = 0; j < arr.length + 1; j++) {
            if(i === 0 && j !== 0) {
                myMatrix[i][j] = arr[j - 1];
                continue;
            }
            if(j === 0 && i !== 0) {
                myMatrix[i][j] = arr[i - 1];
                continue;
            }
        }
    }

    return myMatrix;
}

function productOfEachColumn(myMatrix = []) {
    let myTmpArr = [];
    for (let i = 1; i < myMatrix.length; i++) {
        var sum = 0;
        for (let j = 1; j < myMatrix.length; j++) {
            sum += myMatrix[j][i];
        }
        myTmpArr.push(roundNumber(sum));
    }

    return myTmpArr;
}

function roundNumber(number) {
    return Math.round(parseFloat(number) * 10000) / 10000
}

function reciprocalArr(arr = []) {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        newArr.push(roundNumber(1 / arr[i]))
    }

    return newArr;
}

function findMax(arr = []) {
    var res = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if(res < arr[i]) {
            res = arr[i];
        }
    }

    return res;
}

function normalizeReciprocalArr(arr = []) {
    let newArr = [];
    let maxNumber = findMax(arr);

    for (let i = 0; i < arr.length; i++) {
        newArr.push(roundNumber(arr[i] / maxNumber))
    }

    return newArr;
}



const myButton = document.getElementById('firstButton');

myButton.addEventListener('click', function(e) {
  e.preventDefault(); // запобігає переходу на іншу сторінку
  // додатковий код можна написати тут
});
const myButton_2 = document.getElementById('secondButton');

myButton.addEventListener('click', function(e) {
  e.preventDefault(); // запобігає переходу на іншу сторінку
  // додатковий код можна написати тут
});
const myButton_3 = document.getElementById('thirdButton');

myButton.addEventListener('click', function(e) {
  e.preventDefault(); // запобігає переходу на іншу сторінку
  // додатковий код можна написати тут
});
