import React, { Component } from "react";
import LForm from "../components/LForm";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";

class LeaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building_info: [],
      tenant_info: [],
      building: {},
      tenant: {},
    };
  }
  async componentDidMount() {
    let response = [];
    try {
      response = await axios.get(BACKEND_URL + "/building/getAllInfo");
      if (!response.data.error) {
        this.setState({
          building_info: response.data.result,
        });
      } else {
        alert(response.data.result);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
    try {
      response = await axios.get(BACKEND_URL + "/tenant/getAllInfo");
      if (!response.data.error) {
        this.setState({
          tenant_info: response.data.result,
        });
      } else {
        alert(response.data.result);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
    // console.log(this.state);
  }
  handleChangeAutoComplete = (event, value) => {
    const id = event.target.id;
    if (id.includes("tenant-info")) {
      this.setState({
        tenant: value,
      });
    } else if (id.includes("building-info")) {
      this.setState({
        building: value,
      });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <Navbar />
        <LForm
          building_info={this.state.building_info}
          tenant_info={this.state.tenant_info}
          handleChangeAutoComplete={this.handleChangeAutoComplete}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default LeaseForm;
