import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../constants/Colors';
import { getMovieDetails, getImageUrl } from '../api/tmdb';
import { Ionicons } from '@expo/vector-icons';
import MovieList from '../components/MovieList';
import SectionHeader from '../components/SectionHeader';
import { useFavorites } from '../context/FavoritesContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const MovieDetailsScreen = ({ route, navigation }) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            const data = await getMovieDetails(movieId);
            setMovie(data);
            setLoading(false);
        };

        fetchDetails();
    }, [movieId]);

    const toggleFavorite = () => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    const handleMoviePress = (item) => {
        navigation.push('MovieDetails', { movieId: item.id });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!movie) return null;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.posterContainer}>
                    <Image
                        source={{ uri: getImageUrl(movie.poster_path, 'original') }}
                        style={styles.poster}
                        contentFit="cover"
                    />
                    <LinearGradient
                        colors={['transparent', Colors.background]}
                        style={styles.gradient}
                    />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <TouchableOpacity onPress={toggleFavorite}>
                            <Ionicons
                                name={isFavorite(movie.id) ? 'heart' : 'heart-outline'}
                                size={28}
                                color={Colors.primary}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>{movie.release_date?.split('-')[0]}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.metaText}>{movie.runtime} min</Text>
                        <Text style={styles.dot}>•</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={14} color={Colors.star} />
                            <Text style={styles.rating}>{movie.vote_average?.toFixed(1)}</Text>
                        </View>
                    </View>

                    <View style={styles.genresRow}>
                        {movie.genres?.map((genre) => (
                            <View key={genre.id} style={styles.genreTag}>
                                <Text style={styles.genreText}>{genre.name}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.overview}>{movie.overview}</Text>

                    {movie.credits?.cast?.length > 0 && (
                        <View style={styles.section}>
                            <SectionHeader title="Cast" />
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.castList}>
                                {movie.credits.cast.slice(0, 10).map((actor) => (
                                    <View key={actor.id} style={styles.castItem}>
                                        <Image
                                            source={{ uri: getImageUrl(actor.profile_path, 'w185') }}
                                            style={styles.castImage}
                                            contentFit="cover"
                                        />
                                        <Text style={styles.castName} numberOfLines={2}>
                                            {actor.name}
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {movie.similar?.results?.length > 0 && (
                        <MovieList
                            title="Similar Movies"
                            movies={movie.similar.results}
                            onMoviePress={handleMoviePress}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    contentContainer: {
        paddingBottom: 40,
    },
    posterContainer: {
        height: height * 0.6,
        width: '100%',
    },
    poster: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 8,
    },
    detailsContainer: {
        padding: 20,
        marginTop: -20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    metaText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    dot: {
        color: Colors.textSecondary,
        marginHorizontal: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        color: Colors.star,
        marginLeft: 4,
        fontSize: 14,
        fontWeight: 'bold',
    },
    genresRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    genreTag: {
        backgroundColor: Colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    genreText: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    overview: {
        color: Colors.text,
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    castList: {
        paddingLeft: 16,
    },
    castItem: {
        marginRight: 16,
        width: 80,
        alignItems: 'center',
    },
    castImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
        backgroundColor: Colors.surface,
    },
    castName: {
        color: Colors.textSecondary,
        fontSize: 12,
        textAlign: 'center',
    },
});

export default MovieDetailsScreen;
