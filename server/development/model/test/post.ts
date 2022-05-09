import axios from 'axios'

export const post_test = async (params: {[propName: string]: any}) => {
  try {
    const data = await axios.post('', params)
    if (data.status === 200) {
      return {
        code: 1,
        message: '创建成功',
        data: data.data
      }
    } else {
      return {
        code: 0,
        message: data.statusText,
        body: null
      }
    }
  } catch (error) {
    return {
      code: 0,
      message: (error as any).stack,
      body: null
    }
  }
}