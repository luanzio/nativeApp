import React from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigation';
import { useNavigation } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/posts-logo.png')} style={styles.image} />
            <Text style={styles.title}>Bem-Vindo ao App Posts!</Text>
            <Button title="Descubra Novos" onPress={() => navigation.navigate('PostList')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
});

export default HomeScreen;
