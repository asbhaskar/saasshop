import React, { Component } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
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
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      description: "",
      category: "",
      quantity: 0,
      price: 0,
      validateForm: {
        image: true,
        description: true,
        category: true,
        quantity: true,
        price: true,
      },
    };
  }

  validateForm = () => {
    const s = this.state;
    let complete = true;
    for (const key in s.validateForm) {
      if (s[key]) {
        s.validateForm[key] = true;
      } else {
        s.validateForm[key] = false;
        complete = false;
      }
    }
    this.setState({ validateForm: s.validateForm });
    return complete;
  };

  onSubmit = () => {
    const valid = this.validateForm();
    if (!valid) {
      return;
    }
    this.props.firebasePush(this.state);
  };

  onChange = (type, event) => {
    let update;
    if (type === "image") {
      update = event.target.files[0];
    } else {
      update = event.target.value;
    }
    this.setState({ [type]: update });
  };

  // add stuff for shirt sizes
  render() {
    return (
      <React.Fragment>
        <div className="addMerchContainer">
          <form id="payment-form">
            <FormLabel
              error={!this.state.validateForm.image}
              component="legend"
              className="filter-label"
              required
            >
              Upload Item Image
            </FormLabel>
            <input
              type="file"
              className="uploadButton"
              onChange={(event) => this.onChange("image", event)}
            ></input>
            <br />
            <TextField
              error={!this.state.validateForm.description}
              onChange={(event) => this.onChange("description", event)}
              label="Description"
              id="description"
              type="text"
              required
            />
            <br />
            <div class="payment-method">
              <FormControl component="fieldset">
                <FormLabel
                  error={!this.state.validateForm.category}
                  component="legend"
                  className="filter-label"
                  required
                >
                  Category
                </FormLabel>
                <RadioGroup
                  aria-label="payment"
                  name="payment"
                  value={this.value}
                >
                  <FormControlLabel
                    onChange={(event) => this.onChange("category", event)}
                    value="shirt"
                    control={<Radio />}
                    label="Shirt"
                  />
                  <FormControlLabel
                    onChange={(event) => this.onChange("category", event)}
                    value="sticker"
                    control={<Radio />}
                    label="Sticker"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <TextField
              error={!this.state.validateForm.quantity}
              onChange={(event) => this.onChange("quantity", event)}
              label="Quantity"
              id="standard-basic"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
              required
            />
            <br />
            <br />
            <TextField
              error={!this.state.validateForm.price}
              onChange={(event) => this.onChange("price", event)}
              label="Price"
              id="standard-basic"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              required
            />
            <Button
              onClick={this.onSubmit}
              variant="outlined"
              color="primary"
              className="submitButton"
            >
              Submit
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddMerch;
