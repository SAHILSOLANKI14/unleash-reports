import React from "react";
import PropTypes from "prop-types";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import { FormControl, FormHelperText } from "@mui/material";

function Phone({ onChange, helperText, error, sx = {}, ...props }) {
  return (
    <FormControl sx={sx} style={{ width: "100%" }} error={error}>
      <PhoneInput
        country={"gb"}
        {...props}
        onChange={(phone) => {
          onChange(phone, null);
        }}
        enableLongNumbers={15}
        inputClass={error ? "red-border" : ""}
        specialLabel={props.label}
      />
      {helperText && (
        <FormHelperText style={{ color: "#d32f2f" }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

Phone.propTypes = {};

export default Phone;
