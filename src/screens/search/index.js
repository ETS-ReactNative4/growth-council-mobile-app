import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Search from './components';
import {searchEventsByKey, resetSearch} from './searchSlice';

const SearchScreen = (props) => {

    const dispatch = useDispatch();

    const {searches, searchLoading, searchError} = useSelector((state) => state.searches);

    /**
     * Search events by key.
     * @param {object} formData
     *
     */
    const searchEventsByIdentifier = formData => {
        return dispatch(searchEventsByKey(formData));
    };

    const cleanSearch = () => {
        dispatch(resetSearch());
    };

    return (
        <Search
            {...props}
            searches={searches}
            searchLoading={searchLoading}
            searchError={searchError}
            searchEventsByIdentifier={searchEventsByIdentifier}
            cleanSearch={cleanSearch}
        />
    );
};

export default SearchScreen;
