import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Input from '../../components/login/Input';
import Button from '../../components/login/Button';
import { getUser, setSession } from '../../services/session';
import { updateProfile } from '../../services/authService';
import { showErrorToast, showToast } from '../../services/toast';

export default function Account() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const u = await getUser();
            if (u) {
                setFirstName(u.first_name || u.firstName || '');
                setLastName(u.last_name || u.lastName || '');
                setEmail(u.email || '');
                setAvatar(u.avatar || u.image || u.avatar_url || '');
            }
        })();
    }, []);

    const onSave = async () => {
        const trimmedFirst = (firstName || '').trim();
        const trimmedLast = (lastName || '').trim();
        if (!trimmedFirst || trimmedFirst.length < 2) {
            showErrorToast('Please enter your first name');
            return;
        }
        if (!trimmedLast || trimmedLast.length < 2) {
            showErrorToast('Please enter your last name');
            return;
        }
        try {
            setLoading(true);
            const resp = await updateProfile({ first_name: trimmedFirst, last_name: trimmedLast, avatar: avatar || null });
            const updatedUser = resp?.data?.user || resp?.user || { first_name: trimmedFirst, last_name: trimmedLast, email, avatar };
            await setSession({ user: updatedUser });
            showToast('Profile updated');
        } catch (err) {
            showErrorToast(err);
        } finally {
            setLoading(false);
        }
    };

    const avatarSource = avatar ? { uri: avatar } : require('../../../assets/home/avatar.png');

    return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}> 
            <Image source={avatarSource} style={styles.avatar} />
            <Text style={styles.title}>My Account</Text>
        </View>
        <View style={styles.form}> 
            <Input placeholder="First Name" value={firstName} onChangeText={setFirstName} />
            <View style={{ height: 15 }} />
            <Input placeholder="Last Name" value={lastName} onChangeText={setLastName} />
            <View style={{ height: 15 }} />
            <Input placeholder="Avatar URL" value={avatar} onChangeText={setAvatar} />
            <View style={{ height: 15 }} />
            <Input placeholder="Email" value={email} editable={false} />
            <View style={{ height: 25 }} />
            <Button title="Save" action={onSave} loading={loading} disabled={loading} />
        </View>
    </ScrollView>;
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 20 },
    header: { alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
    avatar: { width: 100, height: 100, borderRadius: 60 },
    form: { marginTop: 10 },
});