import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';

import TopBar from '../components/home/TopBar';
import Search from '../components/home/search';
import Background from '../components/home/Background';
import Bookings from '../components/home/bookings/index';

import * as RootNavigation from '../navigation/RootNavigation';
import { getUser } from '../services/session';
import { searchLocations } from '../services/locationService';
import { showErrorToast } from '../services/toast';
import DateRangeModal from '../components/home/DateRangeModal';
import GuestsRoomsModal from '../components/home/GuestsRoomsModal';

const {height} = Dimensions.get('screen');

const bookings = [
    {
        title: "Grand Luxury",
        image: require("../../assets/home/bookings/booking-1.png"),
        tag: "Featured",
        members: 500,
        rating: 3,
    },
    {
        title:"Otman Hall",
        image: require("../../assets/home/bookings/booking-2.png"),
        tag: "New",
        members: 200,
        rating: 4,
    },
    {
        title: "Grand Luxury",
        image: require("../../assets/home/bookings/booking-1.png"),
        tag: "Featured",
        members: 500,
        rating: 3,
    },
    {
        title:"Otman Hall",
        image: require("../../assets/home/bookings/booking-2.png"),
        tag: "New",
        members: 200,
        rating: 4,
    },
];

const bookingTabs = [
    { key: 'popular', title: 'Popular' },
    { key: 'top_rated', title: 'Top rated' },
    { key: 'best_price', title: 'Best price' },
    { key: 'best_choice', title: 'Best for you' },
];

export default function Home() {
    const [profileImageSource, setProfileImageSource] = useState(require('../../assets/home/avatar.png'));
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);
    const [rooms, setRooms] = useState(1);
    const debounceRef = useRef(null);
    const [showDates, setShowDates] = useState(false);
    const [showGuests, setShowGuests] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await getUser();
            const avatar = user?.avatar || user?.image || user?.avatar_url;
            if (avatar && typeof avatar === 'string') {
                setProfileImageSource({ uri: avatar });
            }
        })();
    }, []);

    const onSubmitSearch = async () => {
        if (!query || query.trim().length < 2) return;
        try {
            setLoading(true);
            const resp = await searchLocations(query.trim());
            const data = Array.isArray(resp) ? resp : resp?.data || [];
            setSuggestions(data);
        } catch (err) {
            showErrorToast(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!query) { setSuggestions([]); return; }
        debounceRef.current = setTimeout(onSubmitSearch, 1000);
        return () => debounceRef.current && clearTimeout(debounceRef.current);
    }, [query]);

    return <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        <View style={styles.homeHeader}>
            <Background image={require('../../assets/home/header-bg.png')} />
            <View style={styles.headerWrapper}>
                <TopBar 
                    // menuIcon="bars"
                    profileImage={profileImageSource}
                    profileAction={()=>RootNavigation.navigate('account')}
                />
                <Search
                    title="Search your desire hotel"
                    inputPlaceholder="Search the hotel, motel and club"
                    value={query}
                    onChangeText={setQuery}
                    onSubmit={onSubmitSearch}
                    onOpenDates={()=> setShowDates(true)}
                    onOpenGuests={()=> setShowGuests(true)}
                    dateLabel={checkIn && checkOut ? `${checkIn} - ${checkOut}` : 'Select Date'}
                    guestsLabel={`${guests} Adults, ${rooms} Room${rooms>1?'s':''}`}
                />
            </View>
        </View>

        <Bookings data={bookings} tabs={bookingTabs} />
        <DateRangeModal
            visible={showDates}
            onClose={()=> setShowDates(false)}
            onApply={({ checkIn: ci, checkOut: co })=> { setCheckIn(ci); setCheckOut(co); }}
            initialCheckIn={checkIn}
            initialCheckOut={checkOut}
        />
        <GuestsRoomsModal
            visible={showGuests}
            onClose={()=> setShowGuests(false)}
            onApply={({ rooms: roomDefs, totals })=> {
                setRooms(roomDefs.length);
                setGuests(totals.guests);
            }}
        />
    </ScrollView>;
}

const styles = StyleSheet.create({
    homeHeader: {
        height: height/2,
    },
    headerWrapper: {
        zIndex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    suggestions:{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 },
    suggestionItem:{ paddingVertical: 10, borderBottomColor: '#eee', borderBottomWidth: 1 },
    suggestionTitle:{ fontSize: 15, color: '#1a303d', fontWeight: '600' },
    suggestionSub:{ fontSize: 12, color: '#5a7483' },
});