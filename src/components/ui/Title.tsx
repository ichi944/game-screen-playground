import React, { useState, useEffect } from "react";
import posed from "react-pose";
import sleep from "../../lib/sleep";
import styled from "styled-components";
import TriangleParticle from "./TriangleParticle";

function* range(begin: number, end: number, interval = 1) {
  for (let i = begin; i < end; i += interval) {
    yield i;
  }
}

interface WaitProps {
  duration: number;
  onComplete: () => void;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
`;
const TextWrapper = styled.div`
  font-family: serif;
  color: #fff;
  width: 3em;
  margin: 300px auto;
  position: relative;
`;
const Text = posed.div({
  initial: {
    opacity: 0,
    scale: 3
  },
  entering: {
    transition: {
      duration: 2000
    },
    opacity: 1,
    scale: 2
  },
  done: {
    transition: {
      duration: 300
    },
    opacity: 0
  }
});
interface Props {
  text: string;
}
interface State {
  pose: {
    text: "initial" | "entering" | "done";
  };
}
const Title: React.FC<Props> = props => {
  const [state, setState] = useState<State>({
    pose: {
      text: "initial"
    }
  });
  useEffect(() => {
    (async () => {
      setState((state: any) => {
        return {
          ...state,
          pose: {
            ...state.pose,
            text: "entering"
          }
        };
      });
      await sleep(2000);
      setState((state: any) => ({
        ...state,
        pose: { ...state.pose, text: "done" }
      }));
    })();
  }, []);
  if (state.pose.text === "done") {
    return null;
  }
  return (
    <Wrapper>
      <TextWrapper>
        <Text pose={state.pose.text}>{props.text}</Text>
        <TriangleParticle fill="#fff" />
        <TriangleParticle fill="#fff" />
        <TriangleParticle fill="#f00" />
      </TextWrapper>
    </Wrapper>
  );
};
export default Title;
