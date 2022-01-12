import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Detail from './components/Detail';

import {fetchAllDetails, resetDetail} from './slice/detailSlice';

const DetailScreen = props => {
    const dispatch = useDispatch();

    const {details, detailLoading, detailError} = useSelector(state => state.details);

    const fetchAllDetail = () => {
        dispatch(fetchAllDetails());
    };

    /**
     * Clear pillar slider data.
     *
     */
    const cleanDetail = () => {
        dispatch(resetDetail());
    };

    return (
        <Detail
            {...props}
            details={details}
            detailLoading={detailLoading}
            detailError={detailError}
            fetchAllDetail={fetchAllDetail}
            cleanDetail={cleanDetail}
        />
    );
};

export default DetailScreen;
