import React, { FormEvent, useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import api from '../../services/api';


import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from '../Dashboard/styles';

interface Repository {
    //você não precisa typar tudo o que teu repositório vai ter
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string; 
    }
}

const Dashboard:React.FC = () => {

    const [newRepository, setNewRepository] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GitHubExplorer:repositories');
    
        if(storagedRepositories){
            return JSON.parse(storagedRepositories);
        }
        return [];
    });


    useEffect(()=>{
        localStorage.setItem('@GitHubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
       
        event.preventDefault();

        if(!newRepository){
           setInputError('Digite o autor/nome do repositório');
            return;
        }
        //Adição de um novo repositório
        //consumir API do Github
        //Salvar novo repositório no estado
        try{
            const response = await api.get<Repository>(`repos/${newRepository}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);
            setNewRepository('');
            setInputError('');
        } catch(Error){
            setInputError('Erro na busca por esse repositório');
        }
    }

    return (
    <>
        <img src={logoImg} alt="GitHub Explorer"/>
        <Title>Explore repositórios no GitHub</Title>
        <Form hasError={!!inputError} /*Essa expressão é igual a Boolean(inputError)*/ onSubmit={handleAddRepository}>
            <input 
            placeholder="Digite aqui"
            value={newRepository}
            onChange={(e) => setNewRepository(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
        </Form>

        {inputError && <Error>{inputError}</Error>}

        <Repositories>
            {repositories.map(repository => (
            <Link  key={repository.full_name} to="/repository">
                <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                </div>
                <FiChevronRight size={20} />
            </Link>))}
        </Repositories>
        
    </>
    );
};
export default Dashboard;
