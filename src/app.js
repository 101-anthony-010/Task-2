const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/error.controller')

//Routes
const userRouter = require('./routers/users.routes')
const repairRoutes = require('./routers/repairs.routes')

const app = express();

app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rutas
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/auth", authRouter);
app.use("/api/v1/repairs", repairRoutes);

app.all('*', (req, res, next) => {
    return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    )
})

app.use(globalErrorHandler)

module.exports = app;