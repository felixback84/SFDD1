import React, { useState } from 'react';
import { SliderPicker } from 'react-color';

function ColorPickerForHildaUI (props){
    // hooks state
    const [color, setColor] = useState('#fff');
    
    return(
            <SliderPicker 
                color={color}
                onChange={updatedColor => setColor(updatedColor)}
            />
    )
}

export default ColorPickerForHildaUI;