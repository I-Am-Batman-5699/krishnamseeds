// src/components/LoadingSpinner.tsx
import classes from '@/css/loading.module.css';
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  bgClassName?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading...!", className, bgClassName }) => {
  const outerDivClasses = `min-h-[calc(100svh-15svh)] mx-auto grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1 lg:gap-12 justify-center ${className || ''} ${bgClassName || ''}`;

  return (
    <div className={outerDivClasses}>
      <div className={classes.loading}>
        <p className="justify-center align-middle flex">{message}</p>
        <div className={classes.wrapper}>
          <div className={classes.circle}></div>
          <div className={classes.circle}></div>
          <div className={classes.circle}></div>
          <div className={classes.shadow}></div>
          <div className={classes.shadow}></div>
          <div className={classes.shadow}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;