import {useState} from 'react'

export default () => {
  const [a, setA] = useState([])
  return {a, setA}
}
