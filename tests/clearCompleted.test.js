import Functionality from '../src/modules/functionality.js';

// Mock the localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('clearAllDoneFun', () => {
  beforeEach(() => {
    // Clear the localStorage before each test
    localStorage.clear();
  });

  it('should remove completed tasks from the data and update the task list', () => {
    // Mock the initial data with completed and incomplete tasks
    document.body.innerHTML = `
      <div id="todo-holder">
        <ul>
          <li>
            <input type="checkbox" class="checkbox-class" id="checkbox-1" />
            <label id="d1">Task 4</label>
          </li>
        </ul>
      </div>
    `;
    const initialData = [
      { description: 'Task 1', completed: true, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: true, index: 3 },
    ];
    localStorage.setItem('data', JSON.stringify(initialData));
    Functionality.clearAllDoneFun();
    // Retrieve the updated data from localStorage
    const updatedData = JSON.parse(localStorage.getItem('data'));

    expect(updatedData.length).toBe(1);
    expect(updatedData[0].description).toBe('Task 2');
    expect(updatedData[0].completed).toBe(false);
    expect(updatedData[0].index).toBe(1);
  });

  it('should not modify the data if there are no completed tasks', () => {
    // Mock the initial data with no completed tasks
    const initialData = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];
    localStorage.setItem('data', JSON.stringify(initialData));
    Functionality.clearAllDoneFun();

    const updatedData = JSON.parse(localStorage.getItem('data'));

    // Verify the expected behavior
    expect(updatedData.length).toBe(3);
    expect(updatedData).toEqual(initialData);
  });

  it('should handle empty data correctly', () => {
    localStorage.setItem('data', '[]');

    Functionality.clearAllDoneFun();

    // Retrieve the updated data from localStorage
    const updatedData = JSON.parse(localStorage.getItem('data'));
    expect(updatedData.length).toBe(0);
  });
});