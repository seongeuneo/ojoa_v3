// useProductList.js

import { useEffect, useState } from 'react';
import axios from 'axios';

export const useProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/productList')
      .then((response) => {
        setData(response.data);
        console.log("서버연결성공 => ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return data;
};



