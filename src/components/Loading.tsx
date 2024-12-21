import React from "react";

interface LoadingProps {
  dataTestId?: string;
}

const Loading: React.FC<LoadingProps> = ({ dataTestId }) => {
  return (
    <div {...(dataTestId ? { "data-test": dataTestId } : {})} className="loading">
      Loading...
    </div>
  );
};

export default Loading;
