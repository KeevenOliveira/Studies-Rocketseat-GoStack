import React, {useState, useEffect} from 'react';
import api from './services/api';

import Header from './components/Header';
import './App.css';

function App(){
    const [projects, setProjects] = useState([]);
    //Esse useState vai retornar um array com 2 posições. 
    //1. Variável com o seu valor inicial
    //2. Função para atualizarmos esse valor

    useEffect(()=>{
        api.get('projects').then(response =>{
            setProjects(response.data)
        })
    },[]); //esse array é conhecido como array de dependências
    //Ela recebe dois parâmetros:
    //1.

    async function handleAddProject(){

        // setProjects([...projects, `New Project ${Date.now()}`]);
        const response = await api.post('projects',{
            title:`New Project ${Date.now()}`,
            owner:"Keeven"
        });
        const project = response.data;

        setProjects([...projects, project]);
    }

    return(
        <>
            <Header  title="Homepage"/>

            <ul>
                {projects.map(project =>(<li key={project.id}>{project.title}</li>))}
            </ul>
            {projects.map(project =>(<p key={project.id}>{project.owner}</p>))}
            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}
export default App;