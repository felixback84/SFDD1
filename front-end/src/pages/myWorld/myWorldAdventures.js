import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

// Proptypes
import PropTypes from 'prop-types'; 

// Components
import UserAdventure from '../../components/myWorld/userAdventures/UserAdventure';
import UserDeviceSkeleton from '../../utilities/UserDeviceSkeleton';

// Redux stuff
import { connect } from 'react-redux';
import { getUserAdventures } from '../../redux/actions/userAdventuresActions';

class myWorldAdventures extends Component {

    componentDidMount() {
        this.props.getUserAdventures();
    } 

    render() {
        const { userAdventures, loading } = this.props;
        
        let userAdventuresMarkup = !loading ? (
            userAdventures.map(userAdventure => 
            <UserAdventure key={userAdventure.userAdventureId} userAdventure={userAdventure}/>)
        ) : (
            <UserDeviceSkeleton/>
        );
        return (
            <Grid container spacing={6}>
                <Grid item sm={12} xs={12}>
                    {userAdventuresMarkup}
                </Grid>
            </Grid> 
        );
    } 
}

// myWorldDevices.propTypes = {
//     user: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
    userAdventures: state.userAdventures1.userAdventures,
    loading: state.userAdventures1.loading
})

export default connect(mapStateToProps, {getUserAdventures})(myWorldAdventures);
