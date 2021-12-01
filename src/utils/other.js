export const contextPath = '/yeji'
//dev[开发环境],prod[生产环境]，控制OperateButton.jsx中的按钮、BackLayout.jsx中的菜单导航
export const env = 'dev'
export const session = {
  setItem: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getItem: (key) => {
    return JSON.parse(sessionStorage.getItem(key))
  }
}
