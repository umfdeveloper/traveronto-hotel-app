import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Input from '../login/Input';

export default function DateRangeModal({ visible, onClose, onApply, initialCheckIn, initialCheckOut }) {
    const [localIn, setLocalIn] = useState(initialCheckIn || '');
    const [localOut, setLocalOut] = useState(initialCheckOut || '');

    const apply = () => {
        onApply && onApply({ checkIn: localIn, checkOut: localOut });
        onClose && onClose();
    };

    return <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
        <View style={styles.backdrop}>
            <View style={styles.card}>
                <Text style={styles.title}>Select Date</Text>
                <View style={{ height: 8 }} />
                <Input placeholder="Check-in (YYYY-MM-DD)" value={localIn} onChangeText={setLocalIn} />
                <View style={{ height: 10 }} />
                <Input placeholder="Check-out (YYYY-MM-DD)" value={localOut} onChangeText={setLocalOut} />
                <View style={{ height: 16 }} />
                <TouchableOpacity style={styles.btn} onPress={apply}><Text style={styles.btnText}>Apply</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.cancel]} onPress={onClose}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
            </View>
        </View>
    </Modal>;
}

const styles = StyleSheet.create({
    backdrop:{ flex:1, backgroundColor:'rgba(0,0,0,0.4)', justifyContent:'center', alignItems:'center' },
    card:{ width:'86%', backgroundColor:'#fff', borderRadius:10, padding:16 },
    title:{ fontSize:16, fontWeight:'700', color:'#1a303d' },
    btn:{ backgroundColor:'#1a303d', paddingVertical:12, borderRadius:8, alignItems:'center', marginTop:8 },
    btnText:{ color:'#fff', fontWeight:'600' },
    cancel:{ backgroundColor:'transparent', borderWidth:1, borderColor:'#1a303d' },
    cancelText:{ color:'#1a303d', fontWeight:'600' },
});

