import Loader from '@components/Loader';
import { ComponentType } from 'react';

interface WithLoadingProps {
  isLoading: boolean;
}

const withLoading = <P extends object>(
  WrappedComponent: ComponentType<P>,
  isLoading: boolean,
) => {
  return (props: P & WithLoadingProps) => {
    if (isLoading) {
      return <Loader />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
