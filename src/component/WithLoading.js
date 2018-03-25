import React from 'react';


const WithLoading = WrappedComponent => ({isLoading, data, children, ...props}) => {
    console.log(...props);
    if (isLoading) {
      return (
          <section id="loading-icon">Loading...</section>
      )
    } 
    else {
      return (
        <section id="wrapped-wrapper">
          <WrappedComponent {...props} userData={data}>
            {children}  
          </WrappedComponent>
        </section>
      )
    }
  };
  export default WithLoading;