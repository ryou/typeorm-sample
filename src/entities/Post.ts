import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import User from './User'

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    public id: number

    // eslint-disable-next-line
    @ManyToOne(type => User, user => user.posts)
    // @ts-ignore
    public user: User

    @Column()
    public title: string = ''

    @Column('text')
    public content: string = ''
}

export default Post
