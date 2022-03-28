/*     *** Special Thanks to Web Dev Simplified & Doro Onome
for helping me create this calculator. ***

1- Select all numbers, operations, & output: pior & recent operand (the properties),
  by creating const keywords to select them

2- Store the data into the output: for the prior & for the recent operand
 - do this with a class constructor

3- Create all functionalities that the calculator can do:
  allClear(), deleteFunction(), appendNumber(), appendOperation(), compute(), updateDisplay()

4- Think about diff properties our calculator needs to store
  priorOperand, recentOperand, and the operation that they selected or not selected

  -Start with allClear() to set the default setting of calculator

5- Create a calucator() = new Calculator to connect all the const keywords
  - pass in the class constructor properties that we already created above,
    priorOperandDivClass & the recentOperandDivClass

6- To use the calculator, create functions that hook up our const keywords
  numberButtons.forEach(), operationButtons.forEach(), allClearButton(),
  deleteButton(), & equalsButton()

7- To test if the calucator is working, type
numberButtons.forEach()

appendNumber(number) {
this.recentOperand = number
}

updateDisplay() {
this.recentOperandDivClass = this.recentOperand
}

*** You will be able to see the number you clicked in the recent Operand

8- Complete Setting up appendNumber()
 - Convert the numbers ie 0-9 into a string
    So javascript will correctly add 1 + 1 = 2, insead of 1 + 1 = 11

  - convert the number we passed in or selected(typed or clicked on-screen) into a string.
    to limit to 1 decimal

  - To cancel that, create a if statement
    if (this.recentOperand.includes(".") && number === ".") {
      return null
    }

9- operationButtons.forEach()
  -appendOperation()

10- equalsButton()
  -compute() - use switch statement: "like a bunch of if statements"

11- deleteButton()
  - deleteFunction()

12- Change updateDisplay to display priorOperand & operation
  Do this with concactenation

13- Create commmas by creating a helper function called
  getDisplayNumber()

14- To properly display decimals whithout bugs,
  In getDisplayNumber() split the Display number into the
  integerDigits & decimalDigits

15- Complete getDisplayNumber() &
    Complete updateDisplay()

*/

/* Class Constructor */

class Calculator {
  constructor(priorOperandDivClass, recentOperandDivClass) {
    this.priorOperandDivClass = priorOperandDivClass
    this.recentOperandDivClass = recentOperandDivClass
    this.allClear()
  }

  /* Calculator Functions */

  allClear() {
    this.recentOperand = "0"
    this.priorOperand = ""
    this.operation = undefined
  }

  deleteFunction() {
    if (this.recentOperand = this.recentOperand.toString().slice(0, -1)) {
      return null
    }
    this.recentOperand = "0"
  }

  appendNumber(number) {

    if (this.recentOperand.includes(".") && number === ".") {
      return null
    }
    this.recentOperand = this.recentOperand.toString() + number.toString()
  }

  appendOperation(operation) {
    if (this.recentOperand === "") {
      return null
    }
    if (this.priorOperand !== "") {
      this.compute()
    }
    this.operation = operation
    this.priorOperand = this.recentOperand
    this.recentOperand = ""
  }

  compute() {
    let computation
    const prior = parseFloat(this.priorOperand)
    const recent = parseFloat(this.recentOperand)
    if (isNaN(prior) || isNaN(recent)) {
      return null
    }
    switch (this.operation) {
      case "+":
        computation = prior + recent
        break
      case "-":
        computation = prior - recent
        break
      case "*":
        computation = prior * recent
        break
      case "/":
        computation = prior / recent
        break
      default:
        return
    }
    this.recentOperand = computation
    this.operation = undefined
    this.priorOperand = ""
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.recentOperandDivClass.innerText =
      this.getDisplayNumber(this.recentOperand)
    if (this.operation != null) {
      this.priorOperandDivClass.innerText =
        `${this.getDisplayNumber(this.priorOperand)} ${this.operation}`

    } else {
      this.priorOperandDivClass.innerText = ""
    }
  }
}

/* Calculator Const Variables */

const numberButtons = document.querySelectorAll(".number")
const operationButtons = document.querySelectorAll(".operation")
const equalsButton = document.querySelector(".equals-button-js")
const allClearButton = document.querySelector(".ac-button-js")
const deleteButton = document.querySelector(".delete-button")
const priorOperandDivClass = document.querySelector(".prior-operand")
const recentOperandDivClass = document.querySelector(".recent-operand")

/* Calculator Object - created from Class Constructor */

const calculator = new Calculator(priorOperandDivClass, recentOperandDivClass)

/* Functions that Selects our Const Variables */

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendOperation(button.innerText)
    calculator.updateDisplay()
  })
})

allClearButton.addEventListener("click", button => {
  calculator.allClear(button.innerText)
  calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
  calculator.deleteFunction(button.innerText)
  calculator.updateDisplay()
})

equalsButton.addEventListener("click", button => {
  calculator.compute(button.innerText)
  calculator.updateDisplay()
})


/* keyboard */

document.addEventListener("keydown", function(event) {
  let numberSelection = /[0-9]/g;
  let operationSelection = /[+\-*\/]/g
  if (event.key.match(numberSelection)) {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key === ".") {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key.match(operationSelection)) {
    event.preventDefault();
    calculator.appendOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculator.compute()
    calculator.updateDisplay()
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.deleteFunction()
    calculator.updateDisplay()
  }
  if (event.key == "Delete") {
    event.preventDefault();
    calculator.allClear()
    calculator.updateDisplay()
  }

});
