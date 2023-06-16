import Functionality from '../src/modules/functionality.js';

describe('editDescription', () => {
  let data;
  let index;
  let editInput;

  beforeEach(() => {
    
    data = [
      { description: 'Task 1' },
      { description: 'Task 2' },
      { description: 'Task 3' },
    ];
    index = 2; // Index of the task to be edited
    editInput = { value: 'Updated Task' };
  });
  it('should update the description and return true if the input is not empty', () => {
    const result = Functionality.editDescription(data, index, editInput);

    expect(data[index - 1].description).toBe('Updated Task');
    
    expect(result).toBe(true);
  });

  it('should not update the description and return false if the input is empty', () => {
    editInput.value = '';

    const result = Functionality.editDescription(data, index, editInput);

    // Verify the description remains unchanged
    expect(data[index - 1].description).toBe('Task 2');
    // Verify the function returns false
    expect(result).toBe(false);
  });
});
