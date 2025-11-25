import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import { getTrendingMovies, getTopRatedMovies, getUpcomingMovies } from '../api/tmdb';
import MovieList from '../components/MovieList';
import SectionHeader from '../components/SectionHeader';

const HomeScreen = ({ navigation }) => {
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendingData, topRatedData, upcomingData] = await Promise.all([
                    getTrendingMovies(),
                    getTopRatedMovies(),
                    getUpcomingMovies(),
                ]);
                setTrending(trendingData);
                setTopRated(topRatedData);
                setUpcoming(upcomingData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleMoviePress = (movie) => {
        navigation.navigate('MovieDetails', { movieId: movie.id });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <SectionHeader title="CineSuggest" />
                </View>

                <MovieList title="Trending Now" movies={trending} onMoviePress={handleMoviePress} />
                <MovieList title="Top Rated" movies={topRated} onMoviePress={handleMoviePress} />
                <MovieList title="Upcoming" movies={upcoming} onMoviePress={handleMoviePress} />
                <View style={styles.spacer} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    header: {
        marginTop: 10,
    },
    spacer: {
        height: 20,
    },
});

export default HomeScreen;
