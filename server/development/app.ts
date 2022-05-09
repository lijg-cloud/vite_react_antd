import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaBodyParser from 'koa-bodyparser'
import KoaMount from 'koa-mount'
import KoaStatic from 'koa-static'
import path from 'path'

import { port, output } from './config'
import appRouter from './router'

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.body = JSON.stringify({
      code: 500,
      data: `服务器发生错误: ${(error as any).stack}`
    })
  }
})

app.use(KoaBodyParser({
  jsonLimit: '5mb',
  textLimit: '5mb',
  formLimit: '5mb'
}))

const router = new KoaRouter()
appRouter(router)
app.use(router.routes()).use(router.allowedMethods()) // 注册路由
app.use(KoaMount('/', KoaStatic(path.join(__dirname, `../../${output}`)))) // 打包后node访问地址

app.listen(port)

console.log(`listen http://localhost:${port}`)
