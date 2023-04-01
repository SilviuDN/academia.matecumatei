module.exports = app => {
    // app.use('/api/', require('./base.routes'))
    app.use('/api/', require('./auth.routes'))
    app.use('/api/users', require('./users.routes'))
    app.use('/api/courses', require('./courses.routes'))
    app.use('/api/sections', require('./sections.routes'))
    app.use('/api/lectures', require('./lectures.routes'))
    app.use("/api/upload", require("./uploads.routes"))
    // app.use('/api/auth', require('./auth.routes'))
}