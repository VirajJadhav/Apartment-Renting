import React, { Component } from "react";
import Navbar from "../components/Navbar";
import OwnerTable from "../components/OwnerTable";
import EditDialog from "../components/EditDialog";
import DeleteDialog from "../components/DeleteDialog";
import Loading from "../components/Loading";
import { Button, Container } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOpen: false,
      open: false,
      owner_email: "",
      allData: [],
      data: [],
      due_date: new Date(),
      rent_amount: "",
      paid: "",
      paymentID: "",
      deleteIndex: "",
      loading: true,
    };
  }
  async componentDidMount() {
    const email = localStorage.getItem("user");
    try {
      const response = await axios.get(
        BACKEND_URL + "/owner/getFlatPaymentDetails/" + email
      );
      if (!response.data.error) {
        const data = response.data.result.map((d, index) => {
          return [
            d.tenant_email,
            d.start_date.split("T")[0],
            d.due_date.split("T")[0],
            d.rent_amount,
            d.paid === "N" ? "No" : "Yes",
          ];
        });
        this.setState({
          owner_email: email,
          allData: response.data.result,
          data,
        });
      } else {
        alert(response.data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
    this.setState({
      loading: !this.state.loading,
    });
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleDueDateChange = (date) => {
    this.setState({
      due_date: date.toISOString(),
    });
  };
  handleEdit = (index) => {
    this.handleModal();
    const reqData = this.state.allData[index];
    this.setState({
      due_date: reqData.due_date,
      rent_amount: reqData.rent_amount,
      paid: reqData.paid,
      paymentID: reqData.paymentID,
    });
  };
  handleDeleteModal = (index) => {
    if (!isNaN(index)) {
      this.setState({
        deleteIndex: index,
      });
    }
    this.setState({
      deleteOpen: !this.state.deleteOpen,
    });
  };
  handleDeleteSubmit = () => {
    const flatID = this.state.allData[this.state.deleteIndex].flatID;
    axios
      .post(BACKEND_URL + "/flat/deleteRentRelation", { flatID })
      .then((response) => {
        console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error.message);
      });
    this.setState({
      deleteIndex: "",
    });
    this.handleDeleteModal();
  };
  handleModal = () => {
    this.setState({
      open: !this.state.open,
      due_date: new Date(),
      rent_amount: "",
      paid: "",
      paymentID: "",
    });
  };
  modalSubmit = () => {
    const req_due_date = this.state.due_date.substring(0, 10);
    const paymentID = Number(this.state.paymentID);
    const data = {
      paid: this.state.paid,
      rent_amount: Number(this.state.rent_amount),
      due_date: req_due_date,
      paymentID,
    };
    axios
      .post(BACKEND_URL + "/payment/updatePayment", data)
      .then((response) => {
        if (response.data.error) console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error.message);
      });
    this.handleModal();
  };
  render() {
    return (
      <div>
        <Navbar title="Owner" />
        <EditDialog
          handleModal={this.handleModal}
          open={this.state.open}
          modalSubmit={this.modalSubmit}
          due_date={this.state.due_date}
          rent_amount={this.state.rent_amount}
          paid={this.state.paid}
          handleChange={this.handleChange}
          handleDueDateChange={this.handleDueDateChange}
        />
        <DeleteDialog
          handleDeleteModal={this.handleDeleteModal}
          deleteOpen={this.state.deleteOpen}
          handleDeleteSubmit={this.handleDeleteSubmit}
        />
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
        {this.state.loading ? (
          <Loading />
        ) : (
          <Container maxWidth="xl">
            <OwnerTable
              data={this.state.data}
              handleEdit={this.handleEdit}
              handleDeleteModal={this.handleDeleteModal}
            />
          </Container>
        )}
      </div>
    );
  }
}

export default Owner;
