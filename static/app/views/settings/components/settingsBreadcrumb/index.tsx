import {Link as RouterLink} from 'react-router-dom';
import styled from '@emotion/styled';

import {t} from 'sentry/locale';
import {space} from 'sentry/styles/space';
import getRouteStringFromRoutes from 'sentry/utils/getRouteStringFromRoutes';
import recreateRoute from 'sentry/utils/recreateRoute';

import {useBreadcrumbsPathmap} from './context';
import Crumb from './crumb';
import Divider from './divider';
import {OrganizationCrumb} from './organizationCrumb';
import ProjectCrumb from './projectCrumb';
import TeamCrumb from './teamCrumb';
import type {RouteWithName, SettingsBreadcrumbProps} from './types';

const MENUS: Record<string, React.FC<SettingsBreadcrumbProps>> = {
  Organization: OrganizationCrumb,
  Project: ProjectCrumb,
  Team: TeamCrumb,
} as const;

type Props = {
  params: Record<string, string | undefined>;
  route: any;
  routes: RouteWithName[];
  className?: string;
};

function SettingsBreadcrumb({className, routes, params}: Props) {
  const pathMap = useBreadcrumbsPathmap();

  const lastRouteIndex = routes.map(r => !!r.name).lastIndexOf(true);

  return (
    <Breadcrumbs aria-label={t('Settings Breadcrumbs')} className={className}>
      {routes.map((route, i) => {
        if (!route.name) {
          return null;
        }
        const pathTitle = pathMap[getRouteStringFromRoutes(routes.slice(0, i + 1))];
        const isLast = i === lastRouteIndex;
        const Menu = MENUS[route.name];
        const hasMenu = !!Menu;

        if (hasMenu) {
          return (
            <Menu
              key={`${route.name}:${route.path}`}
              routes={routes}
              route={route}
              isLast={isLast}
            />
          );
        }
        return (
          <Crumb key={`${route.name}:${route.path}`}>
            <CrumbLink to={recreateRoute(route, {routes, params})}>
              {pathTitle || route.name}
            </CrumbLink>
            {isLast ? null : <Divider />}
          </Crumb>
        );
      })}
    </Breadcrumbs>
  );
}

// Uses Link directly from react-router-dom to avoid the URL normalization
// that happens in the internal Link component. It is unncessary because we
// get routes from the router, and will actually cause issues because the
// routes do not have organization information.
const CrumbLink = styled(RouterLink)`
  display: block;

  color: ${p => p.theme.subText};
  &:hover {
    color: ${p => p.theme.textColor};
  }
`;

const Breadcrumbs = styled('nav')`
  display: flex;
  gap: ${space(0.75)};
  align-items: center;
`;

export {CrumbLink};

export default SettingsBreadcrumb;
