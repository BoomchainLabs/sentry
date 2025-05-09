import type {Organization} from 'sentry/types/organization';
import normalizeUrl from 'sentry/utils/url/normalizeUrl';
import {prefersStackedNav} from 'sentry/views/nav/prefersStackedNav';

const LEGACY_STATS_BASE_PATHNAME = 'stats';
const STATS_BASE_PATHNAME = 'settings/stats';

export function makeStatsPathname({
  path,
  organization,
}: {
  organization: Organization;
  path: '/' | `/${string}/`;
}) {
  return normalizeUrl(
    prefersStackedNav(organization)
      ? `/organizations/${organization.slug}/${STATS_BASE_PATHNAME}${path}`
      : `/organizations/${organization.slug}/${LEGACY_STATS_BASE_PATHNAME}${path}`
  );
}
