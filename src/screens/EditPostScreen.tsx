import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { postUpdated, Post } from '../store/slices/postsSlice';
import { updatePost, getPost } from '../api/services/postsService';

export const EditPostScreen: React.FC = () => {
    const route = useRoute();
    const { postId } = route.params as { postId: number };
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const post: Post = await getPost(postId);
                setTitle(post.title);
                setBody(post.body);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleUpdate = async () => {
        const updatedPost = {
            title,
            body,
            userId: 1,
        };

        try {
            const result = await updatePost(postId, updatedPost);
            Alert.alert('Sucesso!', 'Post editado com sucesso!');
            dispatch(postUpdated(result));
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao editar o post');
            console.error('Error updating post:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Título do Post" />
            <Text style={styles.label}>Conteúdo</Text>
            <TextInput style={[styles.input, { height: 100, textAlignVertical: 'top' }]} value={body} onChangeText={setBody} placeholder="Conteúdo do Post" multiline numberOfLines={6} />
            <Button title="Update Post" onPress={handleUpdate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#343a40',
    },
    input: {
        height: 40,
        borderColor: '#ced4da',
        borderWidth: 1,
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    bodyInput: {
        height: 120,
        textAlignVertical: 'top',
    },
});

export default EditPostScreen;
