import { Button, message, Space } from 'antd'
import { env, post, get } from '../utils'
import { FormButtonGroup, FormDialog } from '@formily/antd'
import { LoadingButton } from './index'

export default (props) => {
  const { record, path, actionRef, width = 520, rowKey } = props

  const onClick = async (type) => {
    if (type === 'edit') {
      let params = {}
      params[rowKey || 'id'] = record[rowKey || 'id']
      const dbRecord = await get(path.get, params)
      if (dbRecord) {
        let dialog = FormDialog({ title: '编辑', footer: null, keyboard: false, maskClosable: false, width }, (form) => {
          form.setValues(dbRecord)
          return (
            <>
              <path.Form form={form} type={type} record={dbRecord} dialog={dialog}/>
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'right'}>
                  <Button onClick={() => dialog.close()}>取消</Button>
                  <LoadingButton onClick={async () => {
                    const values = await form.submit()
                    if (values) {
                      const data = await post(path.edit, values)
                      if (data) {
                        actionRef.current.clearSelected()
                        actionRef.current.reload()
                        dialog.close()
                        message.success('编辑成功')
                      }
                    }
                  }} type={'primary'}>编辑</LoadingButton>

                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          )
        })
        dialog.open()
      }
    } else if (type === 'preview') {
      let params = {}
      params[rowKey || 'id'] = record[rowKey || 'id']
      const dbRecord = await get(path.get, params)
      if (dbRecord) {
        let dialog = FormDialog({ title: '浏览', footer: null, keyboard: false, maskClosable: false, width }, (form) => {
          form.setValues(dbRecord)
          return (
            <>
              <path.Form form={form} type={type} record={dbRecord} dialog={dialog}/>
            </>
          )
        })
        dialog.open({ pattern: 'disabled' })
      }
    }
  }

  const renderButton = () => {
    if (env === 'dev') {
      return <Space size={'middle'}>
        <a onClick={() => {
          onClick('edit')
        }}>编辑</a>
        <a onClick={() => {
          onClick('preview')
        }}>浏览</a>
      </Space>
    }
  }

  return <>{renderButton()}</>
}
