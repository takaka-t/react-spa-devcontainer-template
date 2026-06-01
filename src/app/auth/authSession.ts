export type AuthUser = {
  id: string
  name: string
  email: string
  role: string
}

const STORAGE_KEY = 'sample-auth-user'

let fallbackUser: AuthUser | null = null
let cachedUser: AuthUser | null | undefined

function createSampleUser(email: string): AuthUser {
  const accountName = email.split('@')[0] || 'operator'

  return {
    id: 'user-001',
    name: accountName,
    email,
    role: '管理者',
  }
}

function readStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return fallbackUser
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return fallbackUser
    }

    return JSON.parse(storedValue) as AuthUser
  } catch {
    return fallbackUser
  }
}

export function getCurrentUser() {
  if (cachedUser !== undefined) {
    return cachedUser
  }

  // 実アプリでは、ここでセッション確認 API を呼び出します。
  // 例: GET /api/auth/session で現在ログイン中のユーザー情報を取得します。
  // API 呼び出し結果はメモリキャッシュし、ルーティングごとに同じ確認 API を呼びすぎないようにします。
  cachedUser = readStoredUser()

  return cachedUser
}

export function signIn(email: string) {
  // このテンプレートでは認証 API の代わりにサンプルユーザーを保存します。
  // 実アプリでは、ここを API 呼び出しや Cookie ベースのセッション確認へ置き換えます。
  // 例: POST /api/auth/login にメールアドレスとパスワードを送信します。
  const user = createSampleUser(email)
  fallbackUser = user
  cachedUser = user

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } catch {
      // localStorage が使えない環境でも、同一セッション内では fallbackUser で動作を確認できます。
    }
  }

  return user
}

export function signOut() {
  // 実アプリでは、ここでログアウト API を呼び出します。
  // 例: POST /api/auth/logout でサーバー側のセッションや Cookie を無効化します。
  fallbackUser = null
  cachedUser = null

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // サンプル実装のため、削除に失敗しても画面側で追加のエラー表示は行いません。
    }
  }
}

export function clearAuthCache() {
  // API クライアントで 401 Unauthorized を検知した場合は、この関数で認証キャッシュを破棄します。
  // 次の認証必須 route 遷移時に requireAuth が未ログインとして扱い、ログイン画面へ redirect します。
  fallbackUser = null
  cachedUser = null

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // キャッシュ破棄はベストエフォートです。実アプリでは必要に応じて監視ログへ送ります。
    }
  }
}
