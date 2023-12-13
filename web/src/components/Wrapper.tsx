import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};
const Wrapper = ({ children }: WrapperProps) => (
  <div id="appWrapper">{children}</div>
);

export default Wrapper;
