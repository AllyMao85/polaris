import * as React from 'react';
import {ReactComponent} from '@shopify/react-utilities/types';
import {unstyled} from '../shared';
import {withProvider, WithProviderProps} from '../Provider';

export interface Props extends React.HTMLProps<HTMLAnchorElement> {
  url: string;
  external?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

export type LinkLikeComponent = ReactComponent<Props> | undefined;
export type CombinedProps = Props & WithProviderProps;

class UnstyledLink extends React.PureComponent<CombinedProps, never> {
  render() {
    const {polaris} = this.props;
    if (polaris && polaris.link) {
      const LinkComponent = polaris.link.linkComponent;
      if (LinkComponent) {
        return <LinkComponent {...unstyled.props} {...this.props} />;
      }
    }

    const {external, url, ...rest} = this.props;
    const target = external ? '_blank' : undefined;
    const rel = external ? 'noopener noreferrer' : undefined;
    return (
      <a target={target} {...rest} href={url} rel={rel} {...unstyled.props} />
    );
  }
}

export default withProvider()(UnstyledLink);
