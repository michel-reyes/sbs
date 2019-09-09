import React, { createContext, useReducer } from 'react';
import { ProductReducer } from '../reducers/ProductReducer';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

  const [productList, dispatch] = useReducer(ProductReducer, [], () => {
    // initial state
    let localData = sessionStorage.getItem('data');
    return localData ? JSON.parse(localData).product_list : [];
  });

  return (
    <ProductContext.Provider value={{ productList, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;