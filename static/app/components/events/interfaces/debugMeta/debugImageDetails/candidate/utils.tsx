import * as Sentry from '@sentry/react';

import {INTERNAL_SOURCE} from 'sentry/components/events/interfaces/debugMeta/debugImageDetails/utils';
import {t} from 'sentry/locale';
import type {ImageCandidate} from 'sentry/types/debugImage';
import {CandidateDownloadStatus, ImageFeature} from 'sentry/types/debugImage';

export function getImageFeatureDescription(type: ImageFeature) {
  switch (type) {
    case ImageFeature.HAS_DEBUG_INFO:
      return {
        label: t('debug'),
        description: t(
          'Debug information provides function names and resolves inlined frames during symbolication'
        ),
      };
    case ImageFeature.HAS_SOURCES:
      return {
        label: t('sources'),
        description: t(
          'Source code information allows Sentry to display source code context for stack frames'
        ),
      };
    case ImageFeature.HAS_SYMBOLS:
      return {
        label: t('symtab'),
        description: t(
          'Symbol tables are used as a fallback when full debug information is not available'
        ),
      };
    case ImageFeature.HAS_UNWIND_INFO:
      return {
        label: t('unwind'),
        description: t(
          'Stack unwinding information improves the quality of stack traces extracted from minidumps'
        ),
      };
    default: {
      Sentry.withScope(scope => {
        scope.setLevel('warning');
        Sentry.captureException(new Error('Unknown image candidate feature'));
      });
      return {}; // this shall not happen
    }
  }
}

export function getStatusTooltipDescription(
  candidate: ImageCandidate,
  hasReprocessWarning: boolean
) {
  const {download, location, source} = candidate;

  switch (download.status) {
    case CandidateDownloadStatus.OK: {
      return {
        label: t('Download Details'),
        description: location,
        disabled: !location || source === INTERNAL_SOURCE,
      };
    }

    case CandidateDownloadStatus.ERROR:
    case CandidateDownloadStatus.MALFORMED: {
      const {details} = download;
      return {
        label: t('Download Details'),
        description: details,
        disabled: !details,
      };
    }
    case CandidateDownloadStatus.NOT_FOUND: {
      return {};
    }
    case CandidateDownloadStatus.NO_PERMISSION: {
      const {details} = download;
      return {
        label: t('Permission Error'),
        description: details,
        disabled: !details,
      };
    }
    case CandidateDownloadStatus.DELETED: {
      return {
        label: t('This file was deleted after the issue was processed.'),
      };
    }
    case CandidateDownloadStatus.UNAPPLIED: {
      return {
        label: hasReprocessWarning
          ? t(
              'This issue was processed before this debug information file was available. To apply new debug information, reprocess this issue.'
            )
          : t(
              'This issue was processed before this debug information file was available'
            ),
      };
    }
    default: {
      Sentry.withScope(scope => {
        scope.setLevel('warning');
        Sentry.captureException(new Error('Unknown image candidate download status'));
      });
      return {}; // This shall not happen
    }
  }
}
