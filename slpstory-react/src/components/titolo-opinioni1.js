import React from 'react'

import PropTypes from 'prop-types'

import './titolo-opinioni1.css'

const TitoloOpinioni1 = (props) => {
  return (
    <div className={`titolo-opinioni1-titolo-opinioni ${props.rootClassName} `}>
      <img
        alt={props.rectangle2Alt}
        src={props.rectangle2Src}
        className="titolo-opinioni1-rectangle2"
      />
      <span className="titolo-opinioni1-text">
        <span className="">Passcode</span>
      </span>
      <img
        alt={props.vectorAlt}
        src={props.vectorSrc}
        className="titolo-opinioni1-vector"
      />
    </div>
  )
}

TitoloOpinioni1.defaultProps = {
  vectorSrc: '/external/vector7268-4dr.svg',
  vectorAlt: 'Vector7268',
  rootClassName: '',
  rectangle2Alt: 'Rectangle27268',
  rectangle2Src: '/external/rectangle27268-90fr-200h.png',
}

TitoloOpinioni1.propTypes = {
  vectorSrc: PropTypes.string,
  vectorAlt: PropTypes.string,
  rootClassName: PropTypes.string,
  rectangle2Alt: PropTypes.string,
  rectangle2Src: PropTypes.string,
}

export default TitoloOpinioni1
