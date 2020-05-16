import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Item.css";
import { IconButton, 
  FormControl, FormHelperText, 
  InputLabel, 
  NativeSelect 
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

class Item extends PureComponent {
  state={
    size:""
  }

  handleChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { itemId, onChange, item, quantity } = this.props;
    const { description, image_url, sales_price } = item;
    const itemQuantity = quantity ? quantity : 0;
    return (
      <div className="col-lg-4 col-sm-6 ">
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
                name: 'size',
                id: 'size-native-helper',
              }}
            >
              <option aria-label="None" value="" />
              <option value={"small"}>Small </option>
              <option value={"medium"}>Medium </option>
              <option value={"large"}>Large </option>
            </NativeSelect>
          </FormControl>
          {/* <label htmlFor="size">Size: </label>
          <select id="size">
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">L</option>
            <option value="extra_large">XL</option>
          </select> */}
          <div className="quantity-control">
            <IconButton aria-label="delete" onClick={() => onChange(itemId, -1)}>
              <RemoveCircleIcon fontSize="default"/>
            </IconButton>
            <span style={{ margin: 10 }}>{itemQuantity}</span>
            <IconButton aria-label="delete" onClick={() => onChange(itemId, 1)}>
              <AddCircleIcon fontSize="default"/>
            </IconButton>
              {/* <button className="quantity" onClick={() => onChange(itemId, -1)}>
                -
              </button>
              <span style={{ margin: 10 }}>{itemQuantity}</span>
              <button className="quantity" onClick={() => onChange(itemId, 1)}>
                +
              </button> */}
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

export default Item;
