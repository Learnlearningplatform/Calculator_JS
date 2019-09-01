//global variables
let display = document.querySelector('#display');
let storedOperator = '';
let storedNumber = '';
let storedNumber2 = '';
let answer = '';

//takes two numbers and an operator. performs the math on the two numbers and displays answer
function operate(operator, num1, num2) {
	num1 = parseFloat(num1);
	num2 = parseFloat(num2);
	if (typeof operator === 'string') {
		switch (operator) {
			case 'add':
			return num1 + num2;
			case 'subtract':
			return num1 - num2;
			case 'multiply':
			return num1 * num2;
			case 'divide':
			if (num2 === 0) {
				return 'infinity: you divided by zero'
			} else {
				return num1 / num2;
			}
		}
	}
}

function displayScreen(string) {
	display.innerHTML = string;
}

//stores and displays number
let btns = document.querySelectorAll('.nums');
btns.forEach(button => button.addEventListener('click', (e) => {
	displayScreen('');
	if (storedOperator == '' && answer == '') {
		storedNumber += e.target.innerText;
		displayScreen(storedNumber);
	} else if (storedOperator != '' && answer == '') {
		storedNumber2 += e.target.innerText;
		displayScreen(storedNumber2);
	}
}));


//stores and displays operator
let opBtns = document.querySelectorAll('.ops');
opBtns.forEach(button => button.addEventListener('click', opBtnClickHandler);

//this factory acts like a traffic director. taking in info and sending out the corresponding function
function calculatorClickHandlerFactory (operationFunction) {
	return (e) => {
		const {
			displayUpdateResult,
			storedNumberResult,
			storedNumber2Result,
			storedOperatorResult,
		} = operationFunction(e, {
			storedNumber,
			storedNumber2,
		});

		if (displayUpdateResult) {
			displayScreen(displayUpdateResult);
		}

		if (storedNumberResult) {
			storedNumber = storedNumberResult;
		}

		if (storedNumber2Result) {
			storedNumber2 = storedNumber2Result;
		}

		if (storedOperatorResult) {
			storedOperator = storedOperatorResult;
		}
	}
}

const opBtnClickHandler = calculatorClickHandlerFactory(
	(e, { storedNumber, storedNumber2 }) => {
		if (storedNumber !== '' && storedNumber2 !== '') {
			const storedNumberResult = operate(storedOperator, storedNumber, storedNumber2);

			return {
				storedNumberResult,
				storedOperatorResult: e.target.id,
				displayScreenResult: storedNumber,
			};
		}

		return {
			storedOperatorResult: e.target.id,
		};
	}
);




//clear display
let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', (e) => {
	displayScreen('');
	storedNumber = '';
	storedNumber2 = '';
	storedOperator = '';
});

//makes number negative or positive
let negPosBtn = document.getElementById('negative');
negPosBtn.addEventListener('click', () => {
	if (display.innerHTML == storedNumber) {
		storedNumber *= -1;
		displayScreen(storedNumber);
	} else if (display.innerHTML == storedNumber2) {
		storedNumber2 *= -1;
		displayScreen(storedNumber2);
	}
});

//makes number a percentage
let percentBtn = document.getElementById('percent');
percentBtn.addEventListener('click', () => {
	if (display.innerHTML == storedNumber) {
		storedNumber /= 100;
		displayScreen(storedNumber);
	} else if (display.innerHTML == storedNumber2) {
		storedNumber2 /= 100;
		displayScreen(storedNumber2);
	}
});

//adds dot to number
let dotBtn = document.querySelector('#point');
dotBtn.addEventListener('click', () => {
	if (display.innerHTML == storedNumber) {
		storedNumber = storedNumber + '.';
		displayScreen(storedNumber);
	} else if (display.innerHTML == storedNumber2) {
		storedNumber2 = storedNumber2 + '.';
		displayScreen(storedNumber2);
	}
});

let equalsBtn = document.getElementById('equal');
equalsBtn.addEventListener('click', (e) => {
	if (storedNumber2 == '' || storedOperator == '') {
		return;
	}
	storedNumber = operate(storedOperator, storedNumber, storedNumber2);
	storedOperator = '';
	storedNumber2 = '';
	displayScreen(storedNumber);
});
