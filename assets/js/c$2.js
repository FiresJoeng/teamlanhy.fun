// By Fires

const rangeInput1 = document.getElementById('rangeInput1');
const rangeValue1 = document.getElementById('rangeValue1');

rangeInput1.addEventListener('input', function () {
    rangeValue1.textContent = parseFloat(rangeInput1.value).toFixed(2);
});
rangeValue1.textContent = parseFloat(rangeInput1.value).toFixed(2);

const rangeInput2 = document.getElementById('rangeInput2');
const rangeValue2 = document.getElementById('rangeValue2');

rangeInput2.addEventListener('input', function () {
    rangeValue2.textContent = parseFloat(rangeInput2.value);
});