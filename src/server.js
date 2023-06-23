require('dotenv').config();

const app = require('./app');
const { db } = require('./database/config')
const port = process.env.PORT

db.authenticate()
    .then(() => console.log("Database authenticated"))
    .catch((err) => console.log(err))

db.sync()
    .then(() => console.log("Database synced"))
    .catch((err) => console.log(err))

app.listen(port, () => console.log(`Running on port ${port}`))