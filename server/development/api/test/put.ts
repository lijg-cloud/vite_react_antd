import { RouterContext } from 'koa-router'
import { Next } from 'koa'
import { put_test } from '../../model/test'

export const _put = async (ctx: RouterContext, next: Next) => {
  const params = ctx.request.body
  const res = await put_test(params)
  ctx.body = res
  await next()
}