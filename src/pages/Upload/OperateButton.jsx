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
          title: '述职材料',
          footer: null,
          keyboard: false,
          maskClosable: false,
        },
        (form) => {
          form.setValues(dbRecord);
          if (dbRecord.year === 2022) {
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
          } else {
            return (
              <>
                <Form form={form} record={dbRecord} dialog={dialog} />
              </>
            );
          }
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
