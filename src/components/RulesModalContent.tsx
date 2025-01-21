import {ReactNode} from "react";

interface IRulesModalContentProps {
  title: string;
  message: ReactNode;
  description: string;
}

const RulesModalContent = ({title, message, description}: IRulesModalContentProps) => {
  return (
    <>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <p className="text-sm md:text-md  mb-4 font-semibold">{message}</p>
      <p className="text-sm md:text-md mb-4 font-semibold">{description}</p>
    </>
  );
};

export default RulesModalContent;
