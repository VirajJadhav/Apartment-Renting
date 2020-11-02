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
      errorBuilding: false,
      tenant: {},
      errorTenant: false,
      start_date: new Date(),
      due_date: new Date(),
      floor_number: 0,
      errorFloorNumber: false,
      flat_number: 0,
      errorFlatNumber: false,
      rent_amount: 0,
      errorRentAmount: false,
      helperField: "",
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
    const name = event.target.name;
    if (this.state.errorFloorNumber && name === "floor_number") {
      this.setState({
        errorFloorNumber: !this.state.errorFloorNumber,
        helperField: "",
      });
    }
    if (this.state.errorFlatNumber && name === "flat_number") {
      this.setState({
        errorFlatNumber: !this.state.errorFlatNumber,
        helperField: "",
      });
    }
    if (this.state.errorRentAmount && name === "rent_amount") {
      this.setState({
        errorRentAmount: !this.state.errorRentAmount,
        helperField: "",
      });
    }
    if (event.target.value < 0) return;
    this.setState({
      [name]: event.target.value,
    });
  };
  handleChangeAutoComplete = (event, value) => {
    const id = event.target.id;
    if (id.includes("tenant-info")) {
      if (this.state.errorTenant) {
        this.setState({
          errorTenant: !this.state.errorTenant,
          helperField: "",
        });
      }
      this.setState({
        tenant: value,
      });
    } else if (id.includes("building-info")) {
      if (this.state.errorBuilding) {
        this.setState({
          errorBuilding: !this.state.errorBuilding,
          helperField: "",
        });
      }
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
    const {
      building,
      tenant,
      floor_number,
      flat_number,
      rent_amount,
    } = this.state;
    if (
      JSON.stringify(tenant) === "{}" ||
      tenant === "" ||
      tenant === undefined
    ) {
      this.setState({
        errorTenant: !this.state.errorTenant,
        helperField: "This field is required !",
      });
      return;
    }
    if (
      JSON.stringify(building) === "{}" ||
      building === "" ||
      building === undefined
    ) {
      this.setState({
        errorBuilding: !this.state.errorBuilding,
        helperField: "This field is required !",
      });
      return;
    }
    if (floor_number === 0 || floor_number === "") {
      this.setState({
        errorFloorNumber: !this.state.errorFloorNumber,
        helperField: "This field is required !",
      });
      return;
    }
    if (flat_number === 0 || flat_number === "") {
      this.setState({
        errorFlatNumber: !this.state.errorFlatNumber,
        helperField: "This field is required !",
      });
      return;
    }
    if (rent_amount === 0 || rent_amount === "") {
      this.setState({
        errorRentAmount: !this.state.errorRentAmount,
        helperField: "This field is required !",
      });
      return;
    }
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
        <Navbar title="Owner" />
        <LForm
          due_date={this.state.due_date}
          start_date={this.state.start_date}
          floor_number={this.state.floor_number}
          flat_number={this.state.flat_number}
          rent_amount={this.state.rent_amount}
          building_info={this.state.building_info}
          tenant_info={this.state.tenant_info}
          errorBuilding={this.state.errorBuilding}
          errorTenant={this.state.errorTenant}
          errorFlatNumber={this.state.errorFlatNumber}
          errorFloorNumber={this.state.errorFloorNumber}
          errorRentAmount={this.state.errorRentAmount}
          helperField={this.state.helperField}
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
