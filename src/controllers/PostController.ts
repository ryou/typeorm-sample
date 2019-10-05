import Express from 'express'
import Post from '../entities/Post'

const router = Express.Router()

router.get('/', async (req: Express.Request, res: Express.Response) => {
    const posts = await Post.find({ relations: ['user'] })

    return res.json(posts)
})

router.get('/:id', async (req: Express.Request, res: Express.Response) => {
    const postId = req.params.id
    const post = await Post.findOne(postId, { relations: ['user'] })

    // TODO: ここのガードの共通化
    if (post === undefined) {
        res.status(404)
        return res.json({
            message: `post id ${postId} is not found.`,
        })
    }

    return res.json(post)
})

router.put('/:id', async (req: Express.Request, res: Express.Response) => {
    const postId = req.params.id
    const post = await Post.findOne(postId)

    if (post === undefined) {
        res.status(404)
        return res.json({
            message: `post id ${postId} is not found.`,
        })
    }

    post.title = req.body.title
    post.content = req.body.content
    await post.save()

    return res.json(post)
})

router.delete('/:id', async (req: Express.Request, res: Express.Response) => {
    const postId = req.params.id
    const post = await Post.findOne(postId)

    if (post === undefined) {
        res.status(404)
        return res.json({
            message: `post id ${postId} is not found.`,
        })
    }

    await post.remove()

    return res.json(post)
})

// TODO: CommonJSではなくES Module形式でどう書けばいいのか再考したい
module.exports = router
