import React, { Component } from "react";
import Navbar from "../components/Navbar";
import BForm from "../components/BForm";
import axios from "axios";
import { BACKEND_URL } from "../config";

class BuildingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building_name: "",
      errorBuildingName: false,
      building_street: "",
      errorBuildingStreet: false,
      building_pincode: 0,
      errorBuildingPincode: false,
      total_floors: 0,
      errorTotalFloors: false,
      flats_each: 0,
      errorFlatsEach: false,
      helperField: "",
    };
  }
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const {
      errorBuildingName,
      errorBuildingStreet,
      errorBuildingPincode,
      errorTotalFloors,
      errorFlatsEach,
    } = this.state;
    if (
      (name === "total_floors" ||
        name === "flats_each" ||
        name === "building_pincode") &&
      value < 0
    )
      return;
    if (errorBuildingName && name === "building_name") {
      this.setState({
        errorBuildingName: !errorBuildingName,
        helperField: "",
      });
    } else if (errorTotalFloors && name === "total_floors") {
      this.setState({
        errorTotalFloors: !errorTotalFloors,
        helperField: "",
      });
    } else if (errorFlatsEach && name === "flats_each") {
      this.setState({
        errorFlatsEach: !errorFlatsEach,
        helperField: "",
      });
    } else if (errorBuildingStreet && name === "building_street") {
      this.setState({
        errorBuildingStreet: !errorBuildingStreet,
        helperField: "",
      });
    } else if (errorBuildingPincode && name === "building_pincode") {
      this.setState({
        errorBuildingPincode: !errorBuildingPincode,
        helperField: "",
      });
    }
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    const {
      building_name,
      building_street,
      building_pincode,
      total_floors,
      flats_each,
    } = this.state;
    if (building_name === "") {
      this.setState({
        errorBuildingName: !this.state.errorBuildingName,
        helperField: "This field is required !",
      });
      return;
    }
    if (total_floors === 0 || total_floors === "") {
      this.setState({
        errorTotalFloors: !this.state.errorTotalFloors,
        helperField: "This field is required !",
      });
      return;
    }
    if (flats_each === 0 || flats_each === "") {
      this.setState({
        errorFlatsEach: !this.state.errorFlatsEach,
        helperField: "This field is required !",
      });
      return;
    }
    if (building_street === "") {
      this.setState({
        errorBuildingStreet: !this.state.errorBuildingStreet,
        helperField: "This field is required !",
      });
      return;
    }
    if (building_pincode === 0 || building_pincode === "") {
      this.setState({
        errorBuildingPincode: !this.state.errorBuildingPincode,
        helperField: "This field is required !",
      });
      return;
    }
    const data = {
      building_name: this.state.building_name,
      building_street: this.state.building_street,
      building_pincode: this.state.building_pincode,
      total_floors: this.state.total_floors,
      flats_each: this.state.flats_each,
    };
    axios
      .post(BACKEND_URL + "/building/insertInfo", data)
      .then((response) => {
        if (!response.data.error) {
          this.props.history.goBack();
        } else {
          alert(response.data.result);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  render() {
    return (
      <div>
        <Navbar title="Owner" />
        <BForm
          building_name={this.state.building_name}
          building_street={this.state.building_street}
          building_pincode={this.state.building_pincode}
          total_floors={this.state.total_floors}
          flats_each={this.state.flats_each}
          errorBuildingName={this.state.errorBuildingName}
          errorBuildingStreet={this.state.errorBuildingStreet}
          errorBuildingPincode={this.state.errorBuildingPincode}
          errorTotalFloors={this.state.errorTotalFloors}
          errorFlatsEach={this.state.errorFlatsEach}
          helperField={this.state.helperField}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default BuildingForm;
