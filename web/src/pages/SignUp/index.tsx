import React, { FC, useCallback } from 'react';

import { Form } from '@unform/web';

import LogoImg from '../../assets/images/logo.png';

import { Container } from './styles';
import Input from '../../components/Input';

const SignUp: FC = () => {
  const handleSubmit = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <img src={LogoImg} alt="instadev" />

        <Input name="name" placeholder="Nome Completo" />
        <Input name="user_name" placeholder="Nome do Usuário" />
        <Input name="email" placeholder="Seu melhor e-mail" />
        <Input name="password" placeholder="Sua senha" />
      </Form>
    </Container>
  );
};

export default SignUp;
