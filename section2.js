function findExpressions() {
    const numbers = document.getElementById("numbers").value.split(',').map(num => num.trim());
    const target = parseFloat(document.getElementById("target").value);
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    if (numbers.length === 0 || isNaN(target)) {
        resultDiv.innerHTML = "<p>Vui lòng nhập đúng dãy số và kết quả mong muốn.</p>";
        return;
    }
    const operators = ['+', '-', '*', '/', ''];
    let foundExpression = false;
    function generateExpressions(index, expression) {
        if (index === numbers.length) {
            try {
                let result = eval(expression);
                if (result === target) {
                    foundExpression = true;
                    resultDiv.innerHTML += `<p>Biểu thức tìm thấy: ${expression} = ${target}</p>`;
                }
            } catch (e) {
            }
            return;
        }
        for (let operator of operators) {
            generateExpressions(index + 1, expression + operator + numbers[index]);
        }
    }
    generateExpressions(1, numbers[0]);
    if (!foundExpression) {
        resultDiv.innerHTML = "<p>Không tìm thấy biểu thức nào thỏa mãn.</p>";
    }
}