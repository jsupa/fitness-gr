import type { UserModel } from '../src/db/user'

export {}

declare global {
  interface String {
    readonly t: string
  }

  namespace Express {
    export interface User extends UserModel {}
  }
}
