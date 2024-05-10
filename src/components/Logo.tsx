import Image from "mui-image";
import ISizeable from "../models/ISizeable.tsx";
import { invert } from "lodash";

function Logo(props: ISizeable) {
  const width = props.width;
  return (
    <Image duration={0} className="logo" width={width} src="/logo.svg"></Image>
  );
}

export default Logo;
