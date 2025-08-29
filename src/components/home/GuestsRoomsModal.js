import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

function Counter({ label, value, onChange }) {
    return <View style={styles.counterRow}>
        <Text style={styles.counterLabel}>{label}</Text>
        <View style={styles.counterControls}>
            <TouchableOpacity style={styles.counterBtn} onPress={() => onChange(Math.max(0, value - 1))}><Text style={styles.counterBtnText}>-</Text></TouchableOpacity>
            <Text style={styles.counterValue}>{value}</Text>
            <TouchableOpacity style={styles.counterBtn} onPress={() => onChange(value + 1)}><Text style={styles.counterBtnText}>+</Text></TouchableOpacity>
        </View>
    </View>;
}

export default function GuestsRoomsModal({ visible, onClose, onApply, initialRooms = [{ adults: 2, children: 0 }] }) {
    const [rooms, setRooms] = useState(initialRooms);

    const addRoom = () => setRooms([...rooms, { adults: 2, children: 0 }]);
    const setRoom = (idx, field, val) => {
        const copy = rooms.slice();
        copy[idx] = { ...copy[idx], [field]: val };
        setRooms(copy);
    };

    const totals = rooms.reduce((acc, r) => ({ guests: acc.guests + r.adults + r.children, rooms: acc.rooms + 1 }), { guests: 0, rooms: 0 });

    const apply = () => {
        onApply && onApply({ rooms, totals });
        onClose && onClose();
    };

    return <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
        <View style={styles.backdrop}>
            <View style={styles.card}>
                <Text style={styles.title}>Select Travelers</Text>
                <FlatList
                    data={rooms}
                    keyExtractor={(_, idx) => `room-${idx}`}
                    renderItem={({ item, index }) => (
                        <View style={styles.roomCard}>
                            <Text style={styles.roomTitle}>Room {index + 1}</Text>
                            <Counter label="Adults (12+)" value={item.adults} onChange={(v) => setRoom(index, 'adults', v)} />
                            <Counter label="Children (2–12)" value={item.children} onChange={(v) => setRoom(index, 'children', v)} />
                        </View>
                    )}
                    ListFooterComponent={<TouchableOpacity onPress={addRoom} style={styles.addRoom}><Text style={styles.addRoomText}>+ Add another Room</Text></TouchableOpacity>}
                />
                <TouchableOpacity style={styles.btn} onPress={apply}><Text style={styles.btnText}>Done</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.cancel]} onPress={onClose}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
            </View>
        </View>
    </Modal>;
}

const styles = StyleSheet.create({
    backdrop:{ flex:1, backgroundColor:'rgba(0,0,0,0.4)', justifyContent:'center', alignItems:'center' },
    card:{ width:'90%', maxHeight:'80%', backgroundColor:'#fff', borderRadius:10, padding:16 },
    title:{ fontSize:16, fontWeight:'700', color:'#1a303d', marginBottom:8 },
    roomCard:{ borderWidth:1, borderColor:'#eee', borderRadius:8, padding:12, marginBottom:10 },
    roomTitle:{ fontWeight:'700', marginBottom:8, color:'#1a303d' },
    counterRow:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:6 },
    counterLabel:{ color:'#1a303d' },
    counterControls:{ flexDirection:'row', alignItems:'center' },
    counterBtn:{ width:28, height:28, borderRadius:14, backgroundColor:'#e8eef1', alignItems:'center', justifyContent:'center' },
    counterBtnText:{ color:'#1a303d', fontSize:16, fontWeight:'700' },
    counterValue:{ marginHorizontal:10, width:22, textAlign:'center', color:'#1a303d' },
    addRoom:{ paddingVertical:10, alignItems:'center' },
    addRoomText:{ color:'#1a303d', fontWeight:'600' },
    btn:{ backgroundColor:'#1a303d', paddingVertical:12, borderRadius:8, alignItems:'center', marginTop:8 },
    btnText:{ color:'#fff', fontWeight:'600' },
    cancel:{ backgroundColor:'transparent', borderWidth:1, borderColor:'#1a303d' },
    cancelText:{ color:'#1a303d', fontWeight:'600' },
});

