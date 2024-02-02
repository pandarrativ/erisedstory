import React from 'react'

import PropTypes from 'prop-types'

import './collezione1.css'

const Collezione1 = (props) => {
  return (
    <div className={`collezione1-collezione1 ${props.rootClassName} `}>
      <img
        alt={props.rectangle25Alt}
        src={props.rectangle25Src}
        className="collezione1-rectangle25"
      />
      <span className="collezione1-text">
        <span className="">I Am a Parent</span>
      </span>
      <img
        alt={props.image41Alt}
        src={props.image41Src}
        className="collezione1-image41"
      />
    </div>
  )
}

Collezione1.defaultProps = {
  rootClassName: '',
  rectangle25Alt: 'Rectangle257266',
  image41Src: '/external/image417267-bmec-400h.png',
  rectangle25Src: '/external/rectangle257266-sbb-700w.png',
  image41Alt: 'image417267',
}

Collezione1.propTypes = {
  rootClassName: PropTypes.string,
  rectangle25Alt: PropTypes.string,
  image41Src: PropTypes.string,
  rectangle25Src: PropTypes.string,
  image41Alt: PropTypes.string,
}

export default Collezione1
