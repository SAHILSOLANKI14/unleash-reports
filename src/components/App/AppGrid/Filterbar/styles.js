import styled from 'styled-components';
import Button from 'src/components/shared/Button';

import darkTheme from 'src/config/darkTheme';
const { palette } = darkTheme;

export const RoundedButton = styled(Button)`
  padding: 8px 16px;
  border-radius: 48px;
  background-color: ${(props) => (props.selected ? 'rgba(255, 212, 126, 0.12)' : 'transparent')};
  color: ${(props) =>
    props.selected ? darkTheme.palette.secondary.main : darkTheme.palette.text.secondary};
  &:hover {
    background: rgba(160, 190, 217, 0.08);
  }
`;

export const RoundedButtonGroup = styled(Button)`
  background-color: ${(props) => (props.selected ? 'rgba(255, 212, 126, 0.12)' : 'transparent')};
  color: ${(props) =>
    props.selected ? darkTheme.palette.secondary.main : darkTheme.palette.text.secondary};
  border-color: rgba(255, 255, 255, 0.23);
  border-radius: 48px;
  padding: 0;
  & .MuiButtonBase-root {
    padding: 8px 16px;
    background: transparent;
    border-radius: 48px;
    color: ${(props) =>
      props.selected ? darkTheme.palette.secondary.main : darkTheme.palette.text.secondary};
    &:hover {
      background: transparent;
    }
  }
  & .MuiIconButton-root {
    color: ${(props) =>
      props.selected ? darkTheme.palette.secondary.main : darkTheme.palette.text.secondary};
    border-left: 1px solid ${darkTheme.palette.text.secondary};
    border-radius: 0;
    height: 20px;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    padding: 8px;
    margin-right: 4px;
    &:hover {
      background: transparent;
    }
  }
`;
