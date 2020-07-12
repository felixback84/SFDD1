import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { postCommentAdventure } from '../../../../redux/actions/adventuresActions';

const styles = (theme) => ({
    ...theme.notColor
});

class CommentFormToDialogAdventure extends Component {
    state= {
        bodyComment: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({ bodyComment: '' });
        }
    }
    
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postCommentAdventure(this.props.adventureid, { bodyComment: this.state.bodyComment });
    };

    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;
        
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="bodyComment"
                        type="text"
                        label="Comment on scream"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null
        return commentFormMarkup;
    }
}

const mapStateToProps = (state) => ({ 
    ui: state.ui,
    authenticated: state.user.authenticated
});

export default connect(
    mapStateToProps,
    { postCommentAdventure }
)(withStyles(styles)(CommentFormToDialogAdventure));