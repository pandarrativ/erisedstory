import React from 'react'

import { Helmet } from 'react-helmet'

import Collezione1 from '../components/collezione1'
import Collezione2 from '../components/collezione2'
import TitoloOpinioni from '../components/titolo-opinioni'
import TitoloOpinioni1 from '../components/titolo-opinioni1'
import TitoloOpinioni2 from '../components/titolo-opinioni2'
import './account.css'

const Account = (props) => {
  return (
    <div className="account-container">
      <Helmet>
        <title>Account - SLPStory</title>
        <meta property="og:title" content="Account - SLPStory" />
      </Helmet>
      <div className="account-frame2-account">
        <span className="account-text">
          <span>Account Sign Up</span>
        </span>
        <Collezione1 rootClassName="collezione1-root-class-name"></Collezione1>
        <Collezione2 rootClassName="collezione2-root-class-name"></Collezione2>
        <button className="account-button">
          <span className="account-text2">
            <span>Sign Up</span>
          </span>
        </button>
        <TitoloOpinioni rootClassName="titolo-opinioni-root-class-name"></TitoloOpinioni>
        <TitoloOpinioni1 rootClassName="titolo-opinioni1-root-class-name"></TitoloOpinioni1>
        <TitoloOpinioni2 rootClassName="titolo-opinioni2-root-class-name"></TitoloOpinioni2>
      </div>
    </div>
  )
}

export default Account
