const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const API_BASE_URL = 'http://localhost:3000/api/issues';

const commands = {
  create: createIssue,
  read: readIssues,
  readById: readIssueById,
  update: updateIssue,
  delete: deleteIssue,
};

async function makeApiRequest(method, url, data = null) {
  try {
    const response = await axios({ method, url, data });
    return response?.data;
  } catch (error) {
    console.error(error?.response?.data?.error);
    throw error; 
  }
}

async function createIssue() {
  const title = await askQuestion('Enter issue title: ');
  const description = await askQuestion('Enter issue description: ');

  const issue = { title, description };
  const response = await makeApiRequest('post', API_BASE_URL, issue);

  console.log(response.message);
  rl.close();
}

async function readIssues() {
  const response = await makeApiRequest('get', API_BASE_URL);
  console.log(response);
  rl.close();
}

async function readIssueById() {
  const id = await askQuestion('Enter issue ID: ');
  const response = await makeApiRequest('get', `${API_BASE_URL}/${id}`);
  console.log(response);
  rl.close();
}

async function updateIssue() {
  const id = await askQuestion('Enter issue ID to update: ');
  const title = await askQuestion('Enter updated issue title: ');
  const description = await askQuestion('Enter updated issue description: ');

  const updatedIssue = { title, description };
  const response = await makeApiRequest('put', `${API_BASE_URL}/${id}`, updatedIssue);

  console.log(response.message);
  rl.close();
}

async function deleteIssue() {
  const id = await askQuestion('Enter issue ID to delete: ');
  const response = await makeApiRequest('delete', `${API_BASE_URL}/${id}`);
  console.log(response.message);
  rl.close();
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

const command = process.argv[2];

if (commands[command]) {
  commands[command]();
} else {
  console.log('Invalid command. Usage: node client.js [create|read|readById|update|delete]');
}

module.exports = {
    createIssue,
    readIssues,
    readIssueById,
    updateIssue,
    deleteIssue
};
