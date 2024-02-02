import React from 'react'

import PropTypes from 'prop-types'

import './collezione2.css'

const Collezione2 = (props) => {
  return (
    <div className={`collezione2-collezione2 ${props.rootClassName} `}>
      <img
        alt={props.rectangle26Alt}
        src={props.rectangle26Src}
        className="collezione2-rectangle26"
      />
      <span className="collezione2-text">
        <span className="">I am a Speech-Language Pathologist</span>
      </span>
      <img
        alt={props.image42Alt}
        src={props.image42Src}
        className="collezione2-image42"
      />
    </div>
  )
}

Collezione2.defaultProps = {
  rootClassName: '',
  image42Src: '/external/image427267-oaol-400h.png',
  image42Alt: 'image427267',
  rectangle26Alt: 'Rectangle267267',
  rectangle26Src: '/external/rectangle267267-77s-700w.png',
}

Collezione2.propTypes = {
  rootClassName: PropTypes.string,
  image42Src: PropTypes.string,
  image42Alt: PropTypes.string,
  rectangle26Alt: PropTypes.string,
  rectangle26Src: PropTypes.string,
}

export default Collezione2
