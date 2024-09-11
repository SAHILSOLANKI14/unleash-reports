import reactCSS from 'reactcss';
import styled from 'styled-components';

export const Color = styled.div`
  width: 36px;
  height: 20px;
  border-radius: 2px;
  /* background: #dddddd; */
  background-color: ${(props) => props.color};
`;

export const Swatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

export const styles = reactCSS({
  default: {
    color: {
      width: '36px',
      height: '14px',
      borderRadius: '2px',
      background: `#dddddd`,
    },
    swatch: {
      padding: '5px',
      background: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: '2',
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  },
});
