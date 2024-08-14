import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { postAdded } from '../store/slices/postsSlice';
import { createPost } from '../api/services/postsService';

type CreatePostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePost'>;

export const CreatePostScreen: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation<CreatePostScreenNavigationProp>();

    const handleSubmit = async () => {
        const newPost = { title, body, userId: 1 };

        try {
            const result = await createPost(newPost);
            Alert.alert('Sucesso!', 'Post criado com sucesso!');
            dispatch(postAdded(result));
            navigation.goBack();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Algo deu errado!';
            Alert.alert('Erro', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Título do Post" />
            <Text style={styles.label}>Conteúdo</Text>
            <TextInput style={[styles.input, { height: 100, textAlignVertical: 'top' }]} value={body} onChangeText={setBody} placeholder="Conteúdo do Post" multiline numberOfLines={6} />
            <Button title="Criar Post" onPress={handleSubmit} />
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
});

export default CreatePostScreen;
