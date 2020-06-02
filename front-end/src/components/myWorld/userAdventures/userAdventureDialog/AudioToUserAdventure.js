import React from 'react'
// soundcloud

// Redux stuff
import { connect } from 'react-redux';


const AudioToUserAdventure = (props) => {
    const {
            userAdventure:{
            adventure:{
                audioUrl
            }
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
    userAdventure: state.userAdventures1.userAdventure
    
})

export default connect(mapStateToProps)(AudioToUserAdventure);
