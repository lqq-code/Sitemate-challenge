let issues = [];
let issueIdCounter = 1;

function createIssue(issue) {
  const newIssue = { id: issueIdCounter++, ...issue };
  issues.push(newIssue);
  return newIssue;
}

function getIssues() {
  return issues;
}

function getIssueById(id) {
  return issues.find((issue) => issue.id === parseInt(id));
}

function updateIssue(id, updatedIssue) {
  const index = issues.findIndex((issue) => issue.id === parseInt(id));
  if (index !== -1) {
    issues[index] = { id: parseInt(id), ...updatedIssue };
    return true;
  }
  return false;
}

function deleteIssue(id) {
  const index = issues.findIndex((issue) => issue.id === parseInt(id));
  if (index !== -1) {
    issues.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = { createIssue, getIssues, getIssueById, updateIssue, deleteIssue };
