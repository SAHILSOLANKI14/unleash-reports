import React, { useEffect, useState } from 'react';

const AbbreviationsContainer = () => {
  const [decodedContent, setDecodedContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API URL
        const apiUrl = 'https://dev.unleashpos.com/api.php?action=get_page&id=1&customer_id=860';

        // Fetch the data
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('res', response);
        // Decode the base64 data
        if (data && data.data) {
          const decoded = atob(data.data);
          setDecodedContent(decoded);
        } else {
          setError('No content available in response.');
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div style={{ padding: '20px' }}>
      {/* <h2>Product Abbreviations</h2> */}
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: decodedContent }}
          style={{
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
          }}
        ></div>
      )}
    </div>
  );
};

export default AbbreviationsContainer;
