import {SquareProps} from "@/types";
import {useDeviceContext} from "../contexts/DeviceContext";
import Square from "./Square";

const ResponsiveSquare = ({char, correct, misplaced}: SquareProps) => {
  const {isMobile} = useDeviceContext();
  return <Square size={isMobile ? 8 : 12} char={char} correct={correct} misplaced={misplaced} />;
};

export default ResponsiveSquare;
