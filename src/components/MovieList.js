import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SectionHeader from './SectionHeader';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies, onMoviePress }) => {
    if (!movies || movies.length === 0) return null;

    return (
        <View style={styles.container}>
            <SectionHeader title={title} />
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard movie={item} onPress={onMoviePress} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                snapToInterval={null}
                decelerationRate="fast"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    listContent: {
        paddingHorizontal: 16,
    },
});

export default MovieList;
