import React, { Component } from "react";
import LForm from "../components/LForm";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";

class LeaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner_email: "",
      building_info: [],
      tenant_info: [],
      building: {},
      tenant: {},
      start_date: new Date(),
      due_date: new Date(),
      floor_number: 0,
      flat_number: 0,
      rent_amount: 0,
    };
  }
  async componentDidMount() {
    let response = [];
    this.setState({
      owner_email: localStorage.getItem("user"),
    });
    try {
      response = await axios.get(BACKEND_URL + "/building/getAllInfo");
      if (!response.data.error) {
        this.setState({
          building_info: response.data.result,
        });
      } else {
        alert(response.data.result);
        // return;
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
        // return;
      }
    } catch (error) {
      console.log(error.message);
    }
    // console.log(this.state);
  }
  handleChange = (event) => {
    if (event.target.value < 0) return;
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
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
  handleStartDateChange = (date) => {
    this.setState({
      start_date: date,
    });
  };
  handleDueDateChange = (date) => {
    this.setState({
      due_date: date,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    const req_start_date = this.state.start_date.toISOString().split("T")[0];
    const req_due_date = this.state.due_date.toISOString().split("T")[0];
    const data = {
      owner_email: this.state.owner_email,
      tenant_email: this.state.tenant.tenant_email,
      buildingID: this.state.building.buildingID,
      floor_number: Number(this.state.floor_number),
      flat_number: Number(this.state.flat_number),
      start_date: String(req_start_date),
      due_date: String(req_due_date),
      rent_amount: Number(this.state.rent_amount),
    };
    axios
      .post(BACKEND_URL + "/flat/insertInfo", data)
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
        <Navbar />
        <LForm
          due_date={this.state.due_date}
          start_date={this.state.start_date}
          floor_number={this.state.floor_number}
          flat_number={this.state.flat_number}
          rent_amount={this.state.rent_amount}
          building_info={this.state.building_info}
          tenant_info={this.state.tenant_info}
          handleChangeAutoComplete={this.handleChangeAutoComplete}
          handleSubmit={this.handleSubmit}
          handleStartDateChange={this.handleStartDateChange}
          handleDueDateChange={this.handleDueDateChange}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default LeaseForm;
