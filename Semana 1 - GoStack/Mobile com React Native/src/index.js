import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, StatusBar, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App(){

    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(Response =>{
            setProjects(Response.data)
        });
    },[])

    async function handleAddProject(){
        const response = await api.post('projects', {
            title: `New Project ${Date.now()}`,
            owner: 'Keeven Oliveira'
        })

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
     <>   
        <StatusBar barStyle='light-content' backgroundColor='#7159c1'/>
        <SafeAreaView style={styles.containter}>
            <FlatList 
                data={projects}
                key={project => project.id}
                renderItem={({ item:project })=>(
                    <Text style={styles.title}>{project.title}{project.owner}</Text>
                )}
            />
            <TouchableOpacity activeOpacity={0.5} 
            style={styles.button} 
            onPress={handleAddProject}>

                <Text style={styles.buttonText}>Add project</Text>
            </TouchableOpacity>
        </SafeAreaView>
        {/* <View style={styles.containter}>
            {projects.map(project =><Text key={project.id} style={styles.title}>{project.title}{project.owner}</Text>)}
        </View> */}
    </>
    );

}

const styles = StyleSheet.create({
    containter: {
        flex:1,
        backgroundColor: '#7159c1',
    },
    title: {
        fontSize: 25,
        color:'white',
        fontWeight:'bold'
    },
    button:{
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 16,


    }
});