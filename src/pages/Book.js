import React, { useState } from 'react'
import { Text, StyleSheet, SafeAreaView, Platform, AsyncStorage, TextInput, TouchableOpacity, Alert } from 'react-native'
import api from "../services/api";
export default function Book({ navigation }) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
       const result = await api.post(`/spots/${id}/bookings`,{
            date
        },{
            headers:{
                user_id
            }
        })
        Alert.alert('Solicitação de reserva enviada')
        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }
    return (
        <SafeAreaView style={styles.safeArea} >
            <Text style={styles.label}>Data de interesse *</Text>
            <TextInput
                style={styles.input}
                placeholder="Data de interesse"
                placeholderTextColor="#999"
                autoCapitalize="none"
                onChangeText={setDate}
                autoCorrect={false}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText} >Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText} >Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        margin: 30
    },
    label: {
        margin:  Platform.OS === 'android' ? 0 : 30,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        paddingVertical: 4,
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
    cancelButton:{
        marginTop: 10,
        backgroundColor: '#ccc'
    }
})