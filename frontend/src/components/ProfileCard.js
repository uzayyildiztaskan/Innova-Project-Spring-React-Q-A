import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    let message = "Edit disabled";
    if (pathUsername == props.loggedInUsername) {
        message = "Edit enabled";
    }
    return <div>{message}</div>;
};

// class ProfileCardContextWrapper extends React.Component {
//     static contextType = Authentication;
//     render() {
//         return (
//             <ProfileCard {... this.props} username = {this.context.state.username} />
//         );
//     }
// }

const mapStateToProps = (store) => {
    return {
        loggedInUsername: store.username
    };
};

export default connect(mapStateToProps)(withRouter(ProfileCard));