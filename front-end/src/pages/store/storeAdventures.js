import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

// Proptypes
import PropTypes from 'prop-types'; 

// Components
import Adventure from '../../components/store/adventures/Adventure';
import UserDeviceSkeleton from '../../utilities/UserDeviceSkeleton';
 
// Redux stuff
import { connect } from 'react-redux';
import { getAdventures } from '../../redux/actions/adventuresActions';

class storeAdventures extends Component {
    
    componentDidMount() {
        this.props.getAdventures(); 
    }

    render() {
        const { adventures, loading } = this.props.adventures1;

        let AdventuresMarkup = !loading ? (
            adventures.map(adventure => <Adventure key={adventure.adventureId} adventure={adventure}/>)
        ) : (
            <UserDeviceSkeleton/>
        );

        return (
            <Grid container spacing={6}>
                <Grid item sm={12} xs={12}>
                    {AdventuresMarkup}
                </Grid>
            </Grid> 
        );
        
    }
}

const mapStateToProps = state => ({
    adventures1: state.adventures1
})

export default connect(mapStateToProps, {getAdventures})(storeAdventures);