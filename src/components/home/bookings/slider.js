import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';

import * as RootNavigation from '../../../navigation/RootNavigation';

import Booking from './booking';

export default function Slider(props) {
    const {items} = props;
    const [activeIndex, setActiveIndex] = useState(0);

    return <View style={styles.container}>
        <View style={styles.wrapper}>
            <Carousel
                width={250}
                height={370}
                data={items}
                renderItem={(itemProp) => <Booking {...itemProp} onTap={()=> RootNavigation.navigate("booking")} />}
                onSnapToItem={(index) => setActiveIndex(index)}
                loop={false}
            />
        </View>
    </View>;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        flexDirection:'row',
    },
});