import React, { Component } from "react";
import Navbar from "../components/Navbar";
import TenantCard from "../components/TenantCard";
import Loading from "../components/Loading";
import axios from "axios";
import { BACKEND_URL } from "../config";

class Tenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      buildingData: {},
      tenant_info: {},
      ownerData: {},
      loading: true,
    };
  }
  async componentDidMount() {
    const tenant_email = localStorage.getItem("user");
    let tenant_info = {},
      data = {},
      buildingData = {},
      ownerData = {};
    try {
      const response = await axios.get(
        BACKEND_URL + "/tenant/getOwnerBuildingInfo/" + String(tenant_email)
      );
      if (!response.data.error) {
        data = response.data.result;
      } else {
        alert(response.data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
    try {
      const response = await axios.get(
        BACKEND_URL + "/building/getInfo/" + String(data.buildingID)
      );
      if (!response.data.error) {
        buildingData = response.data.result;
      } else {
        alert(response.data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
    try {
      const response = await axios.get(
        BACKEND_URL + "/tenant/getTenantInfo/" + String(tenant_email)
      );
      if (!response.data.error) {
        tenant_info = response.data.result;
      } else {
        alert(response.data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
    try {
      const response = await axios.get(
        BACKEND_URL + "/owner/getOwnerInfo/" + String(data.owner_email)
      );
      if (!response.data.error) {
        ownerData = response.data.result;
      } else {
        alert(response.data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
    this.setState({
      buildingData,
      data,
      tenant_info,
      ownerData,
      loading: !this.state.loading,
    });
  }
  render() {
    return (
      <div>
        <Navbar title="Tenant" />
        {this.state.loading ? (
          <div className="mt-5 pt-5">
            <Loading />
          </div>
        ) : (
          <div className="mt-4">
            <TenantCard
              data={this.state.data}
              ownerData={this.state.ownerData}
              buildingData={this.state.buildingData}
              tenant_info={this.state.tenant_info}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Tenant;
