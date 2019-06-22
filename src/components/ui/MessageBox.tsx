import React, { useState, useEffect } from "react";
import posed from "react-pose";
import asyncForEach from "../../lib/asyncForEach";
import sleep from "../../lib/sleep";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1rem 1.2rem;
  font-size: 1.6rem;
  width: 800px;
  height: 200px;
  border: 1px solid #aaa;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.48);
`;
const Chara = posed.span({
  initial: { opacity: 0 },
  entered: { opacity: 1 }
});
interface Props {
  text: string;
}
type AnimationState = "initial" | "entered";

interface State {
  characters: AnimationState[];
  pointer: number;
}
const MessageBox: React.FC<Props> = props => {
  const [state, setState] = useState<State>({
    characters: Array(props.text.length).fill("initial"),
    pointer: 0
  });
  useEffect(() => {
    asyncForEach(state.characters, async (animationState: AnimationState) => {
      await sleep(100);
      setState(state => {
        const newCharacters = [...state.characters];
        newCharacters[state.pointer] = "entered";
        return {
          ...state,
          characters: newCharacters,
          pointer: state.pointer + 1
        };
      });
    });
  }, []);

  const { text } = props;
  return (
    <Wrapper>
      {text.split("").map((c, i) => (
        <Chara key={`message_box_${i}`} pose={state.characters[i]}>
          {c}
        </Chara>
      ))}
    </Wrapper>
  );
};
export default MessageBox;
