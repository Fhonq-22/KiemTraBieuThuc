function generateRandomNumbersAndTarget() {
    const numbers = [];
    const operators = ['+', '-', '*', '/', ''];
    let expression;
    let target;
    do {
        numbers.length = 0;
        const count = Math.floor(Math.random() * 9);
        for (let i = 0; i < count; i++) {
            numbers.push(Math.floor(Math.random() * 10) + 1);
        }
        expression = numbers[0].toString();
        for (let i = 1; i < numbers.length; i++) {
            const randomOperator = operators[Math.floor(Math.random() * operators.length)];
            expression += randomOperator + numbers[i];
        }
        target = eval(expression);
    } while (!Number.isInteger(target));
    
    return { numbers, target };
}

function initializeChallenge() {
    const { numbers, target } = generateRandomNumbersAndTarget();
    document.getElementById("challenge-numbers").value = numbers.join(',');
    document.getElementById("challenge-target").value = target;
}

function checkPlayerExpression() {
    const playerInput = document.getElementById("player-input").value;
    const target = parseFloat(document.getElementById("challenge-target").value);
    const challengeNumbers = document.getElementById("challenge-numbers").value.split(',').map(num => num.trim());
    let resultDiv = document.getElementById("result-challenge");
    resultDiv.innerHTML = "";
    try {
        const regex = new RegExp(challengeNumbers.join('.*'));
        if (!regex.test(playerInput.replace(/\s+/g, ''))) {
            resultDiv.innerHTML = `<p>Sai! Các số trong biểu thức không đúng thứ tự như đã cung cấp.</p>`;
            resultDiv.className = "alert alert-error";
            return;
        }

        const playerNumbers = playerInput.match(/\d+/g).map(Number);
        const numberCount = {}; 
        challengeNumbers.forEach(num => {
            numberCount[num] = (numberCount[num] || 0) + 1;
        });
        let usedNumbersCount = {};
        for (const num of playerNumbers) {
            if (usedNumbersCount[num]) {
                usedNumbersCount[num]++;
            } else {
                usedNumbersCount[num] = 1;
            }
            const stringNum = num.toString();
            let valid = false;
            for (const challengeNum of challengeNumbers) {
                if (stringNum === challengeNum) {
                    valid = true;
                    break;
                }
            }
            if (!valid) {
                const splitDigits = stringNum.split('');
                for (const digit of splitDigits) {
                    if (!numberCount.hasOwnProperty(digit) || usedNumbersCount[digit] >= numberCount[digit]) {
                        resultDiv.innerHTML = `<p>Sai! Số ${num} không nằm trong số đã cho.</p>`;
                        resultDiv.className = "alert alert-error";
                        return;
                    }
                }
            }
        }
        for (const num in usedNumbersCount) {
            if (usedNumbersCount[num] > numberCount[num]) {
                resultDiv.innerHTML = `<p>Sai! Bạn đã sử dụng số ${num} nhiều hơn số lần đã cho.</p>`;
                resultDiv.className = "alert alert-error";
                return;
            }
        }

        let playerResult = eval(playerInput);
        if (playerResult !== target) {
            resultDiv.innerHTML = `<p>Sai! Kết quả của bạn là ${playerResult}, nhưng kết quả mong muốn là ${target}.</p>`;
            resultDiv.className = "alert alert-error";
            return;
        }
        resultDiv.innerHTML = `<p>Chính xác! Biểu thức của bạn đúng.</p>`;
        resultDiv.className = "alert alert-success";
    } catch (e) {
        resultDiv.innerHTML = `<p>Biểu thức không hợp lệ. Vui lòng nhập lại.</p>`;
        resultDiv.className = "alert alert-error";
    }
}
