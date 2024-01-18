"use strict";

var _nouislider = _interopRequireDefault(require("./nouislider/dist/nouislider.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var format = {
  to: function to(minutesAfterMidnight) {
    minutesAfterMidnight = Math.round(minutesAfterMidnight);
    var hours = Math.floor(minutesAfterMidnight / 60);
    var minutes = minutesAfterMidnight % 60;
    var meridiem = hours < 12 ? "AM" : "PM";
    var formattedHours = hours % 12 || 12;
    var timeString = "".concat(String(formattedHours), ":").concat(String(minutes).padStart(2, '0')).concat(meridiem);
    return timeString;
  },
  from: function from(timeStr) {
    timeStr = timeStr.trim();
    var time = timeStr.slice(0, -2);
    var meridiem = timeStr.slice(-2, undefined);

    var _time$split = time.split(":"),
        _time$split2 = _slicedToArray(_time$split, 2),
        hoursStr = _time$split2[0],
        minutesStr = _time$split2[1];

    var hours = parseInt(hoursStr, 10);
    var minutes = parseInt(minutesStr, 10);

    if (meridiem === "PM" && hours !== 12) {
      hours += 12;
    } else if (meridiem === "AM" && hours === 12) {
      hours = 0;
    }

    var minutesAfterMidnight = hours * 60 + minutes;
    return minutesAfterMidnight;
  }
};
var nowStr = new Date().toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit'
}).replace(" ", "");
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

var START_OF_DAY = 0;
var LAST_MINUTE = 23 * 60 + 59;

_nouislider["default"].create(slider1, {
  start: nowMinutes,
  animate: false,
  range: {
    min: START_OF_DAY,
    max: LAST_MINUTE
  }
});

_nouislider["default"].create(slider2, {
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
  lockedValues = [Number(slider1.noUiSlider.get()), Number(slider2.noUiSlider.get())];
}

slider1.noUiSlider.on('change', setLockedValues);
slider2.noUiSlider.on('change', setLockedValues);
slider1.noUiSlider.on('slide', function (values, handle) {
  crossUpdate(values[handle], slider2);
});
slider2.noUiSlider.on('slide', function (values, handle) {
  crossUpdate(values[handle], slider1);
}); //! experimental 

var html5Slider = document.getElementById('html5');

_nouislider["default"].create(html5Slider, {
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