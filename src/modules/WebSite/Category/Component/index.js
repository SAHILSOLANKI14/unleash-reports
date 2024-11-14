// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategoriesRequest } from '../store/categoryActions';
// import { Box, Button, Menu, MenuItem, AppBar, Toolbar, CircularProgress } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// function CustomHeader() {
//   const dispatch = useDispatch();
//   const { categories, loading } = useSelector((state) => state.category);
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCategoriesRequest());
//   }, [dispatch]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box>
//     <Button color="primary" onClick={handleCategoryMenuOpen} startIcon={<MenuIcon />}>
//       All Categories
//     </Button>
//     <Menu
//       anchorEl={anchorEl}
//       open={Boolean(anchorEl)}
//       onClose={handleCategoryMenuClose}
//       PaperProps={{
//         style: {
//           maxHeight: 400,
//           width: '250px',
//         },
//       }}
//     >
//       {loading ? (
//         <MenuItem>Loading...</MenuItem>
//       ) : (
//         categories.map((category) => (
//           <div key={category.id}>
//             <MenuItem onClick={() => handleCategoryClick(category.id)}>
//               {category.name}
//               {openCategories[category.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </MenuItem>
//             {category.child && (
//               <Collapse in={openCategories[category.id]} timeout="auto" unmountOnExit>
//                 <Box pl={2}>
//                   {category.child.map((child) => (
//                     <MenuItem key={child.id}>{child.name}</MenuItem>
//                   ))}
//                 </Box>
//               </Collapse>
//             )}
//           </div>
//         ))
//       )}
//     </Menu>
//   </Box>

//     //   </Toolbar>
//     // </AppBar>
//   );
// }

// export default CustomHeader;
