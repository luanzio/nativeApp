import axios, { Method } from 'axios';
import { Post, Comment } from '../../store/slices/postsSlice';
import { API_BASE_URL } from '@env';

const api = axios.create({
    baseURL: API_BASE_URL,
});

const apiRequest = async <T>(method: Method, url: string, data?: any): Promise<T> => {
    try {
        const response = await api.request<T>({
            method,
            url,
            data,
        });
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message || 'Something went wrong');
    }
};

export const getPost = (postId: number): Promise<Post> => {
    return apiRequest<Post>('get', `/posts/${postId}`);
};

export const getPosts = (): Promise<Post[]> => {
    return apiRequest<Post[]>('get', '/posts');
};

export const getPostComments = (postId: number): Promise<Comment[]> => {
    return apiRequest<Comment[]>('get', `/posts/${postId}/comments`);
};

export const createPost = (post: Omit<Post, 'id'>): Promise<Post> => {
    return apiRequest<Post>('post', '/posts', post);
};

export const updatePost = (postId: number, post: Partial<Post>): Promise<Post> => {
    return apiRequest<Post>('patch', `/posts/${postId}`, post);
};
