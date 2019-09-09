import React from 'react';

import {
  Form,
  Select,
  Checkbox,
  Input,
  Row,
  Col
} from 'antd';

const { Option } = Select;

const formatFieldName = (title) => {
  return title.replace(/\s+/g, '-')
}

const createField = (field, getFieldDecorator) => {
  switch (field.type) {
    case "combobox":
      return (
        <>
          <Form.Item label={field.label}>
            {getFieldDecorator(formatFieldName(field.label), {
              initialValue: field.defaultvalue,
              rules: [{
                required: field.defaultvalue ? true : false,
                message: `Please select a ${field.label}`
              }],
            })(
              <Select
                showSearch
                placeholder={`Please select a ${field.label}`}
              >
                {field.values.map((val, idx) => <Option key={idx} value={val}>{val}</Option>)}
              </Select>,
            )}
          </Form.Item>
        </>
      )

    case "checkbox":
      return (
        <Form.Item label={field.label}>
          {getFieldDecorator(formatFieldName(field.label), {
            initialValue: [field.defaultvalue],
            rules: [{
              required: field.defaultvalue ? true : false,
            }],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {
                  field.values.map((val, idx) => {
                    return (
                      <Col key={idx} span={24}>
                        <Checkbox value={val}>{val}</Checkbox>
                      </Col>
                    )
                  })
                }
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
      )

    default:
      break;
  }
}

const RenderForm = ({ products, getFieldDecorator }) => {

  const fields = products && products.product_template;

  return fields && fields.length ? (
    <React.Fragment>
      <Form.Item label="Client name">
        {getFieldDecorator("client_name", {
          rules: [{
            required: true,
            message: "Please select a client's name"
          }],
        })(
          <Input size="large" placeholder="Client name" />
        )}
      </Form.Item>
      {
      fields.map((field, index) => {
        return (
          <React.Fragment key={index}>
            { createField(field, getFieldDecorator) }
          </React.Fragment>
        )
      })}
    </React.Fragment>)
   :
  ('loading...');


}

export default RenderForm;