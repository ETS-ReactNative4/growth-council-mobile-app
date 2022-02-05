import React from 'react';
import { State } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import SelfLearn from './component';
import { fetchSelfLearnById, resetSelfLearnById } from './slice/selfLearnByIdSlice';


const SelfLearnDetailScreen = props => {

    const dispatch = useDispatch();
	const {selfLearns, selfLearnLoading,selfLearnError} = useSelector((state) => state.selfLearns);

	const fetchPoeSelfLearnById = selfLearnId =>{
		dispatch(fetchSelfLearnById(selfLearnId));
	}

	const cleanSelfLearnById =()=>{
		dispatch(resetSelfLearnById());
	};

    return (
        <SelfLearn
            {...props}
			selfLearns={selfLearns}
			selfLearnLoading={selfLearnLoading}
			selfLearnError={selfLearnError}
			fetchPoeSelfLearnById={fetchPoeSelfLearnById}
			cleanSelfLearnById={cleanSelfLearnById}
        />
    )
};

export default SelfLearnDetailScreen;