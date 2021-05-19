import React from 'react';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles'

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber"/>
            <form>
                <h1>Faça seu login</h1>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>

                <Input name="password" icon={FiLock} placeholder="Senha" type="password"/>

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </form>

            <a href="forgot">
                <FiLogIn/>
                Criar conta
            </a>
        </Content>
        <Background/>
    </Container>
);

export default SignIn;