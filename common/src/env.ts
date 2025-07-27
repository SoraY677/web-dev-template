export const DOMAIN_BASE = process.env.DOMAIN_BASE ?? ''
export const DOMAIN_HEAD = process.env.DOMAIN_HEAD ?? ''

export const DOMAIN = DOMAIN_HEAD && DOMAIN_BASE ? [DOMAIN_HEAD, DOMAIN_BASE].join('.') : ''
