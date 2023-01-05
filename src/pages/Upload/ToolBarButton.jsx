import React from 'react';
import { Button, message, Modal, Space } from 'antd';
import { get, post, uploadPath } from '../../utils';
import { LoadingButton } from '../../components';
import {
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { FormButtonGroup, FormDialog } from '@formily/antd';
import Form from './Form';

export default (props) => {
  const { actionRef, selectedRowKeys } = props;

  const onClick = async (type) => {
    if (type === 'add') {
      let dialog = FormDialog(
        {
          title: '述职材料',
          footer: null,
          keyboard: false,
          maskClosable: false,
        },
        (form) => {
          return (
            <>
              <Form form={form} dialog={dialog} />
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'right'}>
                  <Button onClick={() => dialog.close()}>取消</Button>
                  <LoadingButton
                    onClick={async () => {
                      const values = await form.submit();
                      if (values) {
                        const data = await post(uploadPath.add, values);
                        if (data) {
                          actionRef.current.clearSelected();
                          actionRef.current.reload();
                          dialog.close();
                          message.success('上传成功');
                        }
                      }
                    }}
                    type={'primary'}
                  >
                    确定
                  </LoadingButton>
                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          );
        },
      );
      dialog.open({});
    } else if (type === 'delete') {
      if (selectedRowKeys.length === 0) {
        message.error('至少选择一条数据');
        return;
      }
      Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        icon: <QuestionCircleOutlined />,
        content: (
          <p style={{ fontSize: 16 }}>
            确定要删除{selectedRowKeys.length}条数据?
          </p>
        ),
        onOk: async (close) => {
          const data = await get(uploadPath.delete, { arr: selectedRowKeys });
          if (data) {
            actionRef.current.clearSelected();
            actionRef.current.reload();
            close();
            message.success('删除成功');
          }
        },
      });
    }
  };

  const renderButton = () => {
    return (
      <Space>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            onClick('add');
          }}
        >
          新增
        </Button>
        {/*<Button*/}
        {/*  icon={<DeleteOutlined />}*/}
        {/*  type="primary"*/}
        {/*  onClick={() => {*/}
        {/*    onClick('delete');*/}
        {/*  }}*/}
        {/*>*/}
        {/*  批量删除*/}
        {/*</Button>*/}
      </Space>
    );
  };

  return <>{renderButton()}</>;
};
