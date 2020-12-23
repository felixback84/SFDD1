import React, { Component } from 'react'
// mui stuff
import Grid from '@material-ui/core/Grid';
// components
import Checkout from '../../components/user/Checkout';
import UserDeviceSkeleton from '../../utilities/UserDeviceSkeleton';
// Redux stuff
import { connect } from 'react-redux';
import { getAllCheckouts } from '../../redux/actions/checkoutsActions';

class buys extends Component {
    
    // redux action
    componentDidMount() {
        this.props.getAllCheckouts(); 
    }

    render() {

        // redux state
        const { checkouts, loading } = this.props;
        
        // checkouts markup
        let checkoutsMarkup = loading ? (
            checkouts.map(checkout => <Checkout key={checkout.checkoutId} checkout={checkout}/>)
        ) : (
            <UserDeviceSkeleton/>
        );
        return (
            <Grid container spacing={6}>
                <Grid item sm={12} xs={12}>
                    {checkoutsMarkup}
                </Grid>
            </Grid> 
        );
    }
}

//  redux state
const mapStateToProps = state => ({
    checkouts: state.checkouts1.checkouts,
    loading: state.ui.loading
})

export default connect(mapStateToProps, {getAllCheckouts})(buys);