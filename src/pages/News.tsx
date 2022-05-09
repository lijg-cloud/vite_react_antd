import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface BoardInterface {
  id?: string | undefined;
}
let timer: any
const Board: React.FC = () => {
  const params: BoardInterface = useParams();
  const [newsData, setNewsData]: any[] = useState([])

  useEffect(() => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      getNews()
    })
  }, [])
  const getNews = async () => {
    const { status, data } = await axios.get('/api/nc/article/headline/T1348649580692/0-40.html')
    if (status === 200) {
      const newData = data[Object.keys(data)[0]]
      console.log('data', newData)
      setNewsData(newData)
    }
  }
  return (
    <div>
      <div className=' mb-3'>
        <label htmlFor="new" className=' text-sm '>新闻关键词: </label>
        <input type="text" id='new' className=' w-60 h-8 pl-2 rounded-lg mr-3' />
        <button className=' w-20 h-8 bg-blue-500 rounded-3xl text-gray-50 hover:bg-blue-600'>搜索</button>
      </div>
      <div>
        <h1 className=' text-2xl mb-3'>今日要闻: </h1>
        {
          newsData?.map((item: any, index: number) => (
            <div key={index} className=" w-2/3 border-2 border-blue-100 p-4 mb-5 rounded-md">
              <div>{`${index+1}. ${item.title}`}</div>
              <div className=' ml-5'>
                {item.digest}
                {item.url ? <a href={item.url} target="_blank" className=" border-b-2 hover:text-blue-600 text-blue-400">......详情</a> : ''}
              </div>
              <div><img src={item.imgsrc} alt="" className=' h-60' /></div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Board;
