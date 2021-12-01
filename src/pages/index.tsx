import '@/layouts/global.less'
import React, {createContext, useContext} from 'react'
import {FormButtonGroup, FormDialog, Reset, Submit} from '@formily/antd'
import {Button, Space} from 'antd'
import Form from './Form'
import {useModel} from 'umi'

const Context = createContext({})

const PortalId = '可以传，也可以不传的ID，默认是form-dialog'


export default () => {

  const {a, setA} = useModel('useUser')
  return (
    <Context.Provider value="自定义上下文可以直接传到弹窗内部，只需要ID一致即可">
      <FormDialog.Portal id={PortalId}>
        <Button
          onClick={() => {
            let aa = FormDialog({title: '标题', footer: null, keyboard: false, maskClosable: false}, PortalId, (form) => {
              return (
                <>
                  <Form form={form}/>
{/*                  <FormDialog.Footer>
                    <div style={{textAlign: 'right'}}>
                      <Space>
                        <Button onClick={async () => {
                          let aa = await form.validate()
                          console.log(aa);
                          console.log(form.values)
                        }}>aa</Button>
                        <Button>bb</Button>
                      </Space>
                    </div>
                  <FormDialog.Footer>*/}
                  <FormDialog.Footer>
                      <FormButtonGroup gutter={24} align={'center'}>
                        <Submit onSubmit={(values)=>{
                          console.log(values);
                          aa.close()
                        }}>提交</Submit>
                        <Reset>重置</Reset>
                      </FormButtonGroup>
                    </FormDialog.Footer>
                </>
              )
            })
            aa.open()
            setA('a')
          }}
        >
          点我打开表单
        </Button>
      </FormDialog.Portal>
      <div>{a}</div>
    </Context.Provider>
  )
}
