import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function RatingStars({
  rating = 0,
  maxStars = 5,
  starSize = 14,
  fullStarColor = '#dbb16c',
  emptyStarColor = '#6a6751',
}) {
  const rounded = Math.round(Number(rating) || 0);

  return <View style={{ flexDirection: 'row' }}>
    {Array.from({ length: maxStars }).map((_, index) => {
      const isFilled = index < rounded;
      return (
        <FontAwesome
          key={index}
          name={isFilled ? 'star' : 'star-o'}
          size={starSize}
          color={isFilled ? fullStarColor : emptyStarColor}
        />
      );
    })}
  </View>;
}

