// src/components/Listsupplier.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppGrid from 'src/components/App/AppGrid';
import {
  fetchSupplierRequest,
  fetchSupplierSuccess,
  fetchSupplierFailure,
} from '../Store/SupplierAction';
import SupplierSearch from './supplierSearch';
import { fetchCustomerData } from 'src/modules/Customer/api/CustomerApi';
const columns = [
  {
    name: 'Company',
    selector: (row) => row.Company,
    sortable: true,
    reorder: true,
  },
  {
    name: 'Name',
    selector: (row) => row.Name,
    sortable: true,
    reorder: true,
  },
  {
    name: 'Email_Address',
    selector: (row) => row.Email_Address,
    sortable: true,
    reorder: true,
  },
  {
    name: 'Phone',
    selector: (row) => row.Phone || 'N/A',
    sortable: true,
    reorder: true,
  },
  {
    name: 'City',
    selector: (row) => row.City || 'N/A',
    sortable: true,
    reorder: true,
  },
  {
    name: 'County',
    selector: (row) => row.County || 'N/A',
    sortable: true,
    reorder: true,
  },
  {
    name: 'Action',
    // Customize your action column if needed
  },
];

const Listsupplier = () => {
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchparam, setSearchparam] = useState('');
  const [total, setTotal] = useState('');
  const fetchSupplier = async (pageNo, perPage, search = '') => {
    console.log('Fetching products for:', { pageNo, perPage, search });
    try {
      const start = pageNo * perPage + 1;
      const limit = perPage;
      const data = 'supplier';
      const response = await fetchCustomerData(start, limit, search, data);

      const fetchedData = response.data;
      setSupplier(fetchedData);
      setTotal(response.total);
      dispatch(fetchSupplierSuccess(fetchedData));
    } catch (error) {
      console.error('Error fetching products data:', error);
      dispatch(fetchSupplierFailure(error));
    }
  };

  useEffect(() => {
    fetchSupplier(pageNo, perPage, searchparam);
  }, [pageNo, perPage, searchparam]);

  const onTableChange = ({ pageNo, perPage }) => {
    fetchSupplier(pageNo, perPage, searchparam);
    setPageNo(pageNo);
    setPerPage(perPage);
  };
  const handleSearch = (search) => {
    fetchSupplier(pageNo, perPage, search);
    setSearchparam(search);
  };
  // Prepare data for the grid
  const Data = supplier.map((sale) => ({
    id: sale.id,
    Company: sale.company,
    Name: sale.person,
    Email_Address: sale.email,
    Phone: sale.phone || 'N/A',
    City: sale.city || 'N/A',
    County: sale.county || 'N/A',
  }));
  const options = {
    pagination: true,
    serverSide: true,
    page: pageNo,
    rowsPerPage: perPage,
    count: total,
    selectableRows: 'multiple',
    selectableRowsHeader: true,
  };

  return (
    <>
      <SupplierSearch onSearch={handleSearch} />
      <AppGrid data={Data} columns={columns} options={options} onTableChange={onTableChange} />
    </>
  );
};

export default Listsupplier;
