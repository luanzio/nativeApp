import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
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
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
