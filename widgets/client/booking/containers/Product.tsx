import * as React from 'react';
import { Product } from '../components';
import { AppConsumer } from './AppContext';
import { ChildProps, compose, graphql } from 'react-apollo';
import { productDetail } from '../graphql';
import gql from 'graphql-tag';
import { IProduct } from '../types';

type Props = {
  productId: string;
};

type QueryResponse = {
  widgetsProductDetail: IProduct;
};

function ProductContainer(props: ChildProps<Props, QueryResponse>) {
  const { data } = props;

  if (!data || data.loading) {
    return null;
  }

  const extendedProps = {
    ...props,
    product: data.widgetsProductDetail
  };

  return <Product {...extendedProps} />;
}

const WithData = compose(
  graphql<Props, QueryResponse>(gql(productDetail), {
    options: ({ productId }) => ({
      variables: {
        _id: productId
      }
    })
  })
)(ProductContainer);

const WithContext = () => (
  <AppConsumer>
    {({ activeProduct }) => <WithData productId={activeProduct} />}
  </AppConsumer>
);

export default WithContext;
