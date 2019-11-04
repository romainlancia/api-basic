// @flow
import auth from './auth'
import status from './status'
import users from './users'

export default [
    { path: '/auth', router: auth },
    { path: '/status', router: status },
    { path: '/users', router: users },
]
