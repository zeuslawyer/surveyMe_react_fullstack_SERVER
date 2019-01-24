import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import logo from "../assets/matchfitLogo.png";

class Header extends Component {
  logoStyle = {
    width: "60px"
    // height: "68px"
  };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return "loading auth status";

      default:
        // console.log(this.props.auth);
        if (this.props.auth.isLoggedIn) {
          return [
            <li key="1">
              <Payments />
            </li>,
            <li key="2" style={{margin: "0 10px"}}>Credits: {this.props.auth.credits || 0}</li>,
            <li key="3">
              <a href="/api/logout">Logout</a>
            </li>
          ];
        } else {
          // no user logged in
          return (
            <li>
              <a href="auth/google">Login With Google</a>
            </li>
          );
        }
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div>
            <Link
              className="left brand-logo"
              to={
                this.props.auth && this.props.auth.isLoggedIn ? "/surveys" : "/"
              }
            >
              SurveyMe!
              {/* <img src={logo} style={this.logoStyle} alt="" /> */}
            </Link>
          </div>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  /* take the redux store argument, and create object becomes this component's props*/
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  null
)(Header);
