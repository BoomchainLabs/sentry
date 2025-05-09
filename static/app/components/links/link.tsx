import {
  Link as RouterLink,
  type LinkProps as ReactRouterLinkProps,
} from 'react-router-dom';
import styled from '@emotion/styled';
import type {LocationDescriptor} from 'history';

import {locationDescriptorToTo} from 'sentry/utils/reactRouter6Compat/location';
import normalizeUrl from 'sentry/utils/url/normalizeUrl';
import {useLocation} from 'sentry/utils/useLocation';

import {linkStyles} from './styles';

export interface LinkProps
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    'href' | 'target' | 'as' | 'css'
  > {
  /**
   * The string path or LocationDescriptor object.
   *
   * If your link target is a string literal or a `LocationDescriptor` with
   * a literal `pathname`, you need to use the slug based URL
   * e.g `/organizations/${slug}/issues/`. This ensures that your link will
   * work in environments that do have customer-domains (saas) and those without
   * customer-domains (single-tenant).
   */
  to: LocationDescriptor;
  /**
   * Style applied to the component's root
   */
  className?: string;
  /**
   * Indicator if the link should be disabled
   */
  disabled?: boolean;
  preventScrollReset?: ReactRouterLinkProps['preventScrollReset'];
  ref?: React.Ref<HTMLAnchorElement>;
  replace?: ReactRouterLinkProps['replace'];
  state?: ReactRouterLinkProps['state'];
}

/**
 * A context-aware version of Link (from react-router) that falls
 * back to <a> if there is no router present
 */
function BaseLink({disabled, to, ...props}: LinkProps): React.ReactElement {
  const location = useLocation();
  to = normalizeUrl(to, location);

  if (!disabled && location) {
    return <RouterLink to={locationDescriptorToTo(to)} {...props} />;
  }

  return <a href={typeof to === 'string' ? to : ''} {...props} />;
}

// Re-assign to Link to make auto-importing smarter
const Link = styled(BaseLink)`
  ${linkStyles}
`;

export default Link;
