import React, { Component } from 'react';
// mui stuff
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// components
import ContentToDialogDevice from './ContentToDialogDevice';
import CarrouselOfImagesDevice from './CarrouselOfImagesDevice';
import CardOfAdventuresForDevice from './CardOfAdventuresForDevice';

// Redux stuff
import { connect } from 'react-redux';

class ChekerContentToDialogUserAdventure extends Component {
    render(){
        const {
            loading,
            nameofdevice,
            adventures
        } = this.props;

        let adventuresMarkup = adventures.map(adventure => 
            <CardOfAdventuresForDevice key={adventure.adventureId} adventure={adventure}/>)

        return(
            loading ? (
                <CircularProgress size={20}/>
                ) : (
                    <Grid container spacing={1} 
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >   
                        <CarrouselOfImagesDevice />
                        <ContentToDialogDevice />
                        {adventuresMarkup}
                    </Grid>
                )
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.devices1.loading,
    adventures:state.adventures1.adventures
    
})

export default connect(mapStateToProps)(ChekerContentToDialogUserAdventure);
