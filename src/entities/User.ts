import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import Post from './Post'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    public id: number

    @Column()
    public name: string = ''

    @Column()
    public age: number = 0

    // eslint-disable-next-line
    @OneToMany(type => Post, post => post.user)
    // @ts-ignore
    public posts: Post[]
}

export default User
