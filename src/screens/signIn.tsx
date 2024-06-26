import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "native-base";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

import { Input } from "@components/input";
import { Button } from "@components/button";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/appError";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  const { singIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const toas = useToast();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await singIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title =  isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

      toas.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      setIsLoading(false);
    }
  }
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
    <VStack flex={1} px={10} pb={16}>
    <Image 
      source={BackgroundImg}
      defaultSource={BackgroundImg}
      alt="Pessoas treinando"
      resizeMode="contain"
      position="absolute"
    />

    <Center my={24}>
      <LogoSvg />

      <Text color="gray.100" fontSize="sm">
        Treine sua mente e o seu corpo.
      </Text>
    </Center>

    <Center flex={1}>
      <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
        Acesse a conta
      </Heading>

      <Controller 
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          
          <Controller 
            control={control}
            name="password"
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="Senha" 
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button 
            title="Acessar" 
            onPress={handleSubmit(handleSignIn)} 
            isLoading={isLoading}
          />
    </Center>

    <Center mt={24}>
      <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
        Ainda não tem acesso?
      </Text>

      <Button 
        title="Criar Conta" 
        variant="outline"
        onPress={handleNewAccount}
      />
    </Center>
  </VStack>
</ScrollView>
  );
}