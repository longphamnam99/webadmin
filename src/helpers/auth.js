import { getToken } from '@/utils/auth'
export function auth() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
}
