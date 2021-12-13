import React, {forwardRef} from 'react';
import {Textarea as RNTextarea} from "native-base";

import {Colors, Typography} from '../../theme';

const TextArea = forwardRef(({error, touched, ...otherProps}, ref) => {

    const validationColor = !touched ? Colors.SECONDARY_BORDER_COLOR : error ? Colors.PRIMARY_ERROR_COLOR : Colors.PRIMARY_BORDER_COLOR;

    return (
          <RNTextarea
                style={{
                    borderRadius: 9,
                    borderColor: validationColor,
                    borderWidth: 1,
                    height: 100,
                    backgroundColor: Colors.PRIMARY_INPUT_TEXT_BACKGROUND_COLOR,
                    textAlign: 'left',
                    fontSize: Typography.FONT_SIZE_MEDIUM,
                    fontFamily: Typography.FONT_NORMAL,
                    color: Colors.PRIMARY_INPUT_TEXT_COLOR,
                    marginBottom: 5,
                }}
                ref={ref}
                {...otherProps}
            />
    );
});

export default TextArea;
