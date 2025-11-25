import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../constants/Colors';
import SearchBar from '../components/SearchBar';
import { searchMovies, getImageUrl } from '../api/tmdb';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 2) {
                performSearch(query);
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const performSearch = async (text) => {
        setLoading(true);
        const data = await searchMovies(text);
        setResults(data);
        setLoading(false);
    };

    const handleMoviePress = (movie) => {
        navigation.navigate('MovieDetails', { movieId: movie.id });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.resultItem} onPress={() => handleMoviePress(item)}>
            <Image
                source={{ uri: getImageUrl(item.poster_path, 'w185') }}
                style={styles.poster}
                contentFit="cover"
            />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.year}>
                    {item.release_date ? item.release_date.split('-')[0] : 'N/A'}
                </Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color={Colors.star} />
                    <Text style={styles.rating}>{item.vote_average?.toFixed(1)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <SearchBar value={query} onChangeText={setQuery} />
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={Colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        query.length > 2 ? (
                            <Text style={styles.emptyText}>No movies found</Text>
                        ) : (
                            <Text style={styles.emptyText}>Search for movies...</Text>
                        )
                    }
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
    header: {
        paddingTop: 10,
    },
    listContent: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultItem: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: Colors.surface,
        borderRadius: 8,
        overflow: 'hidden',
    },
    poster: {
        width: 80,
        height: 120,
    },
    info: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    title: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    year: {
        color: Colors.textSecondary,
        fontSize: 14,
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
    emptyText: {
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
});

export default SearchScreen;
