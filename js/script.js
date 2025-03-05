const metricRadioBtn = document.getElementById("metric");
const imperialRadioBtn = document.getElementById("imperial");
const radioBtns = document.querySelector(".radio-btns");
const metricInputs = document.querySelector(".metric-inputs");
const imperialInputs = document.querySelector(".imperial-inputs");

const inputsContainer = document.querySelector(".inputs-container");

const cmInput = document.getElementById("height");
const kgInput = document.getElementById("weight");

const ftInput = document.getElementById("ft");
const inInput = document.getElementById("in");
const stInput = document.getElementById("st");
const lbsInput = document.getElementById("lbs");

const bmiResultContainer = document.querySelector(".bmi-result");
const resultHeader = document.querySelector(".welcome");
const bmiScore = document.getElementById("bmi-value");
const bmiTextResult = document.getElementById("bmi-text-result");

let units;

window.onload = () => {
    setMetric(true);
    units = "metric";
};

function setMetric(value) {
    metricRadioBtn.checked = value;
}

function setImperial(value) {
    imperialRadioBtn.checked = value;
}

function checkSelectedRadio() {
    if (metricRadioBtn.checked) {
        return metricRadioBtn.value.toString();
    }

    if (imperialRadioBtn.checked) {
        return imperialRadioBtn.value.toString();
    }
}

function displayMetricImperialInputs(selectedRadio) {
    if (selectedRadio === "metric") {
        metricInputs.classList.remove("hide");
        imperialInputs.classList.add("hide");
        return;
    }

    if (selectedRadio === "imperial") {
        imperialInputs.classList.remove("hide");
        metricInputs.classList.add("hide");
    }
}

function canCalculateMetricBMI() {
    if (!cmInput.value) return false;
    if (!kgInput.value) return false;
    return true;
}

function calculateMetricBMI() {
    const mVal = cmToM(Number(cmInput.value));
    return Number(kgInput.value) / (mVal * mVal);
}

function idealWeight() {
    const m2 = Math.pow(Number(cmToM(cmInput.value)), 2);
    const minWeight = 18.5 * m2;
    const maxWeight = 25 * m2;
    return "<strong>" + minWeight.toFixed(1) + "kgs - " + maxWeight.toFixed(1) + "kgs.</strong>";
}

function cmToM(cmValue) {
    return Number(cmValue) / 100;
}

function setBMIResultDOM(value) {
    //false if not empty
    if (!value) {
        bmiResultContainer.classList.remove("bmi-empty");
        resultHeader.textContent = "Your BMI is...";
    } else {
        bmiResultContainer.classList.add("bmi-empty");
        resultHeader.textContent = "Welcome!";
        bmiScore.innerHTML = "";
    }
}

function setBMIClassification(score) {
    const bmiVal = Number(score);
    if (bmiVal <= 16) {
        return "severe thinness";
    }
    if (bmiVal > 16 && bmiVal <= 17) {
        return "moderate thinness";
    }
    if (bmiVal > 17 && bmiVal <= 18.5) {
        return "mild thinness";
    }
    if (bmiVal > 18.5 && bmiVal <= 25) {
        return "normal";
    }
    if (bmiVal > 25 && bmiVal <= 30) {
        return "overweight";
    }
    if (bmiVal > 30 && bmiVal <= 35) {
        return "obese class I";
    }
    if (bmiVal > 35 && bmiVal <= 40) {
        return "obese class II";
    }
    if (bmiVal > 40) {
        return "obese class III";
    }
}

function resetInputs(value) {
    if (value === "metric") {
        ftInput.value = "";
        inInput.value = "";
        stInput.value = "";
        lbsInput.value = "";
    }

    if (value === "imperial") {
        cmInput.value = "";
        kgInput.value = "";
    }
}

radioBtns.addEventListener("click", (event) => {
    if (event.target.tagName === "INPUT") {
        if (checkSelectedRadio() === "metric") {
            units = "metric";
            displayMetricImperialInputs(units);
            resetInputs(units);
        }

        if (checkSelectedRadio() === "imperial") {
            units = "imperial";
            displayMetricImperialInputs(units);
            resetInputs(units);
            setBMIResultDOM(true);
            bmiTextResult.innerHTML = "Enter your height and weight and you’ll see your BMI result here";
        }
    }
});

inputsContainer.addEventListener("keyup", () => {
    if (units === "metric") {
        if (canCalculateMetricBMI()) {
            setBMIResultDOM(false);
            bmiScore.textContent = Number(calculateMetricBMI()).toFixed(1);
            const classification = setBMIClassification(bmiScore.textContent);
            if (classification === "normal") {
                bmiTextResult.textContent = "Your BMI suggests you're a " + classification + " weight.";
                return;
            }
            bmiTextResult.innerHTML = "";
            bmiTextResult.innerHTML += "Your BMI suggests you're a " + classification + " weight. Your ideal weight is between " + idealWeight();
        } else {
            setBMIResultDOM(true);
            bmiTextResult.innerHTML = "Enter your height and weight and you’ll see your BMI result here";
        }
    }
});

function initialisation() {
    imperialInputs.classList.add("hide");

}

initialisation();
