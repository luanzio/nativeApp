import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPosts, getPostComments } from '../../api/services/postsService';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface PostsState {
    posts: Post[];
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    comments: [],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await getPosts();
    return response;
});

export const fetchComments = createAsyncThunk('posts/fetchComments', async (postId: number) => {
    const response = await getPostComments(postId);
    return response;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: (state, action) => {
            state.posts.unshift(action.payload);
        },
        postUpdated: (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex((post) => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts';
            })
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch comments';
            });
    },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
