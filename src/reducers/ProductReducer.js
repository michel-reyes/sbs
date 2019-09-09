export const ADD_PRODUCT_LIST = "ADD_PRODUCT_LIST";

export const ProductReducer = (productList, action) => {
  console.log(productList, action);
  switch (action.type) {
    case ADD_PRODUCT_LIST:
      return action.productList

    default:
      break;
  }
  return productList;
}