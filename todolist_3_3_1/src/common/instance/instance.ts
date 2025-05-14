import axios from 'axios';

const token = '8c1dd100-3773-4908-869f-3fbf4f371b6d'
const apiKey = '209ff053-598c-4470-9cac-73be4fbba87d'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    Authorization: `Bearer ${token}`,
    'API-KEY': apiKey
  }
})
