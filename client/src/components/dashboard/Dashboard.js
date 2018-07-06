import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  displayProfile(profile, user) {
    if (Object.keys(profile).length > 0) {
      return <h4>display profile</h4>;
    } else {
      return (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet set up a profile. Please add some info.</p>
          <Link to="/create-profile" className="btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent =
      profile === null || loading ? (
        <Spinner />
      ) : (
        this.displayProfile(profile, user)
      );

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentProfile: function() {
      dispatch(getCurrentProfile());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
