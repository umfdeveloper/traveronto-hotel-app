import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Search(props) {
    const {
        title,
        inputPlaceholder,
        value,
        onChangeText,
        onSubmit,
        onOpenDates,
        onOpenGuests,
        dateLabel,
        guestsLabel,
        suggestions =  [
            {
                "country": {"code": "PK", "name": "Pakistan", "updated_at": "2024-10-24T19:48:04.000000Z"}, 
                "country_code": "PK",
                "id": 9917, 
                "name": "Lahore, Pakistan", 
                "table": "location"
            }
        ],
        loading = false,
        onPickSuggestion,
    } = props;

    return <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.inputContainer}>
            <Icon name="search" color="#1a303d" size={20} />
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder={inputPlaceholder}
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    returnKeyType="search"
                    onSubmitEditing={onSubmit}
                />
            </View>
            {loading ? <ActivityIndicator color="#1a303d" /> : null}
        </View>
        {!suggestions?.length ? null : (
            <View style={styles.dropdown}>
                <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={suggestions}
                    keyExtractor={(_, idx) => `sugg-${idx}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => onPickSuggestion && onPickSuggestion(item)}>
                            <Text style={styles.dropdownTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    style={{ maxHeight: 180 }}
                />
            </View>
        )}
        <TouchableOpacity style={styles.box} onPress={onOpenDates}>
            <Icon name="calendar-alt" size={16} />
            <Text style={styles.boxText}>{dateLabel || 'Select dates'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onOpenGuests}>
            <Icon name="user" size={16} />
            <Text style={styles.boxText}>{guestsLabel || 'Guests, Rooms'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxPrimary} onPress={onSubmit}>
            <Icon name="search" color="#fff" size={16} />
            <Text style={styles.boxPrimaryText}>Search</Text>
        </TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: { height: '65%', justifyContent: 'center', alignItems: 'center' },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    inputContainer: { height: 45, width: '90%', marginTop: 20, borderRadius: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff' },
    inputWrapper: {
        width: '70%',
        marginLeft: 10,
    },
    input: {
        fontSize: 13,
        color: '#1a303d',
    },
    box: { width: '90%', height: 48, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', borderRadius: 8, marginTop: 12, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' },
    boxText: { marginLeft: 10, fontSize: 14 },
    boxPrimary: { color: '#fff', width: '90%', height: 48, borderRadius: 8, marginTop: 12, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(231, 78, 53)' },
    boxPrimaryText: { color: '#fff', marginLeft: 8, fontWeight: '700' },
    dropdown: { zIndex: 1000, position: 'absolute', top: 120, width: '90%', backgroundColor: '#f0f0f0', borderRadius: 8, elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
    dropdownItem: { paddingVertical: 10, paddingHorizontal: 12, borderBottomColor: '#eee', borderBottomWidth: 1 },
    dropdownTitle: { fontSize: 14, color: '#3b444f', fontWeight: '600', fontFamily: 'sans-serif' },
});