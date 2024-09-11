import React, { useState } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import { ListItem as StyledListItem, SubListItem } from './styles';

function Item({ item, pathname }) {
  const navigate = useNavigate();
  const isActive = pathname === item.link;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (item.children) {
      setOpen(!open);
    } else {
      navigate(item.link);
    }
  };
  const isSubItemActive = (subItemLink) => pathname === subItemLink;
  return (
    <>
      <StyledListItem className={isActive ? 'active' : ''} onClick={handleClick} disableRipple>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
      </StyledListItem>
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((subItem) => (
              <SubListItem
                className={isSubItemActive(subItem.link) ? 'active' : ''}
                key={subItem.link}
                onClick={() => {
                  navigate(subItem.link);
                }}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>{subItem.icon}</ListItemIcon>
                <ListItemText primary={subItem.title} />
              </SubListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default Item;
