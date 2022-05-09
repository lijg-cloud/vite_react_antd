import { RouterContext } from 'koa-router'
import { Next } from 'koa'
import { del_test } from '../../model/test'

export const _delete = async (ctx: RouterContext, next: Next) => {
  const params = ctx.request.body
  const res = await del_test(params)
  ctx.body = res
  await next()
}