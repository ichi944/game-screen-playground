import React, { useEffect, useState } from "react";
import "./App.css";
import Kosuzu from "../src/components/characters/Kosuzu";
import posed from "react-pose";
import sleep from "./lib/sleep";
import MessageBox from "./components/ui/MessageBox";
import Title from "./components/ui/Title";
import styled from "styled-components";

const Layout = styled.div`
  width: 1280px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
`;
const UILayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;
const UIStatusBar = styled.div`
  width: 100%;
  height: 50px;
`;
const UIMainArea = styled.div`
  width: 100%;
  height: 400px;
`;

interface WaitProps {
  duration: number;
  onComplete: () => void;
}
const Wait: React.FC<WaitProps> = ({ duration, onComplete }) => {
  useEffect(() => {
    (async () => {
      await sleep(duration);
      console.log("wait is done");
      onComplete();
    })();
  });
  return null;
};
const Fadein = posed.div({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
});
type MessageBoxVisiblity = "none" | "visible";
interface State {
  scene: any;
}
const App: React.FC<{}> = () => {
  const [state, setState] = useState<State>({
    scene: {
      title: null
    }
  });
  useEffect(() => {
    (async () => {
      await sleep(2000);
      next();
    })();
  }, []);
  const next = () =>
    setState(state => ({
      ...state,
      scene: {
        ...state.scene,
        title: state.scene.title + 1
      }
    }));
  return (
    <Layout>
      <Title text="鈴奈庵" />

      <Fadein
        pose={state.scene.title > 0 ? "visible" : "hidden"}
        onPoseComplete={next}
      >
        <Kosuzu />
      </Fadein>
      {state.scene.title > 0 && <Wait duration={2000} onComplete={next} />}
      <UILayout>
        <UIStatusBar />
        <UIMainArea />
        {state.scene.title >= 2 && (
          <MessageBox text="いらっしゃい、ここは鈴奈庵。" />
        )}
      </UILayout>
    </Layout>
  );
};

export default App;
