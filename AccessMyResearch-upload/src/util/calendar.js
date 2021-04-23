
const months = [
    { 
        index: 0,
        name: "January",
        days: 31
    },
    {
        index: 1,
        name: "February",
        days: 28
    },
    {
        index: 2,
        name: "March",
        days: 31
    },
    {
        index: 3,
        name: "April",
        days: 30
    },
    {
        index: 4,
        name: "May",
        days: 31
    },
    {
        index: 5,
        name: "June",
        days: 30
    },
    {
        index: 6,
        name: "July",
        days: 31
    },
    {
        index: 7,
        name: "August",
        days: 31
    },
    {
        index: 8,
        name: "September",
        days: 30
    },
    {
        index: 9,
        name: "October",
        days: 31
    },
    {
        index: 10,
        name: "November",
        days: 30
    },
    {
        index: 11,
        name: "December",
        days: 31
    }
];

const calendar = {
    months,
    //The complete logic for leap years, to render the number of days in February.
    isLeapYear: function (year) {
        //year: integer
        if (year % 4 === 0) {
            if (year % 100 === 0)
                return year % 400 === 0;
            return true;
        }
        return false;
    },

    //Gets the number of days a month (indexed from 0=january) has in a particular year. Year should only matter for february and leap years.
    getNumDays: function (month, year) {
        //month: integer
        //year: integer

        let numDays = months[month].days;
        if (month === 1 && calendar.isLeapYear(year)) {
            numDays++;
        }

        return numDays;
    }
};

export default calendar;