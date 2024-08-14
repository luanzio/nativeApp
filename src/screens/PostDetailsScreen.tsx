import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchComments } from '../store/slices/postsSlice';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

type Props = {
    route: PostDetailsScreenRouteProp;
};

export const PostDetailsScreen: React.FC<Props> = ({ route }) => {
    const { postId } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const { comments, loading, error, posts } = useSelector((state: RootState) => state.posts);
    const [username, setUsername] = useState<string>('');
    const [photoUrl, setPhotoUrl] = useState<string>('');

    const post = posts.find((p) => p.id === postId);

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);

    useEffect(() => {
        const fetchUserAndPhoto = async () => {
            if (post) {
                // Buscar nome do usuário
                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
                const user = await userResponse.json();
                setUsername(user.name);

                // Buscar foto associada
                const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
                const allPhotos = await photosResponse.json();
                const photo = allPhotos.find((photo: { albumId: number; id: number }) => photo.albumId === post.userId);
                setPhotoUrl(photo ? photo.url : '');
            }
        };

        fetchUserAndPhoto();
    }, [post]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {post && (
                <>
                    <Image
                        source={{ uri: photoUrl || 'https://via.placeholder.com/600x400' }} // Imagem associada ao post
                        style={styles.postImage}
                    />
                    <Text style={styles.title}>{post.title}</Text>
                    <Text style={styles.postBody}>{post.body}</Text>
                    <Text style={styles.postUser}>Autor: {username}</Text>
                </>
            )}
            <Text style={styles.commentsTitle}>Comentários</Text>
            {comments.map((item) => (
                <View key={item.id} style={styles.commentContainer}>
                    <Text style={styles.commentEmail}>{item.email}</Text>
                    <Text style={styles.commentBody}>{item.body}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 16,
        textAlign: 'center',
    },
    postBody: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 16,
    },
    postUser: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 16,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginVertical: 16,
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 16,
    },
    commentContainer: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    commentName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
    },
    commentBody: {
        fontSize: 14,
        color: '#495057',
        marginTop: 8,
    },
    commentEmail: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 4,
    },
});

export default PostDetailsScreen;
