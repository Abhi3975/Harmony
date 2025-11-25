import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../constants/Colors';
import { useFavorites } from '../context/FavoritesContext';
import { getImageUrl } from '../api/tmdb';
import { Ionicons } from '@expo/vector-icons';
import SectionHeader from '../components/SectionHeader';

const FavoritesScreen = ({ navigation }) => {
    const { favorites, removeFavorite } = useFavorites();

    const handleMoviePress = (movie) => {
        navigation.navigate('MovieDetails', { movieId: movie.id });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleMoviePress(item)}>
            <Image
                source={{ uri: getImageUrl(item.poster_path, 'w185') }}
                style={styles.poster}
                contentFit="cover"
            />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color={Colors.star} />
                    <Text style={styles.rating}>{item.vote_average?.toFixed(1)}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFavorite(item.id)}
            >
                <Ionicons name="trash-outline" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <SectionHeader title="My Favorites" />
            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-dislike-outline" size={64} color={Colors.textSecondary} />
                    <Text style={styles.emptyText}>No favorites yet</Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    numColumns={2}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    listContent: {
        padding: 8,
    },
    itemContainer: {
        flex: 1,
        margin: 8,
        backgroundColor: Colors.surface,
        borderRadius: 8,
        overflow: 'hidden',
        maxWidth: '46%', // For 2 columns
    },
    poster: {
        width: '100%',
        height: 200,
    },
    info: {
        padding: 8,
    },
    title: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginLeft: 4,
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
        padding: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: Colors.textSecondary,
        marginTop: 16,
        fontSize: 16,
    },
});

export default FavoritesScreen;
