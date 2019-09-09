import React, {useState, useContext} from 'react';
import RenderForm from './RenderForm';
import axios from 'axios';
import { Row, Col, Card, Spin, Icon, Form, Empty, Select, Button, notification } from 'antd';
import { ProductContext } from '../../context/ProductContext';


const DynamicForm = (props) => {

  const { productList } = useContext(ProductContext);

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [productSelected, setProduct] = useState('');
  const [productTemplate, setProductTemplate] = useState([]);


  // submit quote request form
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // create obj params
        let quoteRequestObject = {};
        quoteRequestObject.token = token;
        quoteRequestObject.product_name = productSelected;
        quoteRequestObject.client_name = values.client_name;

        let product_details = [];
        for (let [key, value] of Object.entries(values)) {
          // console.log(`${key}: ${value}`);
          if (key !== 'client_name') {
            if (Array.isArray(value)) {
              value = value[0];
            }
            product_details.push({label: key, value})
          }
        }

        quoteRequestObject.product_details = product_details;
        const quoteString = JSON.stringify(quoteRequestObject);
        const quoteParams = window.btoa(quoteString);

        setLoading(true);

        axios({
          method: 'POST',
          url: `https://18.216.248.32/api/sales/quote`,
          data: quoteParams,
          responseType: 'blob'
        })
          .then(response => {
            //const res = JSON.parse(window.atob(response.data));
            console.log(response.data);

            //Create a Blob from the PDF Stream
            const file = new Blob(
              [response.data],
              { type: 'application/pdf' });

            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);

            //Open the URL on new Window
            window.open(fileURL);

            setLoading(false);

          })
          .catch(error => {
            notification['error']({
              placement: 'bottomRight',
              message: 'Fail',
              description: `${error}`,
            });

            console.log(error);
            setLoading(false);
          })

      } else {
        console.log('error', err);
      }
    });
  };

  // Handle product changes
  // Call fields for this product
  const handleProductChange = product => {

    setProductTemplate([]);

    const {token} = JSON.parse(sessionStorage.getItem ('data'));
    setToken(token);
    const request = `{"token":"${token}","product_name":"${product}"}`;

    setLoading(true);

    const params = window.btoa(request);

    axios({
      method: 'GET',
      url: `https://18.216.248.32/api/sales/product?request=${params}`,
    })
    .then(response => {
      const res = JSON.parse(window.atob(response.data));
      setProductTemplate(res);
      setProduct(product);
      setLoading(false);
    })
    .catch(error => {
      notification['error']({
        placement: 'bottomRight',
        message: 'Fail',
        description: `${error}`,
      });

      console.log(error);
      setLoading(false);
    })
  }

  const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const renderCardTitle = () => {
    return productList ?
    (
      <div className="d-flex flex-row align-items-center">
        <div className="ant-card-head-tirle pr-3">Products:</div>
        <Select
          disabled={loading}
          loading={loading}
          style={{ width: 250 }}
          onChange={handleProductChange}
        >
          {productList.map((product, index) => <Option key={index} value={product}>{product}</Option>)}
        </Select>
      </div>
    ) :
    (
      <Spin indicator={loadingIcon} />
    )
  }


  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const { Option } = Select;

  return (
    <div>
      <Row>
        <Col span={18} offset={3}>
          <Card title={renderCardTitle()} bordered={false}>{
            productSelected ?
            (
              <Form {...formItemLayout} onSubmit={handleSubmit} >
                <RenderForm products={productTemplate} getFieldDecorator={getFieldDecorator} />
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
                </Form.Item>
              </Form>
            ) :
            (
            <Empty image = {Empty.PRESENTED_IMAGE_SIMPLE}>
              <span>Select a product above</span>
            </Empty>
            )
          }
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Form.create()(DynamicForm);