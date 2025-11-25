import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../constants/Colors';
import { getImageUrl } from '../api/tmdb';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.35;

const MovieCard = ({ movie, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={() => onPress(movie)}>
            <Image
                source={{ uri: getImageUrl(movie.poster_path) }}
                style={styles.poster}
                contentFit="cover"
                transition={500}
            />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                    {movie.title}
                </Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color={Colors.star} />
                    <Text style={styles.rating}>{movie.vote_average?.toFixed(1)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        marginRight: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        height: CARD_WIDTH * 1.5,
        borderRadius: 8,
        backgroundColor: Colors.surface,
    },
    info: {
        marginTop: 8,
    },
    title: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    rating: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginLeft: 4,
    },
});

export default MovieCard;
