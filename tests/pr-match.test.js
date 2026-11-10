/**
 * Covers the guard that stops "Comment on validation failure" from writing to
 * the wrong pull request when the uploaded artifact carries a forged number.
 * Run with: node --test tests/pr-match.test.js
 */

const test = require("node:test");
const assert = require("node:assert");
const { selectPullRequest } = require("../.github/scripts/pr-match");

const RUN = {
  head_repository: { full_name: "contributor/chainlist" },
  head_branch: "fix/registry-schema-conformance",
  head_sha: "abbb2ec0000000000000000000000000000000000",
};

const pr = (overrides = {}) => ({
  number: 3292,
  head: { ref: RUN.head_branch, sha: RUN.head_sha, repo: { full_name: RUN.head_repository.full_name } },
  merge_commit_sha: null,
  ...overrides,
});

test("accepts the unique pull request that matches the run", () => {
  assert.deepStrictEqual(selectPullRequest({ run: RUN, pullRequests: [pr()], artifactNumber: 3292 }), {
    number: 3292,
    reason: null,
  });
});

test("accepts a merge commit match", () => {
  const merged = pr({ head: { ref: RUN.head_branch, sha: "different", repo: { full_name: RUN.head_repository.full_name } } });
  merged.merge_commit_sha = RUN.head_sha;
  assert.strictEqual(selectPullRequest({ run: RUN, pullRequests: [merged], artifactNumber: 3292 }).number, 3292);
});

test("rejects a run whose head commit no longer matches the pull request", () => {
  const stale = pr({ head: { ref: RUN.head_branch, sha: "0".repeat(40), repo: { full_name: RUN.head_repository.full_name } } });
  const result = selectPullRequest({ run: RUN, pullRequests: [stale], artifactNumber: 3292 });
  assert.strictEqual(result.number, null);
  assert.match(result.reason, /No pull request matches/);
});

test("rejects a pull request from a different repository", () => {
  const other = pr({ head: { ref: RUN.head_branch, sha: RUN.head_sha, repo: { full_name: "stranger/chainlist" } } });
  assert.strictEqual(selectPullRequest({ run: RUN, pullRequests: [other], artifactNumber: 3292 }).number, null);
});

test("rejects when several pull requests match the run", () => {
  const result = selectPullRequest({
    run: RUN,
    pullRequests: [pr({ number: 3292 }), pr({ number: 3301 })],
    artifactNumber: 3292,
  });
  assert.strictEqual(result.number, null);
  assert.match(result.reason, /multiple pull requests/);
});

test("rejects a forged artifact number even though the pull request matches", () => {
  const result = selectPullRequest({ run: RUN, pullRequests: [pr()], artifactNumber: 1 });
  assert.strictEqual(result.number, null);
  assert.match(result.reason, /#1 from the artifact/);
});

test("rejects a missing, null, non-numeric or stringified artifact number", () => {
  for (const artifactNumber of [undefined, null, NaN, "3292"]) {
    const result = selectPullRequest({ run: RUN, pullRequests: [pr()], artifactNumber });
    assert.strictEqual(result.number, null, `artifact number ${String(artifactNumber)} must be rejected`);
  }
});

test("rejects a run without head identity", () => {
  const result = selectPullRequest({ run: { head_branch: RUN.head_branch }, pullRequests: [pr()], artifactNumber: 3292 });
  assert.strictEqual(result.number, null);
  assert.match(result.reason, /missing its pull request identity/);
});
