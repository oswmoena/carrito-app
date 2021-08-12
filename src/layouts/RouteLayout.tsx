import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';

const RouteLayout = (props: any) => {
  const { component, fullCover, ...rest } = props;
  const Component = component
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout fullCover={fullCover}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouteLayout;
