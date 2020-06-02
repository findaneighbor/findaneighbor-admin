import React from 'react'
import { useInterval } from '../hooks'

const DOTS = {
  '': '.',
  '.': '. .',
  '. .': '. . .',
  '. . .': ''
}

const Dots = ({ className }) => {
  const [dots, setDots] = useState('')

  useInterval(() => {
    setDots(d => DOTS[d])
  }, 250)

  return <span className={className}>{dots}</span>
}