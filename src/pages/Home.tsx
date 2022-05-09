import axios from 'axios'
import React, { useState, useEffect } from 'react'
let timer: any
let timer2: any
const Home: React.FC = ({}) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    timer && clearTimeout(timer)
    timer2 && clearInterval(timer2)
    timer = setTimeout(() => {
      getImg()
    }, 10)
    timer2 = setInterval(async () => {
      getImg()
    }, 10000)
  }, [])

  const getImg = async () => {
    const { status, data } = await axios.get(`/img/api/wallpa.php?msg=${Math.floor(Math.random() * 10)}`)
    console.log('data', data)
    if (status === 200) {
      const str = data.slice(5, -1)
      setImageUrl(() => str)
    }
  }

  return (
    <div>
      <img style={{ height: '88vh' }} src={imageUrl} alt="" />
    </div>
  )
}
export default Home
