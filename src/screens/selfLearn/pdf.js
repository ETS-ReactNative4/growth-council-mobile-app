import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PDF from './component/pdf';


const PDFDetailScreen = props => {

    const dispatch = useDispatch();

    return (
        <PDF
            {...props}
        />
    )
};

export default PDFDetailScreen;