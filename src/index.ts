import Express from 'express'
import { BaseEntity, createConnection, getConnectionOptions } from 'typeorm'
import * as bodyParser from 'body-parser'

const PORT_NUMBER = 3000

const app = Express()

const connectDatabase = async () => {
    const connectionOptions = await getConnectionOptions()
    const connection = await createConnection(connectionOptions)
    BaseEntity.useConnection(connection)
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/user', require('./controllers/UserController'))
app.use('/post', require('./controllers/PostController'))

app.listen(PORT_NUMBER, async () => {
    await connectDatabase()
    console.log(`listening on port ${PORT_NUMBER}`)
})
