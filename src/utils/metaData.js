// @flow
import { compose } from 'ramda'

export type SlideWithMetaData = {
  content: string,
  meta: {}
}

export type MetaData = {
  class?: string,
  loc?: string
}

export type LocMetaData = {
  class?: string,
  loc?: Array<Array<number>>
}

const META_REGEX = /{:.*}/g

export const findMetaDataInContent = (slide: string): Array<string> =>
  slide.match(META_REGEX) || []

export const convertMetaDataMatchesToMetaObject = (
  matches: Array<string>
): {} =>
  matches.reduce((acc, match) => {
    const key = match.split(' ')[0]
    const value = match.replace(key, '').slice(0, -1).trim()

    return { ...acc, [key.substring(2)]: value }
  }, {})

export const extractAndConvertMetaData: Function = compose(
  convertMetaDataMatchesToMetaObject,
  findMetaDataInContent
)

export const contentWithOutMetaData = (content: string): string => {
  const matches = findMetaDataInContent(content)
  return matches.reduce((acc, match) => {
    return acc.replace(match, '').trim()
  }, content)
}

export const separateContentAndMetaData = (
  slide: string
): SlideWithMetaData => {
  return {
    content: contentWithOutMetaData(slide),
    meta: extractAndConvertMetaData(slide)
  }
}

export const parseLocFromMetaData = (metaData: MetaData): LocMetaData => {
  if (!metaData.loc) {
    return {}
  }

  try {
    return { loc: JSON.parse(`[${metaData.loc}]`) }
  } catch (e) {
    return {}
  }
}
