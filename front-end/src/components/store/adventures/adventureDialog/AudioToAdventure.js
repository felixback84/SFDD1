import React from 'react'
// soundcloud

// Redux stuff
import { connect } from 'react-redux';


const AudioToAdventure = (props) => {
    const {
        adventure:{
            audioUrl
        }
    } = props;
    
    return (
        <iframe 
            width="100%" 
            height="300" 
            scrolling="no" 
            frameborder="no" 
            allow="autoplay" 
            src={audioUrl}
        />
    )
}

const mapStateToProps = (state) => ({
    adventure: state.adventures1.adventure
    
})
export default connect(mapStateToProps)(AudioToAdventure);
