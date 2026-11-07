/**
 * Decide which pull request a "Validate Chain Files" workflow run belongs to.
 *
 * The artifact produced by that workflow carries an attacker-controlled PR
 * number, so the number alone is never trusted: a pull request is only
 * accepted when exactly one open or closed PR matches the run's repository,
 * branch and head commit, and that PR's number equals the artifact's.
 *
 * Returns { number, reason }: number is null when the run must not comment.
 */
function selectPullRequest({ run, pullRequests, artifactNumber }) {
  if (!run?.head_repository?.full_name || !run?.head_branch || !run?.head_sha) {
    return { number: null, reason: "Workflow run is missing its pull request identity." };
  }

  const matches = pullRequests.filter(
    (pr) =>
      pr.head?.ref === run.head_branch &&
      pr.head?.repo?.full_name === run.head_repository.full_name &&
      (pr.head?.sha === run.head_sha || pr.merge_commit_sha === run.head_sha)
  );

  if (matches.length > 1) {
    return { number: null, reason: "The workflow run matches multiple pull requests." };
  }
  if (matches.length === 0) {
    return { number: null, reason: "No pull request matches the workflow run's head commit." };
  }
  if (matches[0].number !== artifactNumber) {
    return {
      number: null,
      reason: `Pull request #${artifactNumber} from the artifact is not the workflow run's pull request.`,
    };
  }
  return { number: matches[0].number, reason: null };
}

module.exports = { selectPullRequest };
