const app = require('./server')


app.use('/', require('./src/routes/userRoutes'))
app.use('/', require('./src/routes/sessionRoutes'))

module.exports = app