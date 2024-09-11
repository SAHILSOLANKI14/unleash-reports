import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Typography, FormLabel } from '@mui/material';
import Form from '../../Form';

import { getLookup, getAttribute } from 'src/modules/app/api/appApis';
import { fetchUsersLookup } from 'src/modules/users/api/usersApi';
import { fetchContactsLookup } from 'src/modules/contacts/api/contactApis';

const CustomField = ({ attribute, formData, ...props }) => {
  const [options, setOptions] = useState([]);
  const [childOptions, setChildOptions] = useState([]);
  const [parentAttribute, setParentAttribute] = useState({});

  useEffect(() => {
    return () => {
      setOptions([]);
      setChildOptions([]);
      setParentAttribute({});
    };
  }, []);

  useEffect(() => {
    fetchAttr(attribute);
  }, [attribute]);

  const fetchAttr = async (attribute) => {
    setOptions([]);
    setChildOptions([]);
    setParentAttribute({});

    if (attribute.fieldType === 'lookup' && attribute.lookup && attribute.lookup !== '') {
      const response = await getLookup(attribute.lookup);
      let data = response.lookup?.options ? response.lookup.options : [];
      data = data.filter((item) => item?.enabled === true || false);
      setOptions(data);
      if (attribute?.parentAttribute && attribute?.parentAttribute !== '') {
        const parent = await getAttribute(attribute?.parentAttribute);
        setParentAttribute(parent);
      } else {
        setParentAttribute({});
      }
    }
  };

  const optionValues = useMemo(() => {
    const multiple = attribute?.fieldOptions?.multiple === true;
    const optionsData = JSON.parse(JSON.stringify(options));
    const childData = JSON.parse(JSON.stringify(childOptions));
    if (attribute.fieldType === 'lookup' && multiple === true) {
      let newVal = props?.value ? props.value : [];
      newVal = newVal
        .filter((item) => item && typeof item !== 'undefined' && item !== null && item !== '')
        .map((item) => {
          if (typeof item === 'string' || item instanceof String) {
            if (attribute?.parentAttribute && attribute?.parentAttribute !== '') {
              return (
                childData.find((option) => option.value === item) || { label: item, value: item }
              );
            } else if (optionsData && optionsData.length) {
              return (
                optionsData.find((option) => option.value === item) || { label: item, value: item }
              );
            } else {
              return { label: item, value: item };
            }
          }
          return item;
        });

      return newVal;
    }
    return props.value;
  }, [options, childOptions, props.value, attribute]);

  useEffect(() => {
    try {
      const optionsData = JSON.parse(JSON.stringify(options));
      if (parentAttribute && parentAttribute.id) {
        if (formData[parentAttribute.fieldName]) {
          switch (true) {
            case typeof formData[parentAttribute.fieldName] === 'string' &&
              formData[parentAttribute.fieldName] !== '':
              let so = optionsData
                .filter((item) => formData[parentAttribute.fieldName] == item.value)
                .map((item) => {
                  return item.child;
                });
              so = so.flat();
              setChildOptions(so);
              break;

            case Array.isArray(formData[parentAttribute.fieldName]) &&
              formData[parentAttribute.fieldName].length > 0:
              const valueArr = formData[parentAttribute.fieldName].map((item) => {
                if (typeof item === 'string') {
                  return item;
                }
                return item.value;
              });
              let co = optionsData
                .filter((item) => valueArr.includes(item.value))
                .map((item) => {
                  return item.child;
                });
              co = co.flat();
              setChildOptions(co);
              break;

            case Array.isArray(formData[parentAttribute.fieldName]) &&
              formData[parentAttribute.fieldName].length === 0:
            case typeof formData[parentAttribute.fieldName] === 'string' &&
              formData[parentAttribute.fieldName] === '':
              let co1 = optionsData.map((item) => {
                return item.child;
              });
              co1 = co1.flat();
              setChildOptions(co1);
              break;
          }
        } else {
          setChildOptions([]);
        }
      } else {
        setChildOptions([]);
      }
    } catch (error) {}
  }, [attribute, parentAttribute, formData, options]);

  const fileOptions = useMemo(() => {
    if (attribute.parentAttribute && attribute.parentAttribute !== '' && !parentAttribute?.id) {
      return [];
    }
    if (parentAttribute && parentAttribute?.id && parentAttribute?.id !== '') {
      return childOptions;
    }
    return options;
  }, [attribute, options, childOptions, parentAttribute]);

  const commonProps = useMemo(() => {
    if (attribute && attribute?.id) {
      const multiple = attribute?.fieldOptions?.multiple === true;

      return {
        // name: attribute.fieldName,
        variant: 'outlined',
        label: attribute.label,
        fullWidth: true,
      };
    }
    return {};
  }, [attribute]);

  if (!attribute?.id || attribute?.id == '') return null;

  switch (attribute.fieldType) {
    case 'lookup':
      const multiple = attribute?.fieldOptions?.multiple === true;
      const hasParent = attribute?.fieldOptions?.multiple === true;
      let currentValue, optValue;
      if (multiple) currentValue = props.value ? props.value : '';
      else currentValue = props.value ? props.value : '';

      if (multiple) {
        return (
          <Form.Field.AutoComplete
            multiple={true}
            {...props}
            {...commonProps}
            options={fileOptions}
            optLabel="label"
            optValue="value"
            value={optionValues}
          />
        );
      }

      return (
        <Form.Field.Select
          multiple={multiple}
          {...props}
          {...commonProps}
          options={fileOptions}
          optLabel="label"
          optValue="value"
          value={multiple && !Array.isArray(currentValue) ? [currentValue] : currentValue}
        />
      );
      break;

    case 'user':
      return (
        <Form.Field.AutoComplete
          {...props}
          {...commonProps}
          options={[]}
          remoteMethod={(val) => {
            return fetchUsersLookup(val);
          }}
          optLabel="name"
          optValue="id"
        />
      );
      break;

    case 'contact':
      return (
        <Form.Field.AutoComplete
          {...commonProps}
          // multiple={false}
          options={[]}
          remoteMethod={(val) => {
            return fetchContactsLookup(val);
          }}
          showAvatar={true}
          optLabel="name"
          optValue="id"
          // multiple={true}
          optAvatar="imageUrl"
          {...props}
        />
      );
      break;

    case 'upload':
      return (
        <>
          <FormLabel>{attribute.label}</FormLabel>
          <Form.Field.File {...commonProps} {...props} />
        </>
      );

      break;

    case 'date':
      return (
        <>
          <Form.Field.Datepicker required={false} {...commonProps} {...props} />
        </>
      );
      break;

    case 'datetime':
      return (
        <>
          <Form.Field.Timepicker {...commonProps} {...props} />
        </>
      );

      break;

    case 'time':
      return (
        <>
          <Form.Field.Timepicker {...commonProps} {...props} />
        </>
      );
      break;

    case 'numeric':
    case 'currency':
      return (
        <>
          <Form.Field.Number {...commonProps} {...props} label={attribute?.label || ''} />
        </>
      );
      break;

    case 'phone':
      const value =
        typeof props.value === 'string' || props.value instanceof String ? props.value : '';
      return (
        <>
          <Form.Field.Phone required={false} {...commonProps} {...props} value={value} />
        </>
      );
      break;

    case 'text':
    default:
      delete props.value;
      return <Form.Field.Input {...props} {...commonProps} />;

      break;
  }

  return null;
};

CustomField.propTypes = {};

export default CustomField;
