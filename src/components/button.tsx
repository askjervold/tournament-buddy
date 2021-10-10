import React, { PropsWithChildren } from 'react';

type ButtonProps = {
  onClick: Function;
};

function Button({ onClick, children }: PropsWithChildren<ButtonProps>) {
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  return <button onClick={onClickHandler}>{children}</button>;
}

export default Button;
