import React from 'react';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, Password, Submit } from '@formily/antd';
import { createForm } from '@formily/core';
import * as ICONS from '@ant-design/icons';
import './login.less';
import logo from '../../assets/logo.svg';
import { post, checkUserPath, session } from '../../utils';
import { history, useModel } from 'umi';

const SchemaField = createSchemaField({
  components: { FormItem, Input, Password },
  scope: {
    icon(name) {
      return React.createElement(ICONS[name]);
    },
  },
});
const form = createForm();

export default () => {
  const { setTabPanes, setActiveKey } = useModel('useTabPanes');

  return (
    <div className={'bg'}>
      <div className={'container'}>
        <div className={'name'}>
          <span className={'logo'}>
            <img alt={'logo'} src={logo} style={{ width: '100%' }} />
          </span>
          <span className={'title'}>业绩考核系统</span>
        </div>
        <Form
          form={form}
          layout="vertical"
          size="large"
          onAutoSubmit={async (values) => {
            const data = await post(checkUserPath.login, values);
            if (data) {
              session.setItem('user', data.user);
              session.setItem('menuList', data.menuList);
              form.reset();
              setTabPanes([]);
              setActiveKey('首页');
              history.push('/back');
            }
          }}
        >
          <SchemaField>
            <SchemaField.String
              name="name"
              title="用户名"
              required
              x-decorator="FormItem"
              x-component="Input"
              x-validator={{
                required: true,
              }}
              x-component-props={{
                placeholder: '中文姓名',
                prefix: "{{icon('UserOutlined')}}",
              }}
            />
            <SchemaField.String
              name="password"
              title="密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{
                prefix: "{{icon('LockOutlined')}}",
              }}
            />
          </SchemaField>
          <Submit block size="large">
            登录
          </Submit>
        </Form>
      </div>
    </div>
  );
};
