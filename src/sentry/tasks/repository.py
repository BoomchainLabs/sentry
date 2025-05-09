from sentry.deletions import get_manager
from sentry.deletions.base import _delete_children
from sentry.deletions.defaults.repository import _get_repository_child_relations
from sentry.models.repository import Repository
from sentry.silo.base import SiloMode
from sentry.tasks.base import instrumented_task
from sentry.taskworker.config import TaskworkerConfig
from sentry.taskworker.namespaces import integrations_tasks


@instrumented_task(
    name="sentry.models.repository_cascade_delete_on_hide",
    acks_late=True,
    silo_mode=SiloMode.REGION,
    taskworker_config=TaskworkerConfig(
        namespace=integrations_tasks,
    ),
)
def repository_cascade_delete_on_hide(repo_id: int) -> None:
    # Manually cause a deletion cascade.
    # This should be called after setting a repo's status
    # to ObjectStatus.HIDDEN.
    # References RepositoryDeletionTask and BaseDeletionTask logic.

    try:
        repo = Repository.objects.get(id=repo_id)
    except Repository.DoesNotExist:
        return

    deletions_manager = get_manager()
    has_more = True

    while has_more:
        # get child relations
        child_relations = _get_repository_child_relations(repo)
        # no need to filter relations; delete them
        if child_relations:
            has_more = _delete_children(manager=deletions_manager, relations=child_relations)
