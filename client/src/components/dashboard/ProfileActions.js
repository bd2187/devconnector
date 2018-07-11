import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProfileActions extends Component {
  render() {
    return (
      <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-info mr-1" />
          Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-info mr-1" />
          Add Education
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(ProfileActions);
