function errorHandler(err, req, res, next) {
    console.error(err.stack);
    const options = {
        title: "MoodAMP",
        subTitle: `ERROR!`,
        content: `Sorry, looks like something broke!`
    };
    res.status(500).render("index", options);
}

export default errorHandler;