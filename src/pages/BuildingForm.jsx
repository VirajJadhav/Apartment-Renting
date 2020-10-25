import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import axios from "axios";
import { BACKEND_URL } from "../config";

class BuildingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building_name: "",
      building_street: "",
      building_pincode: 0,
      total_floors: 0,
      flats_each: 0,
    };
  }
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (
      (name === "total_floors" ||
        name === "flats_each" ||
        name === "building_pincode") &&
      value < 0
    )
      return;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    axios
      .post(BACKEND_URL + "/building/insertInfo", this.state)
      .then((response) => {
        if (!response.data.error) {
          this.props.history.goBack();
        } else {
          console.log(response.data.result);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  render() {
    return (
      <div>
        <Navbar />
        <Form
          building_name={this.state.building_name}
          building_street={this.state.building_street}
          building_pincode={this.state.building_pincode}
          total_floors={this.state.total_floors}
          flats_each={this.state.flats_each}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default BuildingForm;
