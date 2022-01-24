import React from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

const SearchBar = (props) => {

    const {searchEventsByIdentifier} = props;
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => {
        setSearchQuery(query);
        searchEventsByIdentifier({s: query});
    };

    const onCleanSearch = () => {
        searchEventsByIdentifier({s: ''});
    };

    return (
        <Searchbar
            style={styles.searchBox}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={onCleanSearch}
        />
    );
};

const styles = StyleSheet.create({
    searchBox: {
        marginTop: 25,
        marginBottom: 15,
        width: '95%',
        paddingHorizontal: 0,
        borderRadius: 15,
    },
});

export default SearchBar;
