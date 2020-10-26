import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner_email: "",
    };
  }
  async componentDidMount() {
    const email = localStorage.getItem("user");
    try {
      const response = await axios.get(
        BACKEND_URL + "/owner/getOwnerTenantInfo/" + email
      );
      this.setState({
        owner_email: email,
      });
      // if(!response.data.error) {

      // }
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <Link to="/building_form" style={{ textDecoration: "none" }}>
          <Button className="my-4 mx-4" color="inherit" variant="contained">
            Add Building Info
          </Button>
        </Link>
        <Link to="/lease_form" style={{ textDecoration: "none" }}>
          <Button className="my-4 mx-4" color="inherit" variant="contained">
            Lease Apartment
          </Button>
        </Link>
      </div>
    );
  }
}

export default Owner;
