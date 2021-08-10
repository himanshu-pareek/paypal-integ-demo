const moment = require("moment-timezone");

const displayTime1 = () => {
    console.log(moment().toDate());
};

module.exports = { displayTime1 };
