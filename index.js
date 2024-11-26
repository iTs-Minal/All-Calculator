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
  if (!isLastCharacterOperator()) {
    calculate.innerText += operators[2];
    lastValue = operators[2];
  }

  if (isLastCharacterOperator()) {
    calculate.innerText =
      calculate.innerText.trim().slice(0, -1) + operators[2];
  } else {
    calculate.innerText += operators[2];
  }
  lastValue = operators[2];
});

multiply.addEventListener("click", () => {
  if (!isLastCharacterOperator()) {
    calculate.innerText += operators[0];
    lastValue = operators[0];
  }

  if (isLastCharacterOperator()) {
    calculate.innerText =
      calculate.innerText.trim().slice(0, -1) + operators[0];
  } else {
    calculate.innerText += operators[0];
  }
  lastValue = operators[0];
});
divide.addEventListener("click", () => {
  if (!isLastCharacterOperator()) {
    calculate.innerText += operators[3];
    lastValue = operators[3];
  }

  if (isLastCharacterOperator()) {
    calculate.innerText =
      calculate.innerText.trim().slice(0, -1) + operators[3];
  } else {
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
let calculationLock = false;

//for mean and divide button
const handleDivide = () => {
  if (calculationLock) return;
  if (!calculate.innerText.trim().endsWith("/")) {
    calculate.innerText += "/";
    lastValue = "/";
  }
};

const handleMean = () => {
  // if (calculate.textContent.trim() === ""||calculate.textContent.includes("/")) {
  // calculate.textContent=calculate.textContent.replace("/","")
  //   return;
  // }

  let inputM = calculate.textContent.trim(); // Get input from the display div
  let numbersM = inputM.split(",").map((num) => parseFloat(num)); // Split and parse as numbers

  if (numbersM.some(isNaN) || numbersM.length === 0) {
    output.textContent = "";
    return;
  }

  let mean = numbersM.reduce((sum, num) => sum + num, 0) / numbersM.length;
  output.textContent = `Mean: ${mean.toFixed(2)}`;
  calculate.textContent = calculate.textContent.replace("/", "");
  calculationLock = true;
  console.log(numbersM)
  console.log(mean);
};

//handeling multiply and median button
const handleMultiply = () => {
  if (calculationLock) return;
  if (!calculate.innerText.trim().endsWith("*")) {
    calculate.innerText += "*";
    lastValue = "*";
  }
};

const handleMedian = () => {
  let inputMe = calculate.textContent.trim();
  let numbersMe = inputMe.split(",").map((num) => parseFloat(num));

  if (numbersMe.some(isNaN) || numbersMe.length === 0) {
    output.textContent = "";
    return;
  }

  const sorted = numbersMe.toSorted((a, b) => a - b);

  let median;
  if (sorted.length % 2 === 0) {
    const mid1 = sorted[sorted.length / 2];
    const mid2 = sorted[sorted.length / 2 - 1];
    median = (mid1 + mid2) / 2;
  } else {
    median = sorted[Math.floor(sorted.length / 2)];
  }
  output.textContent = `Median: ${median}`;
  calculate.textContent = calculate.textContent.replace("*", "");
  calculationLock = true;
};

//handeling substraction and Mode button
const handleSub = () => {
  if (calculationLock) return;
  if (!calculate.innerText.trim().endsWith("-")) {
    calculate.innerText += "-";
    lastValue = "-";
  }
};
const handleMode = () => {
  let inputMo = calculate.textContent.trim();
  let numbersMo = inputMo.split(",").map((num) => parseFloat(num));

  if (numbersMo.some(isNaN) || numbersMo.length === 0) {
    output.textContent = "";
    return;
  }
  const counts = {};
  numbersMo.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  });

  // Check if there is no mode (all frequencies are equal)
  const frequencies = Object.values(counts);
  const uniqueFrequencies = new Set(frequencies);
  if (uniqueFrequencies.size === 1) {
    output.textContent = "NO MODE";
  } else {
    const maxCount = Math.max(...frequencies);
    const mode = Object.keys(counts)
      .filter((el) => counts[el] === maxCount)
      .map(Number);

    output.textContent = `Mode: ${mode.join(", ")}`;
  }

  if (calculate.textContent.includes("-")) {
    calculate.textContent = calculate.textContent.replace("-", "");
  }
  calculationLock = true;
};

//handeling addition and variance button
const handleAdd = () => {
  if (calculationLock) return;
  if (!calculate.innerText.trim().endsWith("+")) {
    calculate.innerText += "+";
    lastValue = "+";
  }
};
const handleVar = () => {
  let inputV = calculate.textContent.trim();
  let numbersV = inputV.split(",").map((num) => parseFloat(num));

  if (numbersV.some(isNaN) || numbersV.length === 0) {
    output.textContent = "";
    return;
  }

  let mean = numbersV.reduce((sum, num) => sum + num, 0) / numbersV.length;

  let variance =
    numbersV.reduce((acc, el) => {
      const difference = el - mean;
      const squared = difference ** 2;
      return acc + squared;
    }, 0) / numbersV.length;

  output.textContent = `Variance: ${variance.toFixed(2)}`;
  calculate.textContent = calculate.textContent.replace("+", "");
  calculationLock = true;
};

//handeling equal and standard deviation button
const handleSd = () => {
  let inputSd = calculate.textContent.trim();
  let numbersSd = inputSd.split(",").map((num) => parseFloat(num));

  if (numbersSd.some(isNaN) || numbersSd.length === 0) {
    output.textContent = "";
    return;
  }

  let mean = numbersSd.reduce((sum, num) => sum + num, 0) / numbersSd.length;

  let varSd =
    numbersSd.reduce((acc, el) => {
      const difference = el - mean;
      const squared = difference ** 2;
      return acc + squared;
    }, 0) / numbersSd.length;

    const sd = Math.sqrt(varSd);

    output.textContent = `S.D: ${sd.toFixed(3)}`;
    calculate.textContent = calculate.textContent.replace("=", "");
    calculationLock = true;
};

//handleing AC button
const handleAc = () => {
  calculate.innerText = "";
  output.innerText = "";
  calculationLock = false;
};

//handeling decimal button
const handleComma = () => {
  if (calculationLock) return;
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

//SWITCHING: the calculator between stat mode and basic mode
const switchStatMode = () => {
  calculate.innerText = "";
  output.innerText = "";
  stat.textContent = "Basic";
  statMode = true;
  calculationLock = false;

  //working with divide button
  divide.textContent = "Mean";
  divide.addEventListener("click", handleMean);

  //working with multiply button
  multiply.textContent = "Median";
  multiply.addEventListener("click", handleMedian);

  //working with substraction button
  sub.textContent = "Mode";
  sub.addEventListener("click", handleMode);

  //working with addition button
  add.textContent = "VAR";
  add.addEventListener("click", handleVar);

  //working with decimal button
  decimal.textContent = ",";
  decimal.removeEventListener("click", handleDecimal);
  decimal.addEventListener("click", handleComma);

  //working with equal buttton
  equal.textContent = "S.D";
  equal.removeEventListener("click", equalTo)
  equal.addEventListener("click", handleSd);

  //working with AC button
  reset.addEventListener("click", handleAc);
};
const switchBasicMode = () => {
  calculate.innerText = "";
  output.innerText = "";
  stat.textContent = "Stat";
  statMode = false;
  calculationLock = true;

  //working with divide button
  divide.textContent = "/";
  divide.removeEventListener("click", handleMean);
  divide.addEventListener("click", handleDivide);

  //working with multiply button
  multiply.textContent = "*";
  multiply.removeEventListener("click", handleMedian);
  multiply.addEventListener("click", handleMultiply);

  //working with sub button
  sub.textContent = "-";
  sub.removeEventListener("click", handleMode);
  sub.addEventListener("click", handleSub);

  //working with add button
  add.textContent = "+";
  add.removeEventListener("click", handleVar);
  add.addEventListener("click", handleAdd);

  //working with equal buttton
  equal.textContent = "=";
  equal.removeEventListener("click", handleSd);
  equal.addEventListener("click", equalTo);

  //working with decimal button
  decimal.textContent = ".";
  decimal.removeEventListener("click", handleComma);
  decimal.addEventListener("click", handleDecimal);
};

//working with stat button to switch between modes
stat.addEventListener("click", () => {
  if (!statMode) {
    switchStatMode();
  } else {
    switchBasicMode();
  }
});
switchBasicMode();
