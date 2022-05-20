import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Terms from './component/index';



const TermScreen = props => {
  const dispatch = useDispatch();


  return (
    <Terms
      {...props}
     
    />
  );
};

export default TermScreen;
