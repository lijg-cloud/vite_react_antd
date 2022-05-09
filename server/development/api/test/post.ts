import { RouterContext } from 'koa-router'
import { Next } from 'koa'
import { post_test } from '../../model/test'

export const _post = async (ctx: RouterContext, next: Next) => {
  const params = ctx.request.body
  const res = await post_test(params)
  ctx.body = res
  await next()
}