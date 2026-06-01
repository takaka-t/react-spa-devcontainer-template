import { redirect } from 'react-router'
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { getCurrentUser, signIn, signOut } from './authSession.ts'

export type LoginActionData = {
  error: string
}

function resolveRedirectTo(value: FormDataEntryValue | string | null) {
  if (typeof value !== 'string') {
    return '/'
  }

  if (!value.startsWith('/') || value.startsWith('//') || value === '/login') {
    return '/'
  }

  return value
}

export function requireAuth({ request }: LoaderFunctionArgs) {
  const user = getCurrentUser()

  if (!user) {
    const url = new URL(request.url)
    const redirectTo = `${url.pathname}${url.search}`

    throw redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`)
  }

  return user
}

export function loginLoader({ request }: LoaderFunctionArgs) {
  const user = getCurrentUser()

  if (user) {
    const url = new URL(request.url)

    throw redirect(resolveRedirectTo(url.searchParams.get('redirectTo')))
  }

  return null
}

export async function loginAction({ request }: ActionFunctionArgs): Promise<LoginActionData | Response> {
  const formData = await request.formData()
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const redirectTo = resolveRedirectTo(formData.get('redirectTo'))

  if (!email || !password) {
    return {
      error: 'メールアドレスとパスワードを入力してください。',
    }
  }

  signIn(email)

  return redirect(redirectTo)
}

export function logoutAction() {
  signOut()

  return redirect('/login')
}

export function logoutLoader() {
  return redirect('/')
}
