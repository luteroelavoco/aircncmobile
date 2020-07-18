import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, AsyncStorage, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import logo from "../assets/logo.png"
import SpotList from "../components/SpotList";

export default function List({ navigation }) {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim()).filter(tech => tech.trim() != "");
            setTechs(techsArray);
        })
    }, [])

    async function handleLogin() {
        await AsyncStorage.clear();
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity onPress={handleLogin}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
       paddingBottom: 20
    },
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        marginTop: 32,
        alignSelf: 'center',

    }
})