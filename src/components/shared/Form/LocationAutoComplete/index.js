import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import _, { debounce } from "lodash";

import { FormControl, TextField, Chip, Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const autocompleteService = { current: null };
const geoCoderService = { current: null };

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  remoteMethod: PropTypes.func,
  autocomplete: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

const defaultProps = {
  className: undefined,
  variant: "standard",
  name: undefined,
  label: undefined,
  defaultValue: undefined,
  placeholder: "Select",
  autocomplete: false,
  fullWidth: false,
};

const LocationAutoComplete = ({
  className,
  variant,
  label,
  name,
  defaultValue,
  placeholder,
  onChange,
  autocomplete,
  fullWidth,
  value,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [locationValue, setLocationValue] = React.useState("");
  const [options, setOptions] = React.useState([""]);

  const fetch = React.useMemo(
    () =>
      _.throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleChange = (event, val) => {
    if (!geoCoderService.current && window.google) {
      geoCoderService.current = new window.google.maps.Geocoder();
    }
    if (!geoCoderService.current) {
      return undefined;
    }
    const { OK } = window.google.maps.GeocoderStatus;

    setLocationValue(val);
    let data = {};
    if (val?.place_id && val.place_id !== "") {
      data.address1 = val.description;
      data.place_id = val.place_id;
      geoCoderService.current.geocode(
        { placeId: val.place_id },
        (results, status) => {
          if (status !== OK) {
            console.log(status);
          }
          if (results && results[0]) {
            data.address2 = results[0].formatted_address;
            data.lat = results[0].geometry.location.lat();
            data.lng = results[0].geometry.location.lng();
            let address = results[0].address_components.reduce(
              (seed, { long_name, types }) => (
                types.forEach((t) => (seed[t] = long_name)), seed
              ),
              {}
            );
            data.postcode = address?.postal_code;
            data.city = address?.locality
              ? address?.locality
              : address?.postal_town
              ? address?.postal_town
              : "";
            data.country = address?.country ? address?.country : "";
          }
        }
      );
    }
    onChange(data, event);
  };

  return (
    <FormControl fullWidth={fullWidth} margin="normal">
      <Autocomplete
        multiple={false}
        id={props.id}
        value={locationValue}
        options={options}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        isOptionEqualToValue={(option, value) =>
          option.place_id === value.place_id
        }
        filterOptions={(x) => x}
        onChange={handleChange}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        noOptionsText="Start typing..."
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label={label}
              variant={variant}
              fullWidth={fullWidth}
              error={props.error}
              helperText={props.helperText}
              style={props.inputStyles ? props.inputStyles : {}}
            />
          );
        }}
        name={props.name}
      />
    </FormControl>
  );
};

LocationAutoComplete.propTypes = propTypes;
LocationAutoComplete.defaultProps = defaultProps;

export default LocationAutoComplete;
