import { logError, logInfo, logWarn } from '@/usecases/util/LoggerUtilUsecase'
import { describe, it, expect, vi } from 'vitest'

describe('LoggerUtilUsecase', () => {
  it('logInfo', () => {
    const logSpy = vi.spyOn(console, 'info')
    logInfo('test!')
    expect(logSpy).toHaveBeenCalledWith('[INFO] test!')
  })

    it('logWarn', () => {
    const logSpy = vi.spyOn(console, 'warn')
    logWarn('test!')
    expect(logSpy).toHaveBeenCalledWith('[WARN] test!')
  })

    it('logError', () => {
    const logSpy = vi.spyOn(console, 'error')
    logError('test!')
    expect(logSpy).toHaveBeenCalledWith('[ERROR] test!')
  })
})
