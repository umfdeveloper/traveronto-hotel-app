import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import * as RootNavigation from '../navigation/RootNavigation';

import Input from '../components/login/Input';
import Button from '../components/login/Button';
import { registerWithEmail } from '../services/authService';
import { showErrorToast, showToast } from '../services/toast';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onRegister = async () => {
        const trimmedFirstName = (firstName || '').trim();
        const trimmedLastName = (lastName || '').trim();
        const trimmedEmail = (email || '').trim();
        const trimmedPassword = (password || '').trim();
        const emailValid = /\S+@\S+\.\S+/.test(trimmedEmail);

        if (!trimmedFirstName || trimmedFirstName.length < 2) {
            showErrorToast('Please enter your first name');
            return;
        }
        if (!trimmedLastName || trimmedLastName.length < 2) {
            showErrorToast('Please enter your last name');
            return;
        }
        if (!trimmedEmail || !emailValid) {
            showErrorToast('Please enter a valid email address');
            return;
        }
        if (!trimmedPassword || trimmedPassword.length < 6) {
            showErrorToast('Password must be at least 6 characters');
            return;
        }

        try {
            setLoading(true);
            await registerWithEmail({ first_name: trimmedFirstName, last_name: trimmedLastName, email: trimmedEmail, password: trimmedPassword, term: true });
            showToast('Account created successfully');
            // RootNavigation.navigate('login');
        } catch (err) {
            showErrorToast(err);
        } finally {
            setLoading(false);
        }
    };

    return <View style={styles.container}>
         <Image
            resizeMode="cover"
            style={styles.backgroundImage}
            blurRadius={2}
            source={require('../../assets/login/background.jpg')}
        />
        <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.inputsContainer}>
                <Input placeholder="First Name" onChangeText={setFirstName} value={firstName} />
                <View style={{height: 20}} />
                <Input placeholder="Last Name" onChangeText={setLastName} value={lastName} />
                <View style={{height: 20}} />
                <Input placeholder="Email Address" onChangeText={setEmail} value={email} />
                <View style={{height: 20}} />
                <Input placeholder="Password" secure onChangeText={setPassword} value={password} />
            </View>
            <Button title="Register" action={onRegister} loading={loading} disabled={loading} />
            <View style={styles.accountActions}>
                <TouchableWithoutFeedback onPress={()=> RootNavigation.navigate('login')}>
                    <Text style={styles.accountActionText}>Already have an account? Login</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#1a303d'
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingHorizontal: '8%',
    },
    title: {
        fontSize: 33,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    inputsContainer: {
        paddingVertical: 30,
        width: '100%',
    },
    accountActions:{
        width: '100%',
        marginTop: 25,
        alignItems: 'center'
    },
    accountActionText:{
        color: '#fff',
        fontSize: 13,
    },
});

