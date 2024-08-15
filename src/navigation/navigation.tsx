import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PostListScreen from '../screens/PostListScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import EditPostScreen from '../screens/EditPostScreen';
import CreatePostScreen from '../screens/CreatePostScreen';

export type RootStackParamList = {
    Home: undefined;
    PostList: undefined;
    PostDetails: { postId: number };
    EditPost: { postId: number };
    CreatePost: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                <Stack.Screen name="PostList" component={PostListScreen} options={{ title: 'Posts' }} />
                <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: 'Detalhes do Post' }} />
                <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: 'Editar Post' }} />
                <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Criar Post' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
