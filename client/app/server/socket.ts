import io from 'socket.io-client'

import { EXPO_HOST, EXPO_URL, NODE_ENV } from '@env'

const url = NODE_ENV.trim() === 'production' ? `${EXPO_URL}` : `${EXPO_HOST}`

export const socket = io(url)