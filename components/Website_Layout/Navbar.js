import Link from "next/link";
import { GoogleLogin } from "react-google-login";
import React, { useEffect, useState } from "react";
import "../../css/navbar.css";
import "../../css/Dropdown.css";

export default function navbar(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [showNav, setShowNav] = useState(false);

  let navbarStyle = {
    width: "100%",
    backgroundColor: "#5ac0ca",
    height: "3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  useEffect(() => {
    if (props.googleUserObject && props.googleUserObject.profileObj) {
      setLoggedIn(true);
      setProfileImgUrl(props.googleUserObject.profileObj.imageUrl);
    }
  }, [props.googleUserObject]);

  const responseGoogle = googleUser => {
    props.setGoogleUserObject(googleUser);
  };

  function handleDropDownMenuItem() {
    <a className="tab">Peorja</a>;
  }

  return (
    <div>
      <div className="navbar">
        <Link href="/">
          <img className="w3-image logo" src="logo.png" alt="Header" />
        </Link>
      
        <div className="w3-hide-small">
          {/* Uncomment to add dropdown (delete duplicate link below) */}
          {/* <div className="dropdown">
            <button className="dropbtn">About</button>
            <div className="dropdown-content">
              <Link href="/Officers">
                <a className="navDropDown">Our Team</a>
              </Link>
            </div>
          </div> */}
          <Link href="/Officers">
            <a className="tab">Our Team</a>
          </Link>
          <Link href="/Resources">
            <a className="tab">Useful Resources</a>
          </Link>
          {/* <Link href="/Merchandise">
            <a className="tab">Merchandise</a>
          </Link> */}
          
          <Link href="/W23ProjectSeries">
            <div className="dropdown">
              <button className="dropbtn">Project Series</button>
              <div className="dropdown-content">
                <Link href="/W23ProjectSeries">
                  <a className="tab">Winter 2023</a>
                </Link>
                <Link href="/W21ProjectSeries">
                  <a className="tab">Winter 2021</a>
                </Link>
              </div>
            </div>
          </Link>
          
          
          {/* Uncomment to add dropdown (delete duplicate link below) */}
          {/* <div className="dropdown">
            <button className="dropbtn">Events</button>
            <div className="dropdown-content">
              <Link href="/Calendar">
                <a className="navDropDown">Calendar</a>
              </Link>
            </div>
          </div> */}
          <Link href="/Calendar">
                <a className="tab">Calendar</a>
          </Link>
          {loggedIn ? (
            <Link href="/UserProfile">
              <img className="profile" src={profileImgUrl} />
            </Link>
          ) : (
            <GoogleLogin
              render={renderProps => (
                <button
                  className="login"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Login
                </button>
              )}
              clientId={process.env.GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
        <button className="w3-button w3-xlarge w3-hide-medium w3-hide-large"
          onClick={() => {setShowNav(!showNav)}}>
            &#9776;
        </button>
        {/* <p style={{width: "100vw", position: "absolute", backgroundColor: "gray", alignSelf: 'flex-end'}}>logout</p> */}
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          height: "100%",
          display: showNav ? "block" : "none",
          zIndex: "10",
        }}
        className="w3-sidebar w3-bar-block w3-card w3-animate-right w3-hide-medium w3-hide-large"
      >
        <button
          className="w3-bar-item w3-button"
          onClick={() => setShowNav(!showNav)}
          style={{textAlign: "right", fontSize: "30px"}}
        >&times;</button>
        <Link href="/Officers">
          <a className="tab w3-bar-item">Our Team</a>
        </Link>
        <Link href="/Resources">
          <a className="tab w3-bar-item">Useful Resources</a>
        </Link>
        <Link href="/W23ProjectSeries">
          <a className="tab w3-bar-item">Winter 2023</a>
        </Link>
        <Link href="/W21ProjectSeries">
          <a className="tab w3-bar-item">Winter 2021</a>
        </Link>
        <Link href="/Calendar">
          <a className="tab w3-bar-item">Calendar</a>
        </Link>
      </div>
    </div>
  );
}