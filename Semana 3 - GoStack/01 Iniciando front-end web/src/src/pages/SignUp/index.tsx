import React from 'react';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles'

const SignUp: React.FC = () => (
    <Container>
        <Background/>
        <Content>
            <img src={logoImg} alt="GoBarber"/>
            <form>
                <h1>Faça seu Cadastro</h1>

                <Input name="name" icon={FiUser} placeholder="Nome"/>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>

                <Input name="password" icon={FiLock} placeholder="Senha" type="password"/>

                <Button type="submit">Cadastrar</Button>

            </form>

            <a href="forgot">
                <FiArrowLeft/>
                Voltar para Login
            </a>
        </Content>
    </Container>
);

export default SignUp;