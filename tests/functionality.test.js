import Functionality from '../src/modules/functionality.js';

describe('newTask', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('newTask should add a new task to the array, then verify', () => {
    // Set up the initial test environment with the item properties to be added to existing array
    document.body.innerHTML = `
            <div id="todo-holder"></div>
            <input type="text" id="text-section" value="for testing" />
            <form id="text-form">
                <input type="submit" id="submit-button" />
            </form>
        `;

    // Set up the existing tasks
    const tasks = [{ index: 1, description: 'existing task', completed: false }];
    localStorage.setItem('data', JSON.stringify(tasks));

    // Call the newTask function
    Functionality.newTask();

    // Verify the task is added to the array
    const updatedTasks = Functionality.getAllTasks();
    expect(updatedTasks).toHaveLength(2);
    expect(updatedTasks[0].description).toBe('existing task');
    expect(updatedTasks[1].description).toBe('for testing');
    expect(updatedTasks[1].completed).toBe(false);
    expect(updatedTasks[1].index).toBe(2);

    // Verify the task is saved to localStorage
    expect(localStorage.getItem('data')).not.toBeNull();
    const storedTasks = JSON.parse(localStorage.getItem('data'));
    expect(storedTasks).toHaveLength(2);
    expect(storedTasks[0].description).toBe('existing task');
    expect(storedTasks[0].completed).toBe(false);
    expect(storedTasks[0].index).toBe(1);
    expect(storedTasks[1].description).toBe('for testing');
    expect(storedTasks[1].completed).toBe(false);
    expect(storedTasks[1].index).toBe(2);

    // Verify the task is displayed
    const taskElement = document.querySelector('#todo-holder li');
    expect(taskElement).not.toBeNull();
  });
});

describe('removeTask functionality', () => {

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });
    test('removeTask function should remove a task from the array and localStorage', () => {

      const tasks = [
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: false, index: 2 },
        { description: 'Task 3', completed: false, index: 3 },
      ];
      localStorage.setItem('data', JSON.stringify(tasks));

      // Call the removeTask function to remove Task 2;
      Functionality.removeTask(1);


      // Verify the task is removed from the array
      const updatedTasks = Functionality.getAllTasks();
      expect(updatedTasks).toHaveLength(2);
      expect(updatedTasks[0].description).toBe('Task 1');
      expect(updatedTasks[1].description).toBe('Task 3');

      // Verify the task1 is not  removed from the DOM
      const element1 = document.querySelector('#todo-holder li:first-child');
      expect(element1).not.toBeNull();

    });
  });
