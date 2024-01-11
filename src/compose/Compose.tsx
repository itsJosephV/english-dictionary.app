import { ReactNode } from "react";

interface Props {
  ctxComponents: Array<React.FC<{ children?: ReactNode }>>;
  children?: ReactNode;
}

export default function Compose(props: Props) {
  const { ctxComponents = [], children } = props;

  return (
    <>
      {ctxComponents.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
