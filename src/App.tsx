import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd'
import axios from 'axios';
import dayjs from 'dayjs';
import Routers from './routers';
import MenuItem from 'antd/lib/menu/MenuItem';
import { SelectInfo } from 'rc-menu/lib/interface';

const { Header, Content } = Layout

const navs = [
  { to: '/home', name: '主页' },
  { to: '/news', name: '新闻' },
]

const menuItems = navs.map((nav) => {
  return {
    key: nav.to,
    label: nav.name
  }
})

let timer: any = null

const App: React.FC = () => {
  const navigate = useNavigate()
  const [selectedKey, setSelectedKey]: any = useState([''])
  const [weather, setWeather]: any = useState(null)
  const [countDown, setCountDown] = useState('')

  useEffect(() => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      getWeatherData()
    })
    dateCountDown()
    const key = localStorage.getItem('selectKey') || 'news'
    setSelectedKey(() => [key])
    routerTo(key)
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

  const menuSelect = (e: SelectInfo) => {
    setSelectedKey(() => [e.key])
    routerTo(e.key)
    localStorage.setItem('selectKey', e.key)
  }

  const routerTo = (to: string) => {
    navigate(to)
  }

  return (
    <Layout>
      <Header style={{ position: "fixed", width: '100%', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKey}
          onSelect={(e) => menuSelect(e)}
          items={menuItems}
        />
        <div style={{ color: '#eee' }}>
          {countDown}&nbsp;&nbsp;&nbsp;&nbsp;
          {weather ? `${weather?.city} ${weather?.data[0]?.date} ${weather?.data[0]?.week} ${weather?.data[0]?.wea} ${weather?.data[0]?.hours[new Date().getDay()]?.tem}℃` : ''}
        </div>
      </Header>
      <Content style={{ marginTop: '56px', minHeight: "calc(100vh - 56px)", padding: "15px 20px" }}>
        <Routers />
      </Content>
    </Layout>
  );
};

export default App;
