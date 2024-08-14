import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'; // Importando a nova tela
import PostListScreen from './src/screens/PostListScreen';
import PostDetailsScreen from './src/screens/PostDetailsScreen';
import EditPostScreen from './src/screens/EditPostScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export type RootStackParamList = {
    Home: undefined;
    PostList: undefined;
    PostDetails: { postId: number };
    EditPost: { postId: number };
    CreatePost: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                    <Stack.Screen name="PostList" component={PostListScreen} options={{ title: 'Posts' }} />
                    <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: 'Detalhes do Post' }} />
                    <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: 'Editar Post' }} />
                    <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Criar Post' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
