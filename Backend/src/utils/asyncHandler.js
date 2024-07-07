// creating a Higher Order Function (HOF)
// HOF is a function that takes function as an argument and returns anohter function

// Creating this using Promise & Response Syntax

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
                .catch((err) => {
                    console.log('Error in Async Handler', err);
                    next(err);
                });
    }
}

export {asyncHandler};