let server = require('./server/server')

const app = {}
app.init = () => {
    server.init()
}
app.init()
module.exports = app