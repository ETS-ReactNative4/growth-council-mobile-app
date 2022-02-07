import React,{useEffect} from 'react';
import { State } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import SelfLearn from './component';
import { fetchSelfLearnById, resetSelfLearnById } from './slice/selfLearnByIdSlice';
import {fetchAllTraits, resetTraits} from '../coachingSession/slice/sessionTraitsSlice';


const SelfLearnDetailScreen = props => {

    const dispatch = useDispatch();
	const {selfLearns, selfLearnLoading,selfLearnError} = useSelector((state) => state.selfLearns);
	const {traits, traitsLoading, traitsError} = useSelector(
		state => state.traits,
	  );

	  useEffect(() => {
		fetchAllTraitBySessionId(selfLearns.ID);
		return () => {
		  cleanTraits();
		};
	  }, [selfLearns]);
	
	  const fetchAllTraitBySessionId = sessionId => {
		dispatch(fetchAllTraits(sessionId));
	  };
	
	  const cleanTraits = () => {
		dispatch(resetTraits());
	  };

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

			traits={traits}
      traitsLoading={traitsLoading}
      traitsError={traitsError}
      fetchAllTraits={fetchAllTraits}
      cleanTraits={cleanTraits}
        />
    )
};

export default SelfLearnDetailScreen;