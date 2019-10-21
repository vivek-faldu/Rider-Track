import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authenticationAction';


class Logout extends Component {
    
    handleLogout = (event) => {
        event.preventDefault();

        this.props.logoutUser();
    }

    render() {
        return (
          <Button
            className="menu_button" 
            color="inherit" 
            onClick={this.handleLogout}
          >
              Logout
          </Button>
        );
    }
}

Logout.PropTypes = {
    logoutUser: PropTypes.func.isRequired,
};

const mapState = (state) => ({
    authentication: state.authentication,
    errors: state.errors
});

export default connect(
    mapState,
    { logoutUser }
  )(withRouter(Logout));
