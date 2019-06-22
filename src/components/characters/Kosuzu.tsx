import React from "react";
import Character from "../../base-components/Character";
import { ReactComponent as KosuzuImage } from "../../assets/images/kosuzu.svg";
import { string } from "prop-types";

interface Props {
  transform?: string;
}
const Kosuzu: React.FC<Props> = ({ transform }) => (
  <Character>
    <KosuzuImage
      width="auto"
      height="100vh"
      viewBox="0 0 120 168"
      transform={transform}
    />
  </Character>
);

export default Kosuzu;
