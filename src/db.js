import { createPool } from 'mysql2/promise'

import DATABASE_KEYS from '../env/dbKeys.js'

export const pool = createPool(DATABASE_KEYS)
