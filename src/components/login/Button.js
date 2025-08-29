import React from 'react';
import { Text, TouchableHighlight, StyleSheet, ActivityIndicator } from 'react-native';

export default function Button(props) {
    const {title, action, loading = false, disabled = false} = props;
    const isDisabled = disabled || loading;

    return <TouchableHighlight 
        onPress={action}
        style={[styles.container, isDisabled ? styles.disabled : {}]}
        underlayColor="rgba(0, 0, 0, 0.7)"
        disabled={isDisabled}
    >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableHighlight>
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    disabled:{
        opacity: 0.7,
    },
    text:{
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
    },
});