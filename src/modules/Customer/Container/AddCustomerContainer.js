import React from 'react';
import CustomerDialog from '../Component/CustomerDialog';

const AddCustomerContainer = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  return <CustomerDialog open={openPopup} handleClose={handleClosePopup} />;
};

export default AddCustomerContainer;
