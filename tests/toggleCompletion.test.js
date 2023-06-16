import Functionality from '../src/modules/functionality.js';

describe('Functionality', () => {
    describe('toggleTaskCompletion', () => {
        beforeEach(() => {
            localStorage.clear();
        });

        test('should toggle the completion status of a task', () => {
            // Set up test data
            const testData = [
                { description: 'Task 1', completed: false, index: 1 },
                { description: 'Task 2', completed: true, index: 2 },
                { description: 'Task 3', completed: false, index: 3 },
            ];
            localStorage.setItem('data', JSON.stringify(testData));

            Functionality.toggleTaskCompletion(1);

            const updatedData = JSON.parse(localStorage.getItem('data'));

            // Assert the completion status is toggled
            expect(updatedData[1].completed).toBe(false);
        });
        test('should not modify task data if index is out of bounds', () => {
            // test data
            const testData = [
                { description: 'Task 1', completed: false, index: 1 },
                { description: 'Task 2', completed: true, index: 2 },
                { description: 'Task 3', completed: false, index: 3 },
            ];
            localStorage.setItem('data', JSON.stringify(testData));

            // Call the function with an out of bounds index
            Functionality.toggleTaskCompletion(10);

            // Retrieve the task data from local storage
            const updatedData = JSON.parse(localStorage.getItem('data'));
            expect(updatedData).toEqual(testData);
        });
    });
});
