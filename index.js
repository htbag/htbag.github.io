const percentages = [34, 21, 15, 11, 7, 5, 4, 3];

function calculate() {
    const prize = parseInt(document.getElementById("prize").value);
    const payouts = [];

    percentages.forEach((v, i) => {
        const payout = Math.floor(prize * v / 100);
        payouts[i] = payout;
    });

    const min = parseInt(document.getElementById('minimalPayout').value);
    const round = parseInt(document.getElementById('round').value);
    const roundedPayouts = payouts.map(v => {
        if (v < min) {
            return min;
        } else {
            return Math.round(v / round) * round;
        }
    });
    const roundedPayoutsTotal = roundedPayouts.reduce((prev, cur) => {
        return prev + cur;
    }, 0);
    const delta = prize - roundedPayoutsTotal;
    roundedPayouts[0] += delta

    return roundedPayouts;
}

function showPayouts(payouts) {
    const payouttable = document.getElementById('payouttable');
    payouttable.textContent = '';
    const headTemplate = document.getElementById('headTemplate').content;
    payouttable.appendChild(document.importNode(headTemplate, true));
    const template = document.getElementById('rowtemplate').content;
    payouts.forEach((v, i) => {
        const row = document.importNode(template, true);
        row.querySelector('.place').innerHTML = i + 1;
        row.querySelector('.payout').innerHTML = v;
        payouttable.appendChild(row);  
    });
}