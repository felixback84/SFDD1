import React from 'react'

export default function SwitchToMarckFromModeOneToModeTwo() {
    // state
    const [state, setState] = React.useState({
        checkedA: true,
    });

    // handle change of switchers
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <Switch
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
    )
}






