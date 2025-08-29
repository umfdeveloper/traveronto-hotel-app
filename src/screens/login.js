import React, {useState} from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableWithoutFeedback,
} from 'react-native';

import * as RootNavigation from '../navigation/RootNavigation';

import Input from '../components/login/Input';
import Button from '../components/login/Button';
import { loginWithEmail } from '../services/authService';
import { showErrorToast, showToast } from '../services/toast';
import { setSession } from '../services/session';

export default function Login() {
    const [passwordSecure, setPasswordSecure] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const trimmedEmail = (email || '').trim();
        const trimmedPassword = (password || '').trim();
        const emailValid = /\S+@\S+\.\S+/.test(trimmedEmail);
        if (!trimmedEmail || !emailValid) {
            showErrorToast('Please enter a valid email address');
            return false;
        }
        if (!trimmedPassword || trimmedPassword.length < 6) {
            showErrorToast('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const onLogin = async () => {
        // RootNavigation.navigate("main");

        if (!validate()) return;
        try {
            setLoading(true);
            const resp = await loginWithEmail({ email: email.trim(), password: password.trim() });
            const token = resp?.access_token || resp?.token || resp?.accessToken || null;
            // backend returns { status, access_token, token_type, expires_in, user, api_key }
            const userPayload = resp?.user || {};
            const apiKey = resp?.api_key;
            const user = { ...userPayload, api_key: apiKey };
            await setSession({ token, user });
            showToast('Logged in successfully');
            RootNavigation.navigate("main");
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
            <Text style={styles.title}>Traveronto</Text>
            <Text style={styles.subtitle}>More Deals, More Destinations, More Savings!</Text>
            <View style={styles.inputsContainer}>
                <Input
                    placeholder="Email Address"
                    leadingIcon={require("../../assets/login/mail.png")}
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={{height: 25}} />
                <Input
                    placeholder="Password"
                    secure={passwordSecure}
                    endingAction={()=>setPasswordSecure(!passwordSecure)}
                    leadingIcon={require("../../assets/login/key.png")}
                    endingIcon={require("../../assets/login/view.png")}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <Button title="Login to account" action={onLogin} loading={loading} disabled={loading} />
            <View style={styles.accountActions}>
                <TouchableWithoutFeedback onPress={()=>{}}>
                    <Text style={styles.accountActionText}>Forgot Password?</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=> RootNavigation.navigate('register')}>
                    <Text style={styles.accountActionText}>No Account Yet?</Text>
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
    },
    backgroundImage: {},
    formContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 9,
        paddingHorizontal: '8%',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 13,
        color: '#fff',
        textAlign: 'center',
    },
    inputsContainer: {
        paddingVertical: 30,
        width: '100%',
    },
    accountActions:{
        width: '100%',
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    accountActionText:{
        color: '#fff',
        fontSize: 13,
    },
});