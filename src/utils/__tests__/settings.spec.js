import React from 'react'
import Settings from 'config/settings'
import ProgressBar from 'components/ProgressBar'
import { getSetting, getProgressBar } from '../settings'

jest.mock('config/settings')

describe('utils/settings', () => {
  describe('getSetting', () => {
    test('returns value by key from settings file', () => {
      expect(getSetting('title')).toBe('MockTitle')
      expect(getSetting('progressBar')).toBe(true)
      expect(getSetting('theme')).toBe('minimal')
    })

    test('returns default value when supplied and key doesn\'t exist', () => {
      expect(getSetting('title', 'bar')).toBe('MockTitle')
      expect(getSetting('foo', 'bar')).toBe('bar')
    })

    test('returns empty string when key doesn\'t exist', () => {
      expect(getSetting('foo')).toBe('')
    })
  })

  describe('getProgressBar', () => {
    test('returns null if progressBar setting is false', () => {
      Settings.progressBar = false

      expect(getProgressBar({ offset: 20 })).toBeNull()
    })

    test('returns null if progressBar setting doesn\'t exist', () => {
      delete Settings.progressBar

      expect(getProgressBar({ offset: 20 })).toBeNull()
    })

    test('returns progressBar component if progressBar setting is true', () => {
      Settings.progressBar = true

      expect(getProgressBar({ offset: 20 })).toEqual(<ProgressBar offset={20} />)
      expect(getProgressBar({ offset: -50 })).toEqual(<ProgressBar offset={-50} />)
    })
  })
})