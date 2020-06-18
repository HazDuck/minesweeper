import * as React from 'react';

interface NumberDisplayProps {
  value: number;
}

export const NumberDisplay: React.FC <NumberDisplayProps> = ({ value }) => {
  return (
    <div className="NumberDisplay">
      { value < 0 ? `-${Math.abs(value).toString().padStart(2 ,'0')}` : value.toString().padStart(3, '0')}
    </div>
  )
}