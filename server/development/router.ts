import KoaRouter, { RouterContext } from 'koa-router'
import { Next } from 'koa'
import { prefix } from './config'

import { _delete, _get, _post, _put } from './api/test'

export default (route: KoaRouter<any, {}>) => {
  route.get('/', async (ctx: RouterContext, next: Next) => {
    ctx.body = 'hello world'
    await next()
  })
  route.get('/noperm', async (ctx: RouterContext, next: Next) => {
    const url = 'http://localhost:3000'
    ctx.body = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>无权限页面</title>
        </head>
        <body style="padding: 30px;">
          <h4>欢迎来到XXX! 这是无权限页面!</h4>
          <p>你没有此系统的使用权限, 如果已申请？请<a href="/">重新验证</a>或<a href="/logout">重新登录</a></p>
          <p><a href="${url}" target="_blank">申请此系统权限</a></p>
        </body>
      </html>
    `
    await next()
  })
  route.get(`${prefix}/get`, _get)
  route.post(`${prefix}/post`, _post)
  route.put(`${prefix}/put`, _put)
  route.del(`${prefix}/delete`, _delete)
}