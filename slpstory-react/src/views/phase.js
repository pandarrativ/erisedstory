import React from 'react'

import { Helmet } from 'react-helmet'

import './phase.css'

const Phase = (props) => {
  return (
    <div className="phase-container">
      <Helmet>
        <title>Phase - SLPStory</title>
        <meta property="og:title" content="Phase - SLPStory" />
      </Helmet>
      <div className="phase-step1">
        <span className="phase-text">
          <span>Select A Phase</span>
        </span>
        <div className="phase-slider-dots">
          <img
            alt="Dot7295"
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/53a79cb6-958a-4c8d-af19-dec14daff313/ecee0302-5e48-40ba-b057-9243aa6a8c7a?org_if_sml=1243&amp;force_format=original"
            className="phase-dot"
          />
          <img
            alt="Dot7295"
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/53a79cb6-958a-4c8d-af19-dec14daff313/b374e1cd-f8b8-4088-aa23-b3d911ddac19?org_if_sml=1183&amp;force_format=original"
            className="phase-dot1"
          />
          <img
            alt="Dot7295"
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/53a79cb6-958a-4c8d-af19-dec14daff313/b0ced518-fbb9-4545-9ec8-c0a3eb2f6361?org_if_sml=1183&amp;force_format=original"
            className="phase-dot2"
          />
          <img
            alt="Dot7295"
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/53a79cb6-958a-4c8d-af19-dec14daff313/5c2717ad-a147-49ec-8878-bb7924c54ce4?org_if_sml=1183&amp;force_format=original"
            className="phase-dot3"
          />
          <img
            alt="Dot7295"
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/53a79cb6-958a-4c8d-af19-dec14daff313/cb09760d-b18b-44d9-bf82-9066ee08a06e?org_if_sml=1183&amp;force_format=original"
            className="phase-dot4"
          />
        </div>
        <div className="phase-pikolo">
          <img
            alt="Rectangle127295"
            src="/external/rectangle127295-2iis.svg"
            className="phase-rectangle12"
          />
          <img
            alt="Pikolo7295"
            src="/external/pikolo7295-4cmi.svg"
            className="phase-pikolo1"
          />
        </div>
        <div className="phase-paquita">
          <img
            alt="Path17296"
            src="/external/path17296-on18.svg"
            className="phase-path1"
          />
          <img
            alt="Paquita7296"
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/53a79cb6-958a-4c8d-af19-dec14daff313/8fcc5b38-f45e-4421-bd3b-5b1e9ddc3855?org_if_sml=1120340&amp;force_format=original"
            className="phase-paquita1"
          />
        </div>
        <div className="phase-boomboom">
          <img
            alt="Rectangle147296"
            src="/external/rectangle147296-aemb.svg"
            className="phase-rectangle14"
          />
          <img
            alt="BoomBoom7296"
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/53a79cb6-958a-4c8d-af19-dec14daff313/28b042ba-2757-438e-8169-e163fff4849e?org_if_sml=1112678&amp;force_format=original"
            className="phase-boom-boom"
          />
        </div>
        <button className="phase-button">
          <span className="phase-text02">
            <span>Next Step</span>
          </span>
        </button>
        <span className="phase-text04">
          <span>
            <span>
              Teaching Story
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <br></br>
            <span>Grammar Elements</span>
          </span>
        </span>
      </div>
      <span className="phase-text09">
        <span>
          <span>
            Elaboration: Making
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <br></br>
          <span>Stories Sparkle</span>
        </span>
      </span>
    </div>
  )
}

export default Phase
