import { TreeSelect } from 'antd'
import { useEffect, useState } from 'react'
import initTree from './initTree.js'

export default () => {
  const [treeData, setTreeData] = useState([])

  const getTree = (initTree, arr, parentId) => {
    initTree.forEach(item => {
      if (item.type === 700 || parentId === item.parentId) {
        let treeOption = { title: item.name, value: item.id, key: item.id, children: [] }
        arr.children.push(treeOption)
        if (item.children && item.children.length > 0) {
          getTree(item.children, treeOption, item.id)
        }
      } else {
        if (item.children && item.children.length > 0) {
          getTree(item.children, arr)
        }
      }
    })
  }

  useEffect(() => {
    let arr = { children: [] }
    getTree(initTree, arr)
    //
    console.log(arr.children)

    setTreeData(arr.children)
  }, [])
  return <TreeSelect treeData={treeData} style={{ width: 300 }}/>
}
