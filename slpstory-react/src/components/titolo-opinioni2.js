import React from 'react'

import PropTypes from 'prop-types'

import './titolo-opinioni2.css'

const TitoloOpinioni2 = (props) => {
  return (
    <div className={`titolo-opinioni2-titolo-opinioni ${props.rootClassName} `}>
      <img
        alt={props.rectangle2Alt}
        src={props.rectangle2Src}
        className="titolo-opinioni2-rectangle2"
      />
      <span className="titolo-opinioni2-text">
        <span className="">Kid’s Name</span>
      </span>
      <img
        alt={props.vectorAlt}
        src={props.vectorSrc}
        className="titolo-opinioni2-vector"
      />
    </div>
  )
}

TitoloOpinioni2.defaultProps = {
  rootClassName: '',
  rectangle2Alt: 'Rectangle27268',
  vectorSrc: '/external/vector7268-sji8.svg',
  rectangle2Src: '/external/rectangle27268-umw-200h.png',
  vectorAlt: 'Vector7268',
}

TitoloOpinioni2.propTypes = {
  rootClassName: PropTypes.string,
  rectangle2Alt: PropTypes.string,
  vectorSrc: PropTypes.string,
  rectangle2Src: PropTypes.string,
  vectorAlt: PropTypes.string,
}

export default TitoloOpinioni2
