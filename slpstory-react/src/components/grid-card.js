import React from 'react'

import PropTypes from 'prop-types'

import './grid-card.css'

const GridCard = (props) => {
  return (
    <div className="grid-card-grid-card">
      <img
        alt={props.imageAlt}
        src={props.imageSrc}
        className="grid-card-image"
      />
      <span className="grid-card-text">{props.text}</span>
      <span className="Content-Light">{props.text1}</span>
    </div>
  )
}

GridCard.defaultProps = {
  text1:
    'Lorem ipsum dolor sit amet. Velit officia lorem ipsum dolor consequat duis enim velit mollit.​',
  imageSrc: 'https://play.teleporthq.io/static/svg/default-img.svg',
  text: 'Challange yourself',
  imageAlt: 'image',
}

GridCard.propTypes = {
  text1: PropTypes.string,
  imageSrc: PropTypes.string,
  text: PropTypes.string,
  imageAlt: PropTypes.string,
}

export default GridCard
