import { CommonUserInterface, CreateUserInfo, ParametersFilters } from '@/interfaces'
import { getEnvironment } from '@/utils'

import apis from './index'

const { VITE_API_BASE_URL } = getEnvironment()

export const apiGetUser = (userId: string) => {
  return apis.get(`${VITE_API_BASE_URL}/users/${userId}`, {
    headers: { 'content-type': 'application/json' }
  })
}

export const apiCreateUser = (requestBody: CreateUserInfo) => {
  return apis.post(`${VITE_API_BASE_URL}/users`, requestBody, {
    headers: { 'content-type': 'application/json' }
  })
}