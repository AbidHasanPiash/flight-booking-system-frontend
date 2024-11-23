const flightDateConfig = {
    currentDate: new Date(Date.now()).toISOString().split("T")[0], // Tomorrow
    minDate: new Date(Date.now()).toISOString().split("T")[0], // Tomorrow (in YYYY-MM-DD format)
    maxDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 10 days from today (in YYYY-MM-DD format)
};

export default flightDateConfig;  