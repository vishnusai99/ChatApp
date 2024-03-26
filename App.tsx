import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Root from './src/screens/Root';
import {NavigationContainer} from '@react-navigation/native';

import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme
import {Provider} from 'react-redux';
import { WebSocketLink } from "@apollo/client/link/ws";
import {store} from './src/redux/store';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
// import {createClient} from 'graphql-ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {SubscriptionClient} from 'subscriptions-transport-ws';

const Stack = createNativeStackNavigator();
const App = () => {
  const wsLink = new WebSocketLink(
    new SubscriptionClient('ws://10.0.2.2:3000/graphql'),
  );
  const httpLink = new HttpLink({
    uri: 'http://10.0.2.2:3000/graphql',
  });

  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {/* <PersistGate persistor={persistor}> */}
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Root" component={Root} />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
        {/* </PersistGate> */}
      </ApolloProvider>
    </Provider>
  );
};

export default App;
