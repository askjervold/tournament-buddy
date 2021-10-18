import React, { PropsWithChildren } from 'react';

type ButtonProps = {
  onClick: Function;
  remove?: boolean;
  inline?: boolean;
};

function Button({ onClick, remove = false, inline = false, children }: PropsWithChildren<ButtonProps>) {
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  let classNames: string[] = ['btn'];
  if (remove) classNames.push('btn-remove');

  if (inline) classNames.push('inline');
  else classNames.push('block');


  return <button className={classNames.join(' ')} onClick={onClickHandler}>{children}</button>;
}

export default Button;
