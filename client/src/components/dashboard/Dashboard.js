import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile.profile,
    loading: state.profile.loading
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
