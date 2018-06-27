import React from 'react';
import PropTypes from 'prop-types';

const Sizes = props => (
  <div>
    <select className="sizes" defaultValue="Select Size">
      <option disabled>Select Size</option>
      {
        props.sizes.map(size => <option key={size}>{size} </option>)
      }
    </select>
  </div>
);

Sizes.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Sizes;
