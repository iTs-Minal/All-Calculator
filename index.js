// VARIABLE ARE DECLARED

const stat = document.getElementById("stat");
const reset = document.getElementById("reset");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const zero = document.getElementById("zero");
const add = document.getElementById("add");
const sub = document.getElementById("sub");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const decimal = document.getElementById("decimal");
const equal = document.getElementById("equal");
const calculate = document.querySelector(".calculate");
const output = document.querySelector(".output");

// VALUE GETTING RESET AFTER CLICKING ON AC
const resetVal = () => {
  calculate.innerText = "";
  output.innerText = "";
};
reset.addEventListener("click", resetVal);

// ASSIGNING THE VALUE WHENEVER IT IS  CLICKED

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = ["*", "+", "-", "/"];

one.addEventListener("click", () => {
  calculate.innerText += numbers[1];
});
two.addEventListener("click", () => {
  calculate.innerText += numbers[2];
});
three.addEventListener("click", () => {
  calculate.innerText += numbers[3];
});
four.addEventListener("click", () => {
  calculate.innerText += numbers[4];
});
five.addEventListener("click", () => {
  calculate.innerText += numbers[5];
});
six.addEventListener("click", () => {
  calculate.innerText += numbers[6];
});
seven.addEventListener("click", () => {
  calculate.innerText += numbers[7];
});
eight.addEventListener("click", () => {
  calculate.innerText += numbers[8];
});
nine.addEventListener("click", () => {
  calculate.innerText += numbers[9];
});
zero.addEventListener("click", () => {
  calculate.innerText += numbers[0];
});
decimal.addEventListener("click", () => {
  handleDecimal;
});

//THE OPERATOR PART(refrence is commented out but may be important)

let lastValue = null;

function isLastCharacterOperator() {
  return operators.includes(calculate.innerText.trim().slice(-1));
}

add.addEventListener("click", () => {
  //   if (lastValue !== operators[1]&&!calculate.innerText.trim().endsWith(operators[1])) {
  //     calculate.innerText += operators[1];
  //     lastValue = null;
  //   }

  if (!isLastCharacterOperator()) {
    calculate.innerText += operators[1];
    lastValue = operators[1];
  }

  if (isLastCharacterOperator()) {
    // Replace the last operator with the new one
    calculate.innerText =
      calculate.innerText.trim().slice(0, -1) + operators[1];
  } else {
    // Append the new operator
    calculate.innerText += operators[1];
  }
  lastValue = operators[1];
});

sub.addEventListener("click", () => {
  // if (lastValue !== operators[2]&&!calculate.innerText.trim().endsWith(operators[2])) {
  //     calculate.innerText += operators[2];
  //     lastValue = null;
  //   }

  if (!isLastCharacterOperator()) {
    calculate.innerText += operators[2];
    lastValue = operators[2];
  }

  if (isLastCharacterOperator()) {
    // Replace the last operator with the new one
    calculate.innerText =
      calculate.innerText.trim().slice(0, -1) + operators[2];
  } else {
    // Append the new operator
    calculate.innerText += operators[2];
  }
  lastValue = operators[2];
});

multiply.addEventListener("click", () => {
  // if (lastValue !== operators[0]&&!calculate.innerText.trim().endsWith(operators[0])) {
  //     calculate.innerText += operators[0];
  //     lastValue = null;
  //   }

  if (!isLastCharacterOperator()) {
    calculate.innerText += operators[0];
    lastValue = operators[0];
  }

  if (isLastCharacterOperator()) {
    // Replace the last operator with the new one
    calculate.innerText =
      calculate.innerText.trim().slice(0, -1) + operators[0];
  } else {
    // Append the new operator
    calculate.innerText += operators[0];
  }
  lastValue = operators[0];
});
divide.addEventListener("click", () => {
  // if (lastValue !== operators[3]&&!calculate.innerText.trim().endsWith(operators[3])) {
  //     calculate.innerText += operators[3];
  //     lastValue = null;
  //   }
  if (!isLastCharacterOperator()) {
    calculate.innerText += operators[3];
    lastValue = operators[3];
  }

  if (isLastCharacterOperator()) {
    // Replace the last operator with the new one
    calculate.innerText =
      calculate.innerText.trim().slice(0, -1) + operators[3];
  } else {
    // Append the new operator
    calculate.innerText += operators[3];
  }
  lastValue = operators[3];
});

//NOW WORKING WITH IS EQUAL TO BUTTON

const equalTo = () => {
  const lastOperator = operators.includes(calculate.innerText.trim().slice(-1));
  if (lastOperator) {
    calculate.innerText = "";
    output.innerText = "";
  }

  try {
    const result = eval(calculate.innerText.trim());
    if (result === Infinity || result === -Infinity || isNaN(result)) {
      output.innerText = "";
      calculate.innerText = "";
    } else {
      output.innerText = result;
    }
  } catch (error) {
    alert("INVALID OPERATION");
    calculate.innerText = "";
    output.innerText = "";
  }
};

equal.addEventListener("click", equalTo);

// NOW WORKING WITH THE PART WHERE WE CAN CALCULATE STATISTICS;

let statMode = false;
let calculationLock=false;

//for mean and divide button
const handleDivide = () => {
  if(calculationLock)return;
  if (!calculate.innerText.trim().endsWith("/")) {
    calculate.innerText += "/";
    lastValue = "/";
  }
};

const handleMean = () => {
    const input = calculate.textContent.trim(); // Get input from the display div
    const numbers = input.split(",").map((num) => parseFloat(num)); // Split and parse as numbers

    if (numbers.some(isNaN) || numbers.length === 0) {
      // Validate input: ensure all values are numbers
      output.textContent = "";
      return;
    }

    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    output.textContent = `Mean: ${mean}`;
    calculate.textContent=calculate.textContent.replace("/","");
    calculationLock=true;
};

// const performDivision = () => {
 
// }

//handleing AC
const handleAc=()=>{
  calculate.innerText="";
  output.innerText="";
  calculationLock=false;
}

//handeling decimal button
const handleComma = () => {
  if(calculationLock)return;
  if (!calculate.innerText.trim().endsWith(",")) {
    calculate.innerText += ",";
    lastValue = ",";
  }
};
const handleDecimal = () => {
  if (!calculate.innerText.trim().endsWith(".")) {
    calculate.innerText += ".";
    lastValue = ".";
  }
};

//switching the calculator between stat mode and basic mode
const switchStatMode = () => {
  calculate.innerText = "";
  output.innerText = "";
  stat.textContent = "Basic";
  statMode = true;
  calculationLock=false;

  divide.textContent = "Mean";
  divide.addEventListener("click", handleMean);

  //working with decimal button
  decimal.textContent = ",";
  decimal.removeEventListener("click", handleDecimal);
  decimal.addEventListener("click", handleComma);

  //working with AC button
reset.addEventListener("click",handleAc)

  //working with equal buttton
  equal.disabled=true;
};
const switchBasicMode = () => {
  calculate.innerText = "";
  output.innerText = "";
  stat.textContent = "Stat";
  statMode = false;
  calculationLock=true;

  divide.textContent = "/";
  divide.removeEventListener("click",handleMean)
  divide.addEventListener("click",handleDivide)

  //working with decimal button
  decimal.textContent = ".";
  decimal.removeEventListener("click", handleComma);
  decimal.addEventListener("click", handleDecimal);

    //working with equal buttton
    equal.disabled=false;
};

stat.addEventListener("click", () => {
  if (!statMode) {
    switchStatMode();
  } else {
    switchBasicMode();
  }
});
switchBasicMode();
