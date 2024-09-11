// import { Stack } from '@mui/material';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import MobileStepper from '@mui/material/MobileStepper';
// import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material/styles';
// import * as React from 'react';
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// // const images = product.images || []; // Assuming `images` is part of the fetched product data
// const images = [
//   {
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
//   },
//   {
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];

// function SwipeableTextMobileStepper() {
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = images.length;

//   const labels = {
//     0.5: '',
//     1: '',
//     1.5: '',
//     2: '',
//     2.5: '',
//     3: '',
//     3.5: '',
//     4: '',
//     4.5: '',
//     5: '',
//   };
//   const value = 4;
//   const fetchproducts = async () => {
//     console.log('Fetching sales for:');
//     try {
//       const response = await fetchproductData();
//       // const fetchedproductData = response.data;
//       console.log('product res', response);
//       // setSaleDatas(fetchedData);
//       // setTotal(response.total);
//       // dispatch(setSalesData(fetchedData));
//     } catch (error) {
//       //   dispatch(fetchSalesDataFailure(error));
//       console.log('error fetching sales', error);
//     }
//   };
//   React.useEffect(() => {
//     fetchproducts();
//   }, []);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleStepChange = (step) => {
//     setActiveStep(step);
//   };

//   return (
//     <Box sx={{ maxWidth: 200, flexGrow: 1, border: '2px groove', p: 2, borderRadius: '10px' }}>
//       <AutoPlaySwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents
//       >
//         {images.map((step, index) => (
//           <div key={step.label}>
//             {Math.abs(activeStep - index) <= 2 ? (
//               <Box
//                 component="img"
//                 sx={{
//                   height: 180,
//                   display: 'block',
//                   maxWidth: 200,
//                   overflow: 'hidden',
//                   width: '100%',
//                 }}
//                 src={step.imgPath}
//                 alt={step.label}
//               />
//             ) : null}
//           </div>
//         ))}
//       </AutoPlaySwipeableViews>

//       <MobileStepper
//         steps={maxSteps}
//         position="static"
//         activeStep={activeStep}
//         sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//         // nextButton={
//         //   <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
//         //     {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//         //   </Button>
//         // }
//         // backButton={
//         //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
//         //     {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//         //   </Button>
//         // }
//       />
//       <Stack direction={'column'}>
//         <Typography
//           sx={{
//             textAlign: 'center',
//           }}
//         >
//           Title
//         </Typography>
//         <Typography
//           sx={{
//             textAlign: 'center',
//           }}
//         >
//           Price
//         </Typography>
//         {/* <Box
//           sx={{
//             width: 200,
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         > */}
//         <Rating
//           name="text-feedback"
//           value={value}
//           readOnly
//           precision={1}
//           sx={{ p: 2 }}
//           emptyIcon={<StarIcon style={{ opacity: 0.35 }} fontSize="inherit" />}
//         />
//         {/* <Box sx={{ ml: 2 }}>{labels[value]}</Box> */}
//         {/* </Box> */}
//         <Button
//           sx={{
//             textAlign: 'center',
//             background: '#090909',
//             color: '#fff',
//             borderRadius: '5px',
//             fontSize: '14px',
//             fontWeight: 'bold',
//             '&:hover': {
//               backgroundColor: '#333', // Darker shade on hover
//               color: '#fff', // Ensure text remains readable
//               cursor: 'pointer',
//             },
//           }}
//         >
//           Add to cart
//         </Button>
//       </Stack>
//     </Box>
//   );
// }

// export default SwipeableTextMobileStepper;
