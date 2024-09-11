import React from 'react';
import PropTypes from 'prop-types';
import iconConfig from './icons';

const propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  name: '',
  size: 0,
};

const MyDynamicIcon = ({ name, size, ...props }) => {
  const IconComponent = iconConfig[name];
  if (!IconComponent) return null;

  let styles = {
    ...(props?.style ? props?.style : {}),
  };
  if (size && size > 0) {
    styles = {
      ...styles,
      width: `${size}px`,
      height: `${size}px`,
    };
  }

  return <IconComponent {...props} style={styles} />;
};

MyDynamicIcon.propTypes = propTypes;
MyDynamicIcon.defaultProps = defaultProps;

export default MyDynamicIcon;
