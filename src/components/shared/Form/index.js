import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { get, mapValues } from 'lodash';
import Field from './field';
import { RadFormik } from './useFormik';

const propTypes = {
  validate: PropTypes.func,
  validations: PropTypes.object,
  validateOnBlur: PropTypes.bool,
};

const defaultProps = {
  validate: undefined,
  validations: undefined,
  validateOnBlur: false,
};

const Form = ({ validate, validations, validationSchema, ...otherProps }) => {
  return (
    <RadFormik validationSchema={validationSchema}>
      <Formik
        {...otherProps}
        validationSchema={validationSchema}
        validate={(values) => {
          if (validate) {
            return validate(values);
          }
          return false;
        }}
      />
    </RadFormik>
  );
};

Form.Element = (props) => <FormikForm noValidate {...props} />;

Form.Field = mapValues(Field, (FieldComponent) => ({ name, validate, ...props }) => {
  return (
    <FormikField name={name} validate={validate}>
      {({ field, form: { touched, errors, setFieldValue, setFieldTouched, ...otherProp } }) => {
        return (
          <FieldComponent
            {...field}
            {...props}
            name={name}
            error={get(touched, name) && get(errors, name)}
            onChange={(value) => {
              if (props?.onChange && typeof props.onChange === 'function') {
                props.onChange(value);
              }
              setFieldValue(name, value);
            }}
            onBlur={(e) => {
              if (props?.onBlur && typeof props.onBlur === 'function') {
                props.onBlur(e.target.value);
              }
              setFieldTouched(name, true);
            }}
          />
        );
      }}
    </FormikField>
  );
});

Form.initialValues = (data, getFieldValues) =>
  getFieldValues((key, defaultValue = '') => {
    const value = get(data, key);
    return value === undefined || value === null ? defaultValue : value;
  });

Form.handleAPIError = (error, form) => {
  if (error.data.fields) {
    form.setErrors(error.data.fields);
  } else {
  }
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
