class Functionality {
  static newTask() {
    const inputData = document.getElementById('text-section').value;
    const saveData = document.getElementById('text-form');
    const storage = this.getAllTasks().length + 1;
    const task = [{ description: inputData, completed: false, index: parseInt(storage, 10) }];
    this.saveTask(task);
    this.displayTask();
    saveData.reset();
  }

  static displayTask() {
    const div = document.querySelector('#todo-holder');
    div.innerHTML = '';
    this.getAllTasks().forEach((task) => {
      let checked = '';
      let style = '';
      let styleDescription = '';
      const styleText = 'style="display:none"';
      if (task.completed) {
        styleDescription = 'style="text-decoration: line-through"';
        checked = 'checked';
        style = 'class="line"';
      }
      div.innerHTML += `<li><input class="checkbox-class" type="checkbox" id="checkbox-${task.index}" ${checked} /> <h3  id="d${task.index}" ${style} ${styleDescription} >${task.description}</h3><input class="edit-class" type="text" value="${task.description}" id="edit-${task.index}" ${styleText}/><button type="button" id="editBttn-${task.index}" class="editButton"></button><button type="button" class="deleteButton" id="delete-${task.index}"></button></li>`;
    });
  }

  static removeTask(index) {
    if (index > -1) {
      const newData = this.getAllTasks();
      newData.splice(index, 1);
      for (let i = index; i < this.getAllTasks().length - 1; i += 1) {
        newData[i].index = i + 1;
      }
      this.updateTask(newData);
      this.displayTask();
    }
  }

  static saveTask(todo) {
    if (this.getAllTasks().length !== 0) {
      localStorage.setItem(
        'data',
        JSON.stringify(this.getAllTasks().concat(todo)),
      );
    } else {
      localStorage.setItem('data', JSON.stringify(todo));
    }
  }

  static getAllTasks() {
    if (localStorage.getItem('data')) {
      return JSON.parse(localStorage.getItem('data'));
    }
    return [];
  }

  static updateTask = (newDatas) => {
    localStorage.clear();
    localStorage.setItem('data', JSON.stringify(newDatas));
  }

  // Edit task description function
  static editDescription(data, index, editInput) {
    const updatedDescription = editInput.value.trim();
    if (updatedDescription !== '') {
      data[index - 1].description = updatedDescription;
      return true;
    }
    return false;
  }

  // clear all done new function
  static clearAllDoneFun() {
    const data = Functionality.getAllTasks();
    const storage = data.filter((todo) => todo.completed === false);
    for (let i = 0; i < storage.length; i += 1) {
      storage[i].index = i + 1;
    }
    this.updateTask(storage);
    this.displayTask();
  }
  // Toggle completion function.

  static toggleTaskCompletion(index) {
    const data = Functionality.getAllTasks();

    if (data && data.length > index) {
      const task = data[index];

      task.completed = !task.completed;

      Functionality.updateTask(data);
    }
  }
}
export default Functionality;