import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

function LinkButton({ children, ...props }: LinkProps) {
  return <Link className="btn" {...props}>{children}</Link>;
}

export default LinkButton;
