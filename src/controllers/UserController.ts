import Express from 'express'
import User from '../entities/User'
import Post from '../entities/Post'

const router = Express.Router()

router.get('/', async (req: Express.Request, res: Express.Response) => {
    const users = await User.find()

    return res.json(users)
})

router.post('/', async (req: Express.Request, res: Express.Response) => {
    const user = new User()

    user.name = req.body.name
    user.age = req.body.age
    await user.save()

    return res.json(user)
})

router.get('/:id', async (req: Express.Request, res: Express.Response) => {
    const userId = req.params.id
    const user = await User.findOne(userId)

    // TODO: ここのガード共通化したい
    if (user === undefined) {
        res.status(404)
        return res.json({
            message: `user id ${userId} is not found.`,
        })
    }

    return res.json(user)
})

router.put('/:id', async (req: Express.Request, res: Express.Response) => {
    const userId = req.params.id
    const user = await User.findOne(userId)

    if (user === undefined) {
        res.status(404)
        return res.json({
            message: `user id ${userId} is not found.`,
        })
    }

    user.name = req.body.name
    user.age = req.body.age
    await user.save()

    return res.json(user)
})

router.delete('/:id', async (req: Express.Request, res: Express.Response) => {
    const userId = req.params.id
    const user = await User.findOne(userId, { relations: ['posts'] })

    if (user === undefined) {
        res.status(404)
        return res.json({
            message: `user id ${userId} is not found.`,
        })
    }

    // TODO: リレーション毎削除するもっといい方法がないか探す
    const relationRemovePromise = user.posts.map((post: Post) => post.remove())
    await Promise.all(relationRemovePromise)

    await user.remove()

    return res.json(user)
})

router.post(
    '/:id/create_post',
    async (req: Express.Request, res: Express.Response) => {
        const userId = req.params.id
        const user = await User.findOne(userId)

        if (user === undefined) {
            res.status(404)
            return res.json({
                message: `user id ${userId} is not found.`,
            })
        }

        const post = new Post()
        post.title = req.body.title
        post.content = req.body.content
        post.user = user
        await post.save()

        return res.json(post)
    }
)

// TODO: CommonJSではなくES Module形式でどう書けばいいのか再考したい
module.exports = router
