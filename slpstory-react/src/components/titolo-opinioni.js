import React from 'react'

import PropTypes from 'prop-types'

import './titolo-opinioni.css'

const TitoloOpinioni = (props) => {
  return (
    <div className={`titolo-opinioni-titolo-opinioni ${props.rootClassName} `}>
      <img
        alt={props.rectangle2Alt}
        src={props.rectangle2Src}
        className="titolo-opinioni-rectangle2"
      />
      <span className="titolo-opinioni-text">
        <span className="">Email</span>
      </span>
      <img
        alt={props.vectorAlt}
        src={props.vectorSrc}
        className="titolo-opinioni-vector"
      />
    </div>
  )
}

TitoloOpinioni.defaultProps = {
  rectangle2Alt: 'Rectangle27267',
  rectangle2Src: '/external/rectangle27267-n5q5-200h.png',
  vectorSrc: '/external/vector7267-ib.svg',
  rootClassName: '',
  vectorAlt: 'Vector7267',
}

TitoloOpinioni.propTypes = {
  rectangle2Alt: PropTypes.string,
  rectangle2Src: PropTypes.string,
  vectorSrc: PropTypes.string,
  rootClassName: PropTypes.string,
  vectorAlt: PropTypes.string,
}

export default TitoloOpinioni
