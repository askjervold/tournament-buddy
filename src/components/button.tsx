import React, { PropsWithChildren } from 'react';

type ButtonProps = {
  onClick: Function;
  remove?: boolean;
  inline?: boolean;
  icon?: boolean;
};

function Button({ onClick, inline = false, icon = false, remove = false, children }: PropsWithChildren<ButtonProps>) {
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  let classNames: string[] = ['btn'];
  if (remove) classNames.push('btn-remove');

  if (inline) classNames.push('inline');
  else classNames.push('block');

  if (icon) classNames.push('btn-icon')
  else classNames.push('btn-solid')

  return <button className={classNames.join(' ')} onClick={onClickHandler}>{children}</button>;
}

export default Button;
