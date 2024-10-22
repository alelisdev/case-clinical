const dotenv = require('dotenv')
dotenv.config()

// const PORT = process.env.PORT || 3000
// const HOST = process.env.HOST || 'localhost'
const target = `https://case-clinical-underwriting-api.azurewebsites.net/`
module.exports = {
  '/api': { target, secure: false },
  '/graphql': { target, secure: false, ws: true },
}
