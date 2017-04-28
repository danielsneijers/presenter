// @flow
import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import CSS from './style.css'

type Props = {
  uniqueKey: string,
  content: string
}

const Slide = ({ content, uniqueKey }: Props) => {
  return (
    <CSSTransitionGroup
      className={CSS.slide}
      transitionName='slide'
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      transitionAppear
      component='div'
      key={uniqueKey}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </CSSTransitionGroup>
  )
}

export default Slide
