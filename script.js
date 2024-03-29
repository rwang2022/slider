import noUiSlider from './nouislider/dist/nouislider.mjs';

var format = {
    to: function (minutesAfterMidnight) {
        minutesAfterMidnight = Math.round(minutesAfterMidnight);
        const hours = Math.floor(minutesAfterMidnight / 60);
        const minutes = (minutesAfterMidnight % 60);
        const meridiem = hours < 12 ? "AM" : "PM";
        const formattedHours = hours % 12 || 12;
        const timeString = `${String(formattedHours)}:${String(minutes).padStart(2, '0')}${meridiem}`;
        return timeString;
    },
    from: function (timeStr) {
        timeStr = timeStr.trim();
        var time = timeStr.slice(0, -2);
        var meridiem = timeStr.slice(-2, undefined);
        var [hoursStr, minutesStr] = time.split(":");
        let hours = parseInt(hoursStr, 10);
        let minutes = parseInt(minutesStr, 10);
        if (meridiem === "PM" && hours !== 12) {
            hours += 12;
        } else if (meridiem === "AM" && hours === 12) {
            hours = 0;
        }
        var minutesAfterMidnight = hours * 60 + minutes;
        return minutesAfterMidnight;
    }
}

const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(" ", "");
var nowMinutes = format.from(nowStr);
console.log("nowStr:" + nowStr);
console.log("nowMinutes:" + nowMinutes);

var lockedState = true;
var lockedSlider = true;
var lockedValues = [nowMinutes, nowMinutes + 60]; // 8AM, 10AM
var slider1 = document.getElementById('slider1');
var slider2 = document.getElementById('slider2');
var lockButton = document.getElementById('lockbutton');
var slider1Value = document.getElementById('slider1-span');
var slider2Value = document.getElementById('slider2-span');
lockButton.addEventListener('click', function () {
    lockedState = !lockedState;
    this.textContent = lockedState ? 'Unlock' : 'Lock';
});
function crossUpdate(value, slider) {
    if (!lockedState) return;
    var a = slider1 === slider ? 0 : 1;
    var b = a ? 0 : 1;
    value -= lockedValues[b] - lockedValues[a];
    slider.noUiSlider.set(value);
}
const START_OF_DAY = 0;
const LAST_MINUTE = 23 * 60 + 59;
noUiSlider.create(slider1, {
    start: nowMinutes,
    animate: false,
    range: {
        min: START_OF_DAY,
        max: LAST_MINUTE
    }
});
noUiSlider.create(slider2, {
    start: nowMinutes + 60,
    animate: false,
    range: {
        min: START_OF_DAY,
        max: LAST_MINUTE
    }
});
slider1.noUiSlider.on('update', function (values, handle) {
    slider1Value.innerHTML = format.to(values[handle]);
});
slider2.noUiSlider.on('update', function (values, handle) {
    slider2Value.innerHTML = format.to(values[handle]);
});
function setLockedValues() {
    lockedValues = [
        Number(slider1.noUiSlider.get()),
        Number(slider2.noUiSlider.get())
    ];
}
slider1.noUiSlider.on('change', setLockedValues);
slider2.noUiSlider.on('change', setLockedValues);
slider1.noUiSlider.on('slide', function (values, handle) {
    crossUpdate(values[handle], slider2);
});
slider2.noUiSlider.on('slide', function (values, handle) {
    crossUpdate(values[handle], slider1);
});









//! experimental 

var html5Slider = document.getElementById('html5');
noUiSlider.create(html5Slider, {
    start: [10, 30],
    connect: true,
    range: {
        'min': -20,
        'max': 40
    }
});

var inputNumber1 = document.getElementById('input-number1');
var inputNumber2 = document.getElementById('input-number2');

html5Slider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];

    if (handle) {
        inputNumber2.value = value;
    } else {
        inputNumber1.value = value;
    }
});

inputNumber1.addEventListener('change', function () {
    html5Slider.noUiSlider.set([this.value, null]);
});

inputNumber2.addEventListener('change', function () {
    html5Slider.noUiSlider.set([null, this.value]);
});
