import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchPosts } from '../store/slices/postsSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type PostListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostList'>;

type Props = {
    navigation: PostListScreenNavigationProp;
};

const PostListScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector((state: RootState) => state.posts);
    const [photos, setPhotos] = useState<{ [key: number]: string }>({});
    const [users, setUsers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
            const allPhotos = await photosResponse.json();
            const photoMap: { [key: number]: string } = {};

            allPhotos.forEach((photo: { albumId: number; url: string }) => {
                if (photo.albumId <= 10) {
                    photoMap[photo.albumId] = photo.url;
                }
            });

            setPhotos(photoMap);
        };

        const fetchUsers = async () => {
            const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
            const allUsers = await usersResponse.json();
            const userMap: { [key: number]: string } = {};

            allUsers.forEach((user: { id: number; name: string }) => {
                userMap[user.id] = user.name;
            });

            setUsers(userMap);
        };

        fetchPhotos();
        fetchUsers();
    }, []);

    const handleLongPress = (postId: number) => {
        Alert.alert('Editar Post', 'Você deseja editar esse post?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Editar',
                onPress: () => navigation.navigate('EditPost', { postId }),
            },
        ]);
    };

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
        <View style={styles.container}>
            <Button title="Crie um novo Post" onPress={() => navigation.navigate('CreatePost')} />
            <FlatList
                style={{ marginTop: 16 }}
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.postContainer}
                        onPress={() => navigation.navigate('PostDetails', { postId: item.id })}
                        onLongPress={() => handleLongPress(item.id)}
                        accessibilityLabel={`Veja detalhes do post ${item.title}`}
                        accessible={true}
                    >
                        <Image source={{ uri: photos[item.id] || 'https://via.placeholder.com/150' }} style={styles.postImage} />
                        <View style={styles.postContent}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text style={styles.postUser}>Autor: {users[item.userId] || 'Desconhecido'}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
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
    postContainer: {
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    postImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    postContent: {
        flex: 1,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
    },
    postUser: {
        fontSize: 14,
        color: '#495057',
        marginTop: 4,
    },
    newPostBtn: {
        marginBottom: 160,
    },
});

export default PostListScreen;
