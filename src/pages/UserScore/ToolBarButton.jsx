import { Button, message, Modal } from 'antd';
import React from 'react';
import { FormButtonGroup, FormDialog } from '@formily/antd';
import Form from './Form';
import { LoadingButton } from '../../components';
import { post, userScorePath } from '../../utils';

export default (props) => {
  let { record, actionRef } = props;

  const computeScore = (values) => {
    values.scoreList.forEach((item) => {
      let weightArr;
      if (item.userrType === '一般人员') {
        weightArr = [0.1, 0.1, 0.1, 0, 0.15, 0.15, 0.4];
        item['score3'] = 0;
      } else {
        weightArr = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4];
      }
      let totalScore = 0;
      for (let i = 0; i <= 6; i++) {
        if (item['score' + i]) {
          totalScore += (item['score' + i] || 0) * weightArr[i];
        }
      }
      item.totalScore = totalScore;
      item.status = '已评分';
    });
  };

  return (
    <Button
      onClick={() => {
        let dialog = FormDialog(
          {
            title: '人员评分',
            footer: null,
            keyboard: false,
            maskClosable: false,
            width: '98%',
            style: { top: 30 },
          },
          (form) => {
            form.setValues({ scoreList: record });
            return (
              <>
                <Form form={form} record={record} />
                <FormDialog.Footer>
                  <FormButtonGroup gutter={16} align={'right'}>
                    <Button onClick={() => dialog.close()}>取消</Button>
                    <LoadingButton
                      onClick={async () => {
                        const values = await form.submit();
                        if (values) {
                          //得分
                          computeScore(values);
                          //优秀率，一般人员人数，一般人员的得分>=90的人数
                          let commonCount = 0,
                            commonCount2 = 0,
                            middleCount = 0,
                            middleCount2 = 0;
                          values.scoreList.forEach((item) => {
                            if (
                              item.scoreType !== '党务评分' &&
                              item.userrType !== '公司领导'
                            ) {
                              if (item.userrType === '一般人员') {
                                commonCount += 1;
                                if (item.totalScore >= 90) {
                                  commonCount2 += 1;
                                }
                              } else if (item.userrType === '中层领导') {
                                middleCount += 1;
                                if (item.totalScore >= 90) {
                                  middleCount2 += 1;
                                }
                              }
                            }
                          });
                          if (middleCount >= 5) {
                            if (middleCount2 / middleCount > 0.2) {
                              Modal.error({
                                content:
                                  '中层领导的优秀率（90分以上为优秀），不能超过20%',
                                okText: '知道了',
                              });
                              return;
                            }
                          }
                          if (commonCount >= 5) {
                            if (commonCount2 / commonCount > 0.2) {
                              Modal.error({
                                content:
                                  '一般人员的优秀率（90分以上为优秀），不能超过20%',
                                okText: '知道了',
                              });
                              return;
                            }
                          }
                          const data = await post(userScorePath.edit, values);
                          if (data) {
                            actionRef.current.reload();
                            dialog.close();
                            message.success('评分成功');
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
        dialog.open();
      }}
      type={'primary'}
    >
      人员评分
    </Button>
  );
};
