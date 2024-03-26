import {TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  ButtonText,
  Icon,
  Text,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import GoogleIcon from '../../assets/icons/GoogleIcon';
import {G, Path, Svg} from 'react-native-svg';
import auth from '@react-native-firebase/auth';
import {useAppDispatch} from '../../redux/hooks';
const Signin = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignIn = async () => {
    try {
      const k = await auth().signInWithEmailAndPassword(email, password);
      if (k) {
        navigation.navigate('Main')
      }
    } catch (error) {
      console.error(error, ' -------------------- the error');
    }
  };

  return (
    <Box
      backgroundColor="#FFF"
      flex={1}
      justifyContent="center"
      padding={'$1.5'}>
      <View className="gap-3">
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </Input>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}>
          <InputField
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
          />
        </Input>
        <Button onPress={handleSignIn}>
          <ButtonText color="white" fontWeight={'bold'}>
            Sign In
          </ButtonText>
        </Button>
      </View>
    </Box>
  );
};

export default Signin;
