const printStatus = (results) => {
    console.info();
    console.info("== React Native app rename ==");
    console.info();
    console.info("Tasks taken to fully rename your app:", results.fails + results.oks);
    console.info("Tasks ended with success:", results.oks);
    console.info("Tasks that failed:", results.fails);
};

export default printStatus;
