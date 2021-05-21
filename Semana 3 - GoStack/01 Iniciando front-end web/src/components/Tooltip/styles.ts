import styled from 'styled-components';

export const Container = styled.div`
    position: relative; // para ficar relativo à tela

    span {
        width: 160px;
        background: #FF9000;
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;

        visibility: hidden; // vai esconder o elemento da nossa DOM

        transition: opacity 0.4s;
        position: absolute;
        bottom: calc(100% + 12px);
        left: 50%;
        transform: translateX(-50%);

        color: #312E38;

        &::before { // a flecha
            content: ''; //para mostrar na tela, tem que ser desse jeito.
            border-style: solid;
            border-color: #FF9000 transparent;
            border-width: 6px 6px 0 6px; //fazer um triângulo
            
            bottom: 20px;
            top: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    &:hover span {
        opacity: 1;
        visibility: visible;
    }
`;