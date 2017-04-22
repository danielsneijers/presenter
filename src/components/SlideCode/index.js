import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import PropTypes from 'prop-types'
import CSS from './style.css'

const SlideCode = ({ content }) => {
  return (
    <CSSTransitionGroup
      className={CSS.slide}
      transitionName='slide'
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      transitionAppear
      component='div'
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </CSSTransitionGroup>
  )
}

SlideCode.propTypes = {
  content: PropTypes.node
}

export default SlideCode
