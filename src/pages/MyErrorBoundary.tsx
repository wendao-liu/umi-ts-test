import React from 'react';
interface MyErrorBoundaryProps {
  label?: string;
  children?: React.ReactNode;
}
function MyErrorBoundary({ label, children }: MyErrorBoundaryProps) {
  console.log(children, label);
  return <div>{children}</div>;
}

export default MyErrorBoundary;
