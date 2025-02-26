export const notFound = (req, res, next) => {
    res.status(404);
    res.json({ message: 'Not Found' });
};

export const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};