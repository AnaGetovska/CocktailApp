import Image from "mui-image";
import ISizeable from "../models/ISizeable.tsx";

function Logo(props: ISizeable) {
  const width = props.width;
  return <Image width={width} src="./logo.svg"></Image>;
}

export default Logo;
