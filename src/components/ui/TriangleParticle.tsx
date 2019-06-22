import React, { useState, useEffect } from "react";
import posed from "react-pose";
import styled from "styled-components";
import randRange from "../../lib/randRange";

const Particle = posed.div({
  initial: {
    scale: 1
  },
  done: {
    rotateX: () => randRange(300, 700),
    rotateY: () => randRange(300, 700),
    rotateZ: () => randRange(300, 700),
    x: () => randRange(-200, 200),
    y: () => randRange(-60, 60),
    scale: 2,
    opacity: 0,
    transition: {
      duration: 2000
    }
  }
});

const Wrapper = styled(Particle)`
  position: absolute;
  top: 0;
`;

interface Props {
  fill: string;
}
const TriangleParticle: React.FC<Props> = ({ fill }) => {
  const [state, setState] = useState({ scene: "initial" });
  useEffect(() => {
    setState(state => ({ scene: "done" }));
  }, []);
  return (
    <>
      <Wrapper pose={state.scene}>
        <svg width="60" height="60" fill={fill}>
          <path d="M30 0, L60 60, L0 60, Z" />
        </svg>
      </Wrapper>
    </>
  );
};

export default TriangleParticle;
