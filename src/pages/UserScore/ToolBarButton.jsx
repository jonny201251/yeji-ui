import { Button, message, Modal, Space } from 'antd';
import React from 'react';
import { FormButtonGroup, FormDialog } from '@formily/antd';
import Form1 from './Form1';
import Form2 from './Form2';
import { LoadingButton } from '../../components';
import { get, post, session, uploadPath, userScorePath } from '../../utils';
import _ from 'lodash';
import ImportForm from './ImportForm';

export default (props) => {
  let { actionRef } = props;

  const getForm = (form, record, checkkObject) => {
    let user = session.getItem('user');
    if (
      user.userType === '公司领导' ||
      user.userRole === '安全生产总监' ||
      user.userRole === '副总师级' ||
      user.userRole === '财务副总监' ||
      user.userRole === '二级专务'
    ) {
      return <Form2 form={form} record={record} checkkObject={checkkObject} />;
    } else {
      return <Form1 form={form} record={record} checkkObject={checkkObject} />;
    }
  };

  return (
    <Space>
      <Button
        onClick={async () => {
          const record = await get(userScorePath.getScoreList);
          const checkkObject = await get(userScorePath.getCheckkObject);
          if (record && checkkObject) {
            let dialog = FormDialog(
              {
                title: '批量评分',
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
                    {getForm(form, record, checkkObject)}
                    <FormDialog.Footer>
                      <FormButtonGroup gutter={16} align={'right'}>
                        <Button onClick={() => dialog.close()}>取消</Button>
                        <LoadingButton
                          onClick={async () => {
                            const values = await form.submit();
                            if (values) {
                              //计算得分
                              values.scoreList.forEach((item) => {
                                let weightArr;
                                if (item.userrType === '一般人员') {
                                  weightArr = [
                                    0.1, 0.1, 0.1, 0, 0.15, 0.15, 0.4,
                                  ];
                                  item['score3'] = 0;
                                } else {
                                  weightArr = [
                                    0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4,
                                  ];
                                }
                                let totalScore = 0;
                                for (let i = 0; i <= 6; i++) {
                                  if (item['score' + i]) {
                                    totalScore +=
                                      (item['score' + i] || 0) * weightArr[i];
                                  }
                                }
                                item.totalScore = totalScore;
                                item.status = '已评分';
                              });
                              /*
                              优秀率不能超过20%
                              类型：副总师级+部门正职领导、部门副职领导、一般人员
                              得分：90分以上
                           */
                              //人数，90分以上人数
                              let count11 = 0,
                                count22 = 0,
                                count33 = 0,
                                count44 = 0,
                                count55 = 0,
                                count66 = 0;
                              values.scoreList.forEach((item) => {
                                if (item.scoreType !== '党务评分') {
                                  if (
                                    item.checkkObject === '副总师级' ||
                                    item.checkkObject === '部门正职领导'
                                  ) {
                                    count11 += 1;
                                    if (item.totalScore >= 90) {
                                      count22 += 1;
                                    }
                                  } else if (
                                    item.checkkObject === '部门副职领导'
                                  ) {
                                    count33 += 1;
                                    if (item.totalScore >= 90) {
                                      count44 += 1;
                                    }
                                  } else {
                                    count55 += 1;
                                    if (item.totalScore >= 90) {
                                      count66 += 1;
                                    }
                                  }
                                }
                              });
                              if (count11 >= 5) {
                                if (count22 / count11 > 0.25) {
                                  Modal.error({
                                    width: 650,
                                    content: `副总师级+部门正职领导的优秀率，不能超过20%，优秀人数(${_.round(
                                      count11 * 0.2,
                                    )}人)=总人数(${count11}人)*0.2`,
                                    okText: '知道了',
                                  });
                                  return;
                                }
                              }
                              if (count33 >= 5) {
                                if (count44 / count33 > 0.25) {
                                  Modal.error({
                                    width: 650,
                                    content: `部门副职领导的优秀率，不能超过20%，优秀人数(${_.round(
                                      count33 * 0.2,
                                    )}人)=总人数(${count33}人)*0.2`,
                                    okText: '知道了',
                                  });
                                  return;
                                }
                              }
                              if (count55 >= 5) {
                                if (count66 / count55 > 0.25) {
                                  Modal.error({
                                    width: 650,
                                    content: `一般人员的优秀率，不能超过20%，优秀人数(${_.round(
                                      count55 * 0.2,
                                    )}人)=总人数(${count55}人)*0.2`,
                                    okText: '知道了',
                                  });
                                  return;
                                }
                              }
                              const data = await post(
                                userScorePath.edit,
                                values,
                              );
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
          }
        }}
        type={'primary'}
      >
        批量评分
      </Button>
      <Button
        onClick={() => {
          window.location.href = userScorePath.download1;
          return;
        }}
        type={'primary'}
      >
        导出评分模板
      </Button>
      <Button
        onClick={async () => {
          let dialog = FormDialog(
            {
              title: '导入评分模板',
              footer: null,
              keyboard: false,
              maskClosable: false,
            },
            (form) => {
              return (
                <>
                  <ImportForm form={form} dialog={dialog} />
                  <FormDialog.Footer>
                    <FormButtonGroup gutter={16} align={'right'}>
                      <Button onClick={() => dialog.close()}>取消</Button>
                      <LoadingButton
                        onClick={async () => {
                          const values = await form.submit();
                          if (values) {
                            const data = await post(
                              userScorePath.edit3,
                              values,
                            );
                            if (data) {
                              actionRef.current.clearSelected();
                              actionRef.current.reload();
                              dialog.close();
                              message.success('导入成功');
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
        导入评分模板
      </Button>
    </Space>
  );
};
