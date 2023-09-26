const readline = require('readline');
const { createIssue, readIssues, readIssueById, updateIssue, deleteIssue } = require('../client'); // Adjust the path according to your project structure

const axios = require('axios');

jest.mock('axios');

describe('createIssue Function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an issue', async () => {
    // Mock the axios post method
    axios.post.mockResolvedValue({ data: { message: 'Issue created successfully' } });

    // Create a mock readline interface
    const mockInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Simulate user input
    const mockQuestion = jest.spyOn(mockInterface, 'question');
    mockQuestion.mockImplementationOnce((question, callback) => {
      callback('Test Title');
    });
    mockQuestion.mockImplementationOnce((question, callback) => {
      callback('Test Description');
    });

    // Call the createIssue function
    await createIssue();

    // Check if axios post method was called with the expected data
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/issues', {
      title: 'Test Title',
      description: 'Test Description',
    });

    // Check if the success message was printed
    expect(console.log).toHaveBeenCalledWith('Issue created successfully');

    // Restore the original readline behavior
    mockQuestion.mockRestore();
  },20000);
});
