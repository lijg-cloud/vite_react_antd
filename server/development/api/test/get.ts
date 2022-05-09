import { RouterContext } from 'koa-router'
import { Next } from 'koa'
import { get_test } from '../../model/test'

export const _get = async (ctx: RouterContext, next: Next) => {
  const params = ctx.request.body
  const res = await get_test(params)
  ctx.body = res
  await next()
}