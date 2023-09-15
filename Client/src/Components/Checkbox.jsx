import {} from "react";
import PropTypes from "prop-types";

const Checkbox = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      <input type="checkbox" checked={value} onChange={onChange} />
    </div>
  );
};
export default Checkbox;

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
