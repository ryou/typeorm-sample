import { BaseEntity } from 'typeorm';
import Post from './Post';
export declare class User extends BaseEntity {
    id: number;
    name: string;
    age: number;
    posts: Post[];
}
export default User;
