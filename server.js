const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const { createIssue, getIssues, getIssueById, updateIssue, deleteIssue } = require('./issues/issues');

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create an issue
app.post('/api/issues', (req, res) => {
  try {
    const issue = req.body;
    createIssue(issue);
    res.status(201).json({ message: 'Issue created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid JSON' });
  }
});

// Get all issues
app.get('/api/issues', (req, res) => {
  const issues = getIssues();
  res.status(200).json(issues);
});

// Get issue by ID
app.get('/api/issues/:id', (req, res) => {
  const issueId = req.params.id;
  const issue = getIssueById(issueId);
  if (issue) {
    res.status(200).json(issue);
  } else {
    res.status(404).json({ error: 'Issue not found' });
  }
});

// Update an issue by ID
app.put('/api/issues/:id', (req, res) => {
  const issueId = req.params.id;
  try {
    const updatedIssue = req.body;
    if (updateIssue(issueId, updatedIssue)) {
      res.status(200).json({ message: 'Issue updated successfully' });
    } else {
      res.status(404).json({ error: 'Issue not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid JSON' });
  }
});

// Delete an issue by ID
app.delete('/api/issues/:id', (req, res) => {
  const issueId = req.params.id;
  if (deleteIssue(issueId)) {
    res.status(200).json({ message: 'Issue deleted successfully' });
  } else {
    res.status(404).json({ error: 'Issue not found' });
  }
});

// Handle not found routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app; 