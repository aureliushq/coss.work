// @ts-check

import { module } from '@prisma/composer'

import cossWorkService from './service.mjs'

export default module('coss-work', ({ provision }) => {
	provision(cossWorkService, { id: 'cosswork' })
})
