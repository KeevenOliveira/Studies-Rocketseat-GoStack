import React, { useRef, useCallback, useContext } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErros';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {AuthContext} from '../../context/AuthContext';

import { Container, Content, Background } from './styles'


interface SignInFormData { 
    email: string,
    password: string,
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    
    const { signIn } = useContext(AuthContext);


    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória  ')
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            signIn({
                email: data.email,
                password: data.password,
            });
        } catch (error) {

            const errors = getValidationErrors(error);
            
            formRef.current?.setErrors(errors);
            
            console.log(error);
        }
    }, [signIn])

    return(
    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber"/>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu login</h1>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>

                <Input name="password" icon={FiLock} placeholder="Senha" type="password"/>

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </Form>

            <a href="forgot">
                <FiLogIn/>
                Criar conta
            </a>
        </Content>
        <Background/>
    </Container>
    );
};

export default SignIn;