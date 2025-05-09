import type {TagWithTopValues} from 'sentry/types/group';
import {type GroupTag} from 'sentry/views/issueDetails/groupTags/useGroupTags';

export function TagsFixture(params: TagWithTopValues[] = []): TagWithTopValues[] {
  return [
    {
      topValues: [
        {
          count: 10,
          name: 'Chrome',
          value: 'Chrome',
          lastSeen: '2018-11-16T22:52:24Z',
          key: 'browser',
          firstSeen: '2018-05-06T03:48:28.855Z',
        },
        {
          count: 5,
          name: 'Firefox',
          value: 'Firefox',
          lastSeen: '2018-12-20T23:32:25Z',
          key: 'browser',
          firstSeen: '2018-12-20T23:32:43.811Z',
        },
      ],
      uniqueValues: 2,
      name: 'Browser',
      key: 'browser',
      totalValues: 18,
      canDelete: true,
    },
    {
      topValues: [
        {
          count: 17,
          name: 'Other',
          value: 'Other',
          lastSeen: '2018-11-16T22:52:24Z',
          key: 'device',
          firstSeen: '2018-05-06T03:48:28.836Z',
        },
      ],
      uniqueValues: 1,
      name: 'Device',
      key: 'device',
      totalValues: 17,
      canDelete: true,
    },
    {
      topValues: [
        {
          count: 18,
          name: 'http://example.com/foo',
          value: 'http://example.com/foo',
          lastSeen: '2018-12-20T23:32:25Z',
          key: 'url',
          firstSeen: '2018-05-06T03:48:28.825Z',
        },
      ],
      uniqueValues: 1,
      name: 'URL',
      key: 'url',
      totalValues: 18,
      canDelete: true,
    },
    {
      topValues: [
        {
          name: 'prod',
          value: 'prod',
          key: 'environment',
          count: 100,
          lastSeen: '2018-12-20T23:32:25Z',
          firstSeen: '2018-05-06T03:48:28.825Z',
        },
      ],
      key: 'environment',
      name: 'Environment',
      canDelete: false,
      totalValues: 100,
      uniqueValues: 1,
    },
    {
      topValues: [
        {
          count: 3,
          name: 'david',
          value: 'username:david',
          lastSeen: '2018-12-20T23:32:25Z',
          key: 'user',
          query: 'user.username:david',
          firstSeen: '2018-10-03T03:40:05.627Z',
        },
        {
          count: 2,
          name: 'meredith',
          value: 'username:meredith',
          lastSeen: '2018-10-16T20:12:20Z',
          key: 'user',
          query: 'user.username:meredith',
          firstSeen: '2018-10-15T23:24:05.570Z',
        },
      ],
      uniqueValues: 12,
      name: 'User',
      key: 'user',
      totalValues: 18,
    },
    ...params,
  ];
}

/**
 * Feature flags share the same endpoints and response format as tags. Use this to mock API responses
 * e.g. /tags/?useFlagBackend=1
 */
export function FeatureFlagTagsFixture(params: GroupTag[] = []): GroupTag[] {
  return [
    {
      key: 'feature.organizations:my-feature',
      name: 'Feature.Organizations:My-Feature',
      totalValues: 11,
      topValues: [
        {
          name: 'true',
          value: 'true',
          count: 7,
          lastSeen: '2025-03-21T18:17:44Z',
          firstSeen: '2025-03-20T16:05:25Z',
        },
        {
          name: 'false',
          value: 'false',
          count: 4,
          lastSeen: '2025-03-21T19:17:44Z',
          firstSeen: '2025-03-15T16:00:00Z',
        },
      ],
    },
    {
      key: 'my-rolled-out-feature',
      name: 'My-Rolled-Out-Feature',
      totalValues: 23,
      topValues: [
        {
          name: 'true',
          value: 'true',
          count: 23,
          lastSeen: '2025-03-21T18:17:44Z',
          firstSeen: '2025-03-21T16:05:25Z',
        },
      ],
    },
    ...params,
  ];
}
