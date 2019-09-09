import React, { useContext, useState } from 'react';
import { Row, Col, Card, Form, Icon, Input, Button, Tooltip, notification  } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { ADD_PRODUCT_LIST } from '../../reducers/ProductReducer';
import logo from '../../style/images.png'

const SignIn = (props) => {

  const {dispatch} = useContext(ProductContext);

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);



  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);

        const loginCredentials = `{"user":"${values.user}","password":"${values.password}"}`

        const params = window.btoa(loginCredentials);
        axios({
          method: 'GET',
          url: `https://18.216.248.32/api/sales/login?request=${params}`,
        })
        .then(response => {
          const {token, product_list} = JSON.parse(window.atob(response.data));
          sessionStorage.setItem('session', 'true')
          sessionStorage.setItem('data', JSON.stringify({ "token": token, "product_list": product_list }));
          dispatch({ type: ADD_PRODUCT_LIST, "productList": product_list});

          setRedirect(true);
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
    });
  };

  const { getFieldDecorator } = props.form;

  return redirect ?
        (<Redirect to = "/products" />) :
        (

          <div id="app__login"
            className="d-flex flex-column justify-content-center align-items-center">
            <Row style={{width: '448px'}}>
              <Col span={20} offset={2}>
                <Card
                  style={{borderRadius: '10px', borderColor: '#ddd', minHeight: '60vh', padding: "1rem" }}
                >
                  <div
                    className="d-flex flex-row align-items-center"
                    style={{textAlign: "center", fontSize: "18px"}}>
                    <img src={logo} width="56" height="56" className="d-inline-block align-top" alt="FTTI." />
                    Smart Business Solutions
                  </div>

                  <h1
                    style={{textAlign: "center", fontSize: "24px", color: "#202124", margin: "1.5rem 0"}}>
                    SingIn here!
                  </h1>

                  <Form
                    className="login-form"
                    onSubmit={handleSubmit}
                  >
                    <Form.Item style={{marginBottom: '1.7rem'}}>
                      {getFieldDecorator('user', {
                        initialValue: "Admin",
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input
                          disabled={loading}
                          autoFocus
                          size="large"
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="Username"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        initialValue: "Password",
                        rules: [{ required: true, message: 'Please input your password!' }],
                      })(
                        <Input.Password
                          disabled={loading}
                          size="large"
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="Password"
                        />,
                      )}
                    </Form.Item>
                    <div className="d-flex flex-row justify-content-between align-items-center pt-4">
                      <Tooltip title={`user: Admin
                      password: Password`}>
                        <span style={{fontWeight: 700, color: "#3366cc"}} className="login-form-forgot">
                          Forgot password?
                        </span>
                      </Tooltip>
                      <Button type="primary" htmlType="submit" loading={loading}>
                        Log in
                      </Button>
                    </div>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div >
        )

}

export default Form.create()(SignIn);