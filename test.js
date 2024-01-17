function fromFormatted(timeStr) {
    timeStr = timeStr.trim();
    // Split the time string into hours, minutes, and AM/PM
    // var [time, meridiem] = timeStr.split(" ");
    var time = timeStr.slice(0, -2);
    var meridiem = timeStr.slice(-2, undefined);
    var [hoursStr, minutesStr] = time.split(":");

    // Convert hours and minutes to numbers
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);

    // Adjust hours for 24-hour format
    if (meridiem === "PM" && hours !== 12) {
        hours += 12;
    } else if (meridiem === "AM" && hours === 12) {
        hours = 0;
    }

    // Calculate total minutes after midnight
    var minutesAfterMidnight = hours * 60 + minutes;

    return minutesAfterMidnight;
}

console.assert(fromFormatted("12:00AM") === 0, "test case 1 failed");
console.assert(fromFormatted("12:00PM") === 720, "test case 2 failed");
console.assert(fromFormatted("1:00AM") === 60, "test case 3 failed");
console.assert(fromFormatted("2:00AM") === 120, "test case 4 failed");
console.assert(fromFormatted("3:00AM") === 180, "test case 5 failed");
console.assert(fromFormatted("4:00AM") === 240, "test case 6 failed");
console.assert(fromFormatted("1:00PM") === 780, "test case 7 failed");
console.assert(fromFormatted("2:00PM") === 840, "test case 8 failed");
console.assert(fromFormatted("10:00PM") === 1320, "test case 9 failed");
console.assert(fromFormatted("11:59PM") === 1439, "test case 10 failed");
console.assert(fromFormatted("11:59AM") === 719, "test case 11 failed");

function toFormatted(minutesAfterMidnight) {
    // Calculate hours and minutes
    const hours = Math.floor(minutesAfterMidnight / 60);
    const minutes = minutesAfterMidnight % 60;

    // Determine AM or PM
    const meridiem = hours < 12 ? "AM" : "PM";

    // Adjust hours for 12-hour format
    const formattedHours = hours % 12 || 12;

    // Format the time
    const timeString = `${String(formattedHours)}:${String(minutes).padStart(2, '0')}${meridiem}`;

    return timeString;
}

console.assert(toFormatted(0) === "12:00AM", "test case 12 failed");
console.assert(toFormatted(1) === "12:01AM", "test case 13 failed");
console.assert(toFormatted(2) === "12:02AM", "test case 14 failed");
console.assert(toFormatted(59) === "12:59AM", "test case 15 failed");
console.assert(toFormatted(392) === "6:32AM", "test case 15 failed");
console.assert(toFormatted(719) === "11:59AM", "test case 16 failed");
console.assert(toFormatted(1080) === "6:00PM", "test case 17 failed");
console.assert(toFormatted(1380) === "11:00PM", "test case 18 failed");
console.assert(toFormatted(1437) === "11:57PM", "test case 19 failed");


console.assert(toFormatted(fromFormatted("12:00AM")) === "12:00AM", "test case 20 failed");
console.assert(toFormatted(fromFormatted("1:00AM")) === "1:00AM", "test case 21 failed");
console.assert(toFormatted(fromFormatted("2:00AM")) === "2:00AM", "test case 22 failed");
console.assert(toFormatted(fromFormatted("3:00AM")) === "3:00AM", "test case 23 failed");
console.assert(toFormatted(fromFormatted("4:00AM")) === "4:00AM", "test case 24 failed");
console.assert(toFormatted(fromFormatted("5:00AM")) === "5:00AM", "test case 25 failed");

console.assert(fromFormatted(toFormatted(0)) === 0, "test case 26 failed");
console.assert(fromFormatted(toFormatted(100)) === 100, "test case 26 failed");
console.assert(fromFormatted(toFormatted(200)) === 200, "test case 26 failed");
console.assert(fromFormatted(toFormatted(300)) === 300, "test case 26 failed");
console.assert(fromFormatted(toFormatted(400)) === 400, "test case 26 failed");
console.assert(fromFormatted(toFormatted(500)) === 500, "test case 26 failed");