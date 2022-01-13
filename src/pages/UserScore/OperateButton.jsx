import { Button, message, Modal, Space } from 'antd';
import { get, post, userScorePath } from '../../utils';
import { FormButtonGroup, FormDialog } from '@formily/antd';
import { LoadingButton } from '../../components';
import Form11 from './Form11';
import Form22 from './Form22';
import _ from 'lodash';

export default (props) => {
  const { record, actionRef } = props;

  const getForm = (form) => {
    if (record.userrType === '一般人员') {
      return <Form11 form={form} record={record} />;
    } else {
      return <Form22 form={form} record={record} />;
    }
  };

  const onClick = async () => {
    let dialog = FormDialog(
      {
        title: '个人评分',
        footer: null,
        keyboard: false,
        maskClosable: false,
      },
      (form) => {
        form.setValues(record);
        return (
          <>
            {getForm(form)}
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form.submit();
                    if (values) {
                      //
                      let weightArr,
                        totalScore = 0;
                      if (record.userrType === '一般人员') {
                        weightArr = [0.1, 0.1, 0.1, 0, 0.15, 0.15, 0.4];
                        for (let i = 0; i <= 5; i++) {
                          if (i >= 3) {
                            totalScore +=
                              values.arr[i]['score'] * weightArr[i + 1];
                            record['score' + (i + 1)] = values.arr[i]['score'];
                          } else {
                            totalScore += values.arr[i]['score'] * weightArr[i];
                            record['score' + i] = values.arr[i]['score'];
                          }
                        }
                        record['score3'] = 0;
                        record['totalScore'] = totalScore;
                        record['status'] = '已评分';
                      } else {
                        weightArr = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4];
                        for (let i = 0; i <= 6; i++) {
                          totalScore += values.arr[i]['score'] * weightArr[i];
                          record['score' + i] = values.arr[i]['score'];
                        }
                        record['totalScore'] = totalScore;
                        record['status'] = '已评分';
                      }
                      if (record.scoreType === '行政评分') {
                        //优秀率
                        let scoreList = await get(userScorePath.getScoreList2, {
                          id: record.id,
                          userrType: record.userrType,
                          checkkObject: record.checkkObject,
                        });
                        if (scoreList && scoreList.length >= 5) {
                          console.log(scoreList);
                          scoreList.push(record);
                          console.log(scoreList);
                          let count11 = scoreList.length,
                            count22 = 0;
                          scoreList.forEach((item) => {
                            if (
                              item.status === '已评分' &&
                              item.totalScore >= 90
                            ) {
                              count22 += 1;
                            }
                          });
                          console.log('总数：' + count11);
                          console.log('优秀人数：' + count22);
                          let tip;
                          if (
                            record.checkkObject === '副总师级' ||
                            record.checkkObject === '部门正职领导'
                          ) {
                            tip = '副总师级+部门正职领导';
                          } else if (record.checkkObject === '部门副职领导') {
                            tip = '部门副职领导';
                          } else {
                            tip = '一般人员';
                          }
                          if (count22 / count11 > 0.25) {
                            Modal.error({
                              width: 650,
                              content: `${tip}的优秀率，不能超过20%，优秀人数(${_.round(
                                count11 * 0.2,
                              )}人)=总人数(${count11}人)*0.2`,
                              okText: '知道了',
                            });
                            return;
                          }
                        }
                      }
                      //
                      const data = await post(userScorePath.edit2, record);
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
  };

  const renderButton = () => {
    return (
      <Space size={'middle'}>
        <a
          onClick={() => {
            onClick();
          }}
        >
          {record.userrName}
        </a>
      </Space>
    );
  };

  return <>{renderButton()}</>;
};
