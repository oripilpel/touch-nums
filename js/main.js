var gNextNum = 1;
var gVictoryNum = 16;
var gNums;
var gTimerInterval;
var gStartTime;

function init() {
    setBoardSize();
    gNums = resetNums(gVictoryNum);
    renderNums(gNums)
}

function setBoardSize() {
    var elRadios = document.querySelectorAll('[name="switch"]')
    for (var i = 0; i < elRadios.length; i++) {
        if (elRadios[i].checked) {
            gVictoryNum = elRadios[i].value
        }
    }
}

function onReset() {
    clearInterval(gTimerInterval);
    init();
    gNextNum = 1;
    var elNextNumber = document.querySelector('.next-number');
    elNextNumber.innerText = `${1}`;
    var elTimer = document.querySelector('.timer');
    elTimer.innerHTML = `Click <span>1</span> to start`;

}

function renderNums(nums) {
    var elTable = document.querySelector('.table-body');
    var sqrtNum = Math.sqrt(nums.length);
    var strHtml = '';
    for (var i = 0; i < sqrtNum; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < sqrtNum; j++) {
            var rndNum = getRndNum(nums)
            strHtml += `<td onclick="onCellClicked(this)" data-val="${rndNum}" data-row="${i}" data-col="${j}">${rndNum}</td>`
        }
        strHtml += '</tr>';
    }
    elTable.innerHTML = strHtml;

}

function renderNextNumber() {
    if (gNextNum + 1 <= gVictoryNum) {
        var elNextNumber = document.querySelector('.next-number');
        elNextNumber.innerText = `${gNextNum + 1}`
    }
}

function renderTimer() {
    if (gNextNum > gVictoryNum) {
        clearInterval(gTimerInterval);
    }
    var elTimer = document.querySelector('.timer');
    elTimer.innerHTML = `<span> ${(Date.now() - gStartTime) / 1000}</span>sec`
}

function onCellClicked(elNum) {
    if (parseInt(elNum.innerText) === gNextNum) {
        if (gNextNum === 1) {
            gStartTime = Date.now()
            gTimerInterval = setInterval(renderTimer, 97)
        }
        renderNextNumber()
        elNum.style.background = 'linear-gradient(to bottom, #faf9f8, #686868)';
        gNextNum++
    }
}

function getRndNum(nums) {
    var rndIdx = getRandomInteger(0, (nums.length - 1));
    return nums.splice(rndIdx, 1)[0];
}

function resetNums(num) {
    var nums = [];
    for (var i = 0; i < num; i++) {
        nums.push(i + 1);
    }
    return nums;
}
