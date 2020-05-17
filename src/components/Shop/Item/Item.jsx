import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Item.css";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index.js';
import {
  Button,
  IconButton,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

class Item extends PureComponent {
  state = {
    amount:0,
    size: ""
  };

  handleChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  handleOnAddItem = (e) =>{
    this.props.onAddItem(this.props.itemId, this.state.size, e.currentTarget.dataset.index)
  }

  render() {
    const { itemId, onChange, item, quantity } = this.props;
    const { description, image_url, sales_price, sizes } = item;
    const itemQuantity = quantity ? quantity : 0;
    this.sizeOptions = sizes.map((sizes, key) => (
      <option value={sizes}>
        {sizes.charAt(0).toUpperCase() + sizes.slice(1)}{" "}
      </option>
    ));

    return (
      <div className="col-lg-4 col-md-6 ">
        <div className={"itemDiv " + this.props.item.category}>
          <div className="itemImg">
            <img src={image_url} alt="item" />
          </div>
          <h4>{description}</h4>
          <h6>${sales_price}</h6>
          <FormControl required>
            <InputLabel htmlFor="age-native-simple">Size </InputLabel>
            <NativeSelect
              value={this.state.size}
              onChange={this.handleChange}
              inputProps={{
                name: "size",
                id: "size-native-helper",
              }}
            >
              <option aria-label="None" value="" />
              {this.sizeOptions}
            </NativeSelect>
          </FormControl>
          <div className="quantity-control">
            <IconButton
              className="circleButton"
              aria-label="delete"
              onClick={() => onChange(itemId, -1)}
            >
              <RemoveCircleIcon fontSize="default" />
            </IconButton>
            <span style={{ margin: 10 }}>{itemQuantity}</span>
            <IconButton
              className="circleButton"
              aria-label="delete"
              onClick={() => onChange(itemId, 1)}
            >
              <AddCircleIcon fontSize="default" />
            </IconButton>
            <Button variant="outlined" color="primary" onClick={this.handleOnAddItem}  data-index={quantity}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  itemId: PropTypes.string,
  onChange: PropTypes.func,
  item: PropTypes.shape({
    description: PropTypes.string,
    image_url: PropTypes.string,
    sales_price: PropTypes.number,
  }),
  quantity: PropTypes.number,
};

const mapStateToProps = state => {
  return {
      //authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddItem: (itemID, size, amount) => dispatch(actions.addItem(itemID, size, amount))
      //onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/user/home'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
