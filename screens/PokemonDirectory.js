import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

const pokePath = 'https://pokeapi.co/api/v2/';
const pokeQuery = 'pokemon?limit=151&offset=0';
const firstGenPokemonPath = `${pokePath}${pokeQuery}`;

//First Call Pokemon IDs => 151 = 152 calls to the API

const PokemonDirectory = () => {
    const [firstGenPokemonDetails, setfirstGenPokemonDetails] = useState([]);

    useEffect(() => {
        const fetchFirstGenPokemons = async () => {
            const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
            const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();

            const firstGenPokemonDetails = await Promise.all(
                firstGenPokemonIdsBody.results.map(async (p) => {
                    const pDetails = await fetch(p.url);
                    return pDetails.json();
                })
            );

            setfirstGenPokemonDetails(firstGenPokemonDetails);
        };

        fetchFirstGenPokemons();
    }, []);

    const renderPokemon = ({ item }) => {
        return (
            <View>
                <Text style={styles.pokemonContainer}>{
                    item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={{
                        uri: item.sprites.front_default,
                    }}
                />
            </View>
        )
    }
};

export default PokemonDirectory;