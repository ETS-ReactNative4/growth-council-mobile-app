import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Search from './components';

const SearchScreen = (props) => {

    const dispatch = useDispatch();

    return (
        <Search
            {...props}
        />
    );
};

export default SearchScreen;
