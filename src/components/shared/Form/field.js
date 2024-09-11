import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";

import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";
// import Datepicker from "./Datepicker";
// import Timepicker from "./Timepicker";
import Radio from "./Radio";
import AutoComplete from "./AutoComplete";
import Textarea from "./Textarea";
import InputDebounced from "./InputDebounced";
import OtpInput from "./OtpInput";
import Phone from "./Phone";
import Switch from "./Switch";
import LocationAutoComplete from "./LocationAutoComplete";
import Number from "./Number";

import { useRadFormikContext } from "./useFormik";

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  tip: PropTypes.string,
  error: PropTypes.string,
  errorMsg: PropTypes.string,
  name: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  label: undefined,
  tip: undefined,
  error: undefined,
  errorMsg: undefined,
  name: undefined,
};

const generateField = (FormComponent) => {
  const FieldComponent = ({
    className,
    tip,
    error,
    errorMsg,
    name,
    helperText,
    label,
    required = false,
    placeholder,
    ...otherProps
  }) => {
    const fieldId = uniqueId("form-field-");
    const errorText = helperText ? helperText : getErrorText(error, errorMsg); // ...helperText overridden by otherProps
    const isError = !!(error || errorMsg);

    const validationSchema = useRadFormikContext();

    const validation = useMemo(() => {
      if (validationSchema && validationSchema?.fields) {
        return validationSchema.fields[name]
          ? validationSchema.fields[name]
          : undefined;
      }
      return undefined;
    }, [name, validationSchema]);

    const isRequired = useMemo(() => {
      return !!validation?.exclusiveTests?.required || required;
    }, [validation]);

    const fieldLabel = useMemo(() => {
      return label && label !== ""
        ? isRequired && !label.includes("*")
          ? `${label} *`
          : label
        : "";
    }, [isRequired, label]);

    const fieldPlaceholder = useMemo(() => {
      return placeholder && placeholder !== ""
        ? isRequired
          ? `${placeholder} *`
          : placeholder
        : "";
    }, [isRequired, placeholder]);

    return (
      <FormComponent
        margin="normal"
        id={fieldId}
        name={name}
        helperText={errorText ? errorText : tip}
        error={isError}
        className={className}
        validation={validation}
        label={fieldLabel}
        placeholder={fieldPlaceholder}
        {...otherProps}
      />
    );
  };

  FieldComponent.propTypes = propTypes;
  FieldComponent.defaultProps = defaultProps;

  return FieldComponent;
};

export default {
  Input: generateField(Input),
  Select: generateField(Select),
  Checkbox: generateField(Checkbox),
  // Datepicker: generateField(Datepicker),
  // Timepicker: generateField(Timepicker),
  Radio: generateField(Radio),
  AutoComplete: generateField(AutoComplete),
  Textarea: generateField(Textarea),
  InputDebounced: generateField(InputDebounced),
  OtpInput: generateField(OtpInput),
  Phone: generateField(Phone),
  Switch: generateField(Switch),
  LocationAutoComplete: generateField(LocationAutoComplete),
  Number: generateField(Number),
};

const getErrorText = (error, errorMsg) => {
  if (error) return error;
  else if (errorMsg) return errorMsg;
  else return false;
};
