import React, { useCallback } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles'


const SignUp: React.FC = () => {

    const handleSubmit = useCallback(async (data: object) => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().min(6, 'No mínimo 6 caracteres')
            });
            await schema.validate(data, {
                abortEarly: false,
            });
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Container>
        <Background/>
        <Content>
            <img src={logoImg} alt="GoBarber"/>
            <Form onSubmit={handleSubmit} >
                <h1>Faça seu Cadastro</h1>

                <Input name="name" icon={FiUser} placeholder="Nome"/>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>

                <Input name="password" icon={FiLock} placeholder="Senha" type="password"/>

                <Button type="submit">Cadastrar</Button>

            </Form>

            <a href="forgot">
                <FiArrowLeft/>
                Voltar para Login
            </a>
        </Content>
    </Container>
    );
}

export default SignUp;