import React, { Component } from "react";
import "./Admin.css";
import {
  Button,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";

class AddMerch extends Component {
  state = {};

  // add stuff for shirt sizes
  render() {
    return (
      <React.Fragment>
        <div className="addMerchContainer">
          <button className="uploadButton">Upload Image</button>
          <form id="payment-form">
            <TextField
              label="Description"
              id="description"
              type="text"
              required
            />
            <br />
            <TextField label="Price" id="price" type="text" required />
            <br />
            <div class="payment-method">
              <FormControl component="fieldset">
                <FormLabel component="legend" className="filter-label" required>
                  Category
                </FormLabel>
                <RadioGroup
                  aria-label="payment"
                  name="payment"
                  value={this.value}
                >
                  <FormControlLabel
                    value="shirt"
                    control={<Radio />}
                    label="Shirt"
                  />
                  <FormControlLabel
                    value="sticker"
                    control={<Radio />}
                    label="Sticker"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <Button variant="outlined" color="primary" className="submitButton">
              Submit
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddMerch;
