import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('@favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const addFavorite = async (movie) => {
        try {
            const newFavorites = [...favorites, movie];
            setFavorites(newFavorites);
            await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    const removeFavorite = async (movieId) => {
        try {
            const newFavorites = favorites.filter((movie) => movie.id !== movieId);
            setFavorites(newFavorites);
            await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
