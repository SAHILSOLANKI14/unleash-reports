import React, { useState, useEffect } from 'react';
import { Box, Button, Collapse, Menu, MenuItem } from '@mui/material';
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesRequest } from '../store/categoriesAction';
import { useNavigate } from 'react-router-dom';

const CategoryMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCategories, setOpenCategories] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories = [], loading } = useSelector((state) => ({
    categories: state.category.categories || [],
    loading: state.category.loading,
  }));

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleCategoryMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = async (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const toggleSubcategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
    navigate(`/category/${categoryId}`);
  };

  return (
    <>
      <Button color="primary" onClick={handleCategoryMenuOpen} startIcon={<ExpandMoreIcon />}>
        All Categories
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCategoryMenuClose}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: '250px',
          },
        }}
      >
        {loading ? (
          <MenuItem>Loading...</MenuItem>
        ) : (
          categories.map((category) => (
            <div key={category.id}>
              <MenuItem
                sx={{ fontSize: '14px', fontWeight: '600' }}
                onClick={() => toggleSubcategory(category.id)}
              >
                {category.name}
                {openCategories[category.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              {category.child && (
                <Collapse in={openCategories[category.id]} timeout="auto" unmountOnExit>
                  <Box pl={2}>
                    {category.child.map((child) => (
                      <MenuItem
                        sx={{ fontSize: '14px', fontWeight: '600' }}
                        key={child.id}
                        onClick={() => handleCategoryClick(child.id)}
                      >
                        {child.name}
                      </MenuItem>
                    ))}
                  </Box>
                </Collapse>
              )}
            </div>
          ))
        )}
      </Menu>
    </>
  );
};

export default CategoryMenu;
