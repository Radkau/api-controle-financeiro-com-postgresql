const express = require('express')
const rotas = require('./rotas')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(rotas)

app.listen(3000)