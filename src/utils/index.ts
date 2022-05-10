import dayjs from "dayjs"
import { Moment } from "moment"

// 获取数据类型，判断类型，获取唯一uid
const getType = (input: any) => Object.prototype.toString.call(input).slice(8, - 1)

export const isBoolean = (input: any): input is boolean => getType(input) === 'Boolean'
export const isNumber = (input: any): input is number => !isNaN(input) && getType(input) === 'Number'
export const isObject = (input: any): input is ({ [propName: string]: any }) => getType(input) === 'Object'
export const isString = (input: any): input is string => getType(input) === 'String'
export const isUndefined = (input: any): input is undefined => getType(input) === 'Undefined'
export const isArray = (input: any): input is any[] => getType(input) === 'Array'

export const getUid = () => Date.now() + Math.random().toString(16).slice(2)

// 过滤 undefined null '', 数字类型全部返回, 包括 0, 布尔值全部返回
export const clearInvalidParams = (params: any) => {
  const newParams: any = {}
  Object.keys(params).forEach((key: any) => {
    if (typeof params[key] === 'number') {
      newParams[key] = params[key]
    }
    else if (typeof params[key] === 'boolean') {
      newParams[key] = params[key]
    }
    else if (params[key]) {
      newParams[key] = params[key]
    }
  })
  return newParams
}

// 原生复制
export const copyToClip = (content: string) => {
  const aux = document.createElement('input');
  aux.setAttribute('value', content);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
  alert('复制成功')
}

// 获取相对视窗的位置
export function getRect(dom: HTMLElement) {
  const rect = dom.getBoundingClientRect()
  let { left, top, bottom, right, width, height } = rect
  return { left, top, bottom, right, offsetHeight: height, offsetWidth: width }
}

/**
 * 验证时间字符有效
 * @param timeStr time string
 */
export function validateTime(time: string | number) {
  const invalidStr = '1971-01-01 00:00:00'
  const invalidNum = 31507200000
  return time !== invalidStr && time !== invalidNum && time !== '-' && dayjs(time).isValid()
}

/**
 * 日期转换统一格式
 * @param date Moment
 */
export function formatTime(date: Moment, formatSty: string = 'YYYY-MM-DD HH:mm:ss') {
  return date.format(formatSty)
}

/**
 * 节流函数
 * @param wait number
 * @param fn function
 */
 export function throttle(wait: number, fn: any) {
  let previous = 0
  let timer!: any
  return async function() {
    // @ts-ignore
    const context = this
    const args = arguments
    if (!previous) {
      previous = Date.now()
      fn.apply(context, args)
      return
    }
    if (Date.now() - previous < wait) {
      if (timer) {
        clearTimeout(timer)
      } else {
        timer = setTimeout(() => {
          previous = Date.now()
          fn.apply(context, args)
        })
      }
      return
    }
    previous = Date.now()
    fn.apply(context, args)
  }
}
/**
 * 防抖函数
 * @param wait number
 * @param fn function
 */
export function debounce(wait: number, fn: any) {
  let timer: any = null
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(null, args)
    }, wait)
  }
}

export const stopBack = () => {
  // 阻止浏览器回退
  history.pushState(null, 'null', document.URL);
  window.addEventListener('popstate', function () {
    history.pushState(null, 'null', document.URL);
  });
}

export const log = (value: any) => {
  console.log(value)
}
export const info = (value: any) => {
  console.info(value)
}
export const warn = (value: any) => {
  console.warn(value)
}
export const err = (value: any) => {
  console.error(value)
}

export const setLocal = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const getLocal = (key: string, isParse: boolean = false) => {
  const value = localStorage.getItem(key)
  if (isParse && value) {
    try {
      return JSON.parse(value)
    } catch (error) {
      err(error)
      return value
    }
    
  }
  return value
}
