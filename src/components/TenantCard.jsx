import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Description as DescriptionIcon } from "@material-ui/icons";

function TenantCard(props) {
  const ownerData = props.ownerData;
  const buildingData = props.buildingData;
  const tenantInfo = props.tenant_info;
  const data = props.data;
  return (
    <div index={props.index}>
      <div className="container-sm mt-4">
        <Grid container>
          <Grid item xs={12}>
            <Card elevation={8}>
              <Typography
                variant="h6"
                component="h6"
                className="d-flex justify-content-center my-3"
              >
                <DescriptionIcon className="mr-2 mt-1" />
                {tenantInfo.tenant_name === undefined
                  ? "Invalid Name"
                  : tenantInfo.tenant_name}
              </Typography>
              <CardContent>
                <Card
                  style={{ backgroundColor: "#e6e6e6" }}
                  className="p-3 mb-2 mx-2"
                  elevation={8}
                >
                  <CardHeader
                    className="p-1 pl-2"
                    title={`Owner - ${
                      ownerData.owner_name === undefined
                        ? "Not Assigned"
                        : ownerData.owner_name
                    }`}
                    titleTypographyProps={{ variant: "h6" }}
                    subheader={`Start Date: ${
                      data.start_date === undefined
                        ? "Not Assigned"
                        : String(data.start_date).split("T")[0]
                    }`}
                  />
                  <CardHeader
                    className="p-1 pl-2"
                    titleTypographyProps={{ variant: "h6" }}
                    subheader={`Due Date: ${
                      data.due_date === undefined
                        ? "Not Assigned"
                        : String(data.due_date).split("T")[0]
                    }`}
                  />
                  <CardContent className="p-1 pl-2">
                    <div className="my-4">
                      <Grid spacing={2} container item xs={12} className="mb-2">
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Building Name</strong> :{" "}
                            {buildingData.building_name === undefined
                              ? "Not Assigned"
                              : buildingData.building_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Owner Contact</strong> :{" "}
                            {ownerData.owner_contact === undefined
                              ? "Not Assigned"
                              : ownerData.owner_contact}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Rent Status</strong> :{" "}
                            {data.paid === undefined
                              ? "Not Assigned"
                              : data.paid === "N"
                              ? "Not Paid"
                              : "Paid"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Flat Number</strong> :{" "}
                            {data.flat_number === undefined
                              ? "Not Assigned"
                              : data.flat_number}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Building Pincode</strong> :{" "}
                            {buildingData.building_pincode === undefined
                              ? "Not Assigned"
                              : buildingData.building_pincode}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Floor Number</strong> :{" "}
                            {data.floor_number === undefined
                              ? "Not Assigned"
                              : data.floor_number}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Rent Amount</strong> :{" "}
                            {data.rent_amount === undefined
                              ? "Not Assigned"
                              : data.rent_amount + " /-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Typography
                            className="my-3"
                            variant="body1"
                            wrap="true"
                          >
                            <strong>Building Address</strong> :{" "}
                            {buildingData.building_street === undefined
                              ? "Not Assigned"
                              : buildingData.building_street}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TenantCard;
