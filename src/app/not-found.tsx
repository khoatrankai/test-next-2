import React from 'react';

type Props = {};

const error = (props: Props) => {
  return (
    <div className="overflow-y-hidden">
      <div className="flex fixed items-center justify-center h-full left-0 right-0">
        <div className="text-3xl font-semibold">404 Not Found</div>
      </div>
    </div>
  );
};

export default error;
