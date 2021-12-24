import { Button, message, Space } from 'antd';
import { get, post, uploadPath } from '../../utils';
import { FormButtonGroup, FormDialog } from '@formily/antd';
import { LoadingButton } from '../../components';
import Form from './Form';

export default (props) => {
  const { record, actionRef } = props;

  const onClick = async () => {
    const dbRecord = await get(uploadPath.get, { year: record.year });
    if (dbRecord) {
      let dialog = FormDialog(
        {
          title: '编辑',
          footer: null,
          keyboard: false,
          maskClosable: false,
        },
        (form) => {
          form.setValues(dbRecord);
          return (
            <>
              <Form form={form} record={dbRecord} dialog={dialog} />
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'right'}>
                  <Button onClick={() => dialog.close()}>取消</Button>
                  <LoadingButton
                    onClick={async () => {
                      const values = await form.submit();
                      if (values) {
                        const data = await post(uploadPath.edit, values);
                        if (data) {
                          actionRef.current.clearSelected();
                          actionRef.current.reload();
                          dialog.close();
                          message.success('编辑成功');
                        }
                      }
                    }}
                    type={'primary'}
                  >
                    编辑
                  </LoadingButton>
                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          );
        },
      );
      dialog.open();
    }
  };

  const renderButton = () => {
    return (
      <Space size={'middle'}>
        <a
          onClick={() => {
            onClick();
          }}
        >
          {record.name}
        </a>
      </Space>
    );
  };

  return <>{renderButton()}</>;
};
