import { BaseEntity } from 'typeorm';
import User from './User';
export declare class Post extends BaseEntity {
    id: number;
    user: User;
    title: string;
    content: string;
}
export default Post;
