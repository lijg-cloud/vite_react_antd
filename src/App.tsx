import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import Routers from './routers';

const navs = [
  { to: '/home', name: '主页' },
  { to: '/news', name: '新闻' },
]

let timer: any = null

const App: React.FC = () => {
  const [weather, setWeather]: any = useState(null)
  const [countDown, setCountDown] = useState('')

  useEffect(() => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      getWeatherData()
    })
    dateCountDown()
  }, [])

  const dateCountDown = () => {
    setInterval(() => {
      const str = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      setCountDown(str)
    }, 1000)
  }

  const getWeatherData = async () => {
    const { status, data } = await axios.get('http://www.tianqiapi.com/api?version=v9&appid=23035354&appsecret=8YvlPNrz&city=北京')
    console.log(status, data)
    if (status === 200) {
      setWeather(data)
    }
  }

  return (
    <BrowserRouter>
      <header className=" w-full h-14 fixed top-0 flex items-center justify-between bg-blue-400 shadow-lg">
        <div className=' flex'>
        {
          navs.map((nav, index) => (
            <div key={index}>
              <NavLink to={nav.to}
                className={({ isActive }) => ' block text-lg text-gray-50 pl-8 pr-8 ml-8 h-14 hover:bg-blue-500' +
                (isActive ? " bg-blue-500" : "")} style={{ lineHeight: '56px' }}
              >
                {nav.name}
              </NavLink>
            </div>
          ))
        }
        </div>
        <div className=' mr-5 text-base text-gray-50'>
          {countDown}&nbsp;&nbsp;&nbsp;&nbsp;
          {weather ? `${weather?.city} ${weather?.data[0]?.date} ${weather?.data[0]?.week} ${weather?.data[0]?.wea} ${weather?.data[0]?.hours[new Date().getDay()]?.tem}℃` : ''}
        </div>
      </header>
      <div className=' w-full mt-14 bg-gray-100 p-3' style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Routers />
      </div>
    </BrowserRouter>
  );
};

export default App;
