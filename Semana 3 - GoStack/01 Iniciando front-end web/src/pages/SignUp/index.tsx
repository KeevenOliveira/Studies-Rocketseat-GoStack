import React, { useCallback, useRef } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/ToastContext';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background, AnimationContainer } from './styles'

interface SignUpFormData { 
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().min(6, 'No mínimo 6 caracteres')
            });

            await schema.validate(data, {
                abortEarly: false,
            });


            await api.post('/users', data)
            history.push('/')
            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu Login no GoBarber!' 
            })

        } catch (error) {

            if (error instanceof Yup.ValidationError){
                const errors = getValidationErrors(error);
                
                formRef.current?.setErrors(errors);

                return;
            }

            // disparar um toast


            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
            });
            console.log(error);
        }
    }, [addToast, history])

    return (
        <Container>
        <Background/>
        <Content>
            <AnimationContainer>
                <img src={logoImg} alt="GoBarber"/>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <h1>Faça seu Cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome"/>

                    <Input name="email" icon={FiMail} placeholder="E-mail"/>

                    <Input name="password" icon={FiLock} placeholder="Senha" type="password"/>

                    <Button type="submit">Cadastrar</Button>

                </Form>

                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para Login
                </Link>
            </AnimationContainer>
        </Content>
    </Container>
    );
}

export default SignUp;