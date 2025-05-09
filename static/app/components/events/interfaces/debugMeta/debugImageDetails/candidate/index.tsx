import {Fragment} from 'react';
import styled from '@emotion/styled';

import {INTERNAL_SOURCE} from 'sentry/components/events/interfaces/debugMeta/debugImageDetails/utils';
import type {ImageCandidate} from 'sentry/types/debugImage';
import type {Organization} from 'sentry/types/organization';
import type {Project} from 'sentry/types/project';

import StatusTooltip from './status/statusTooltip';
import Actions from './actions';
import Information from './information';

type Props = {
  baseUrl: string;
  candidate: ImageCandidate;
  hasReprocessWarning: boolean;
  haveCandidatesAtLeastOneAction: boolean;
  onDelete: (debugFileId: string) => void;
  organization: Organization;
  projSlug: Project['slug'];
  eventDateReceived?: string;
};

function Candidate({
  candidate,
  organization,
  projSlug,
  baseUrl,
  haveCandidatesAtLeastOneAction,
  hasReprocessWarning,
  onDelete,
  eventDateReceived,
}: Props) {
  const {source} = candidate;
  const isInternalSource = source === INTERNAL_SOURCE;

  return (
    <Fragment>
      <Column>
        <StatusTooltip candidate={candidate} hasReprocessWarning={hasReprocessWarning} />
      </Column>

      <InformationColumn>
        <Information
          candidate={candidate}
          isInternalSource={isInternalSource}
          eventDateReceived={eventDateReceived}
          hasReprocessWarning={hasReprocessWarning}
        />
      </InformationColumn>

      {haveCandidatesAtLeastOneAction && (
        <ActionsColumn>
          <Actions
            onDelete={onDelete}
            baseUrl={baseUrl}
            projSlug={projSlug}
            organization={organization}
            candidate={candidate}
            isInternalSource={isInternalSource}
          />
        </ActionsColumn>
      )}
    </Fragment>
  );
}

export default Candidate;

const Column = styled('div')`
  display: flex;
  align-items: center;
`;

const InformationColumn = styled(Column)`
  flex-direction: column;
  align-items: flex-start;
`;

const ActionsColumn = styled(Column)`
  justify-content: flex-end;
`;
