import { ReactNode } from "react";

type Props = {
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
