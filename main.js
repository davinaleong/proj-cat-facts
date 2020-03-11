const app = document.getElementById('root');

const pageHeading = document.createElement('h1');
pageHeading.textContent = "Cat Facts";
app.appendChild(pageHeading);

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

const todosRequest = new XMLHttpRequest();
todosRequest.open('GET', 'https://jsonplaceholder.typicode.com/todos/', true);
todosRequest.onload = function() {
  if (todosRequest.status >= 200 && todosRequest.status < 400) {
    const data = JSON.parse(this.response);

    data.forEach(todoItem => {
      const userRequest = new XMLHttpRequest();
      userRequest.open('GET', 'https://jsonplaceholder.typicode.com/users/'+todoItem.userId, true);
      userRequest.onload = function() {
        const userData = JSON.parse(this.response);

        // console.log('userData', userData);
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const cardHeading = document.createElement('div');
        cardHeading.setAttribute('class', 'card-heading');
        cardHeading.textContent = todoItem.title;
        card.appendChild(cardHeading);

        const cardContent = document.createElement('div');
        cardContent.setAttribute('class', 'card-content');
        cardContent.textContent = userData.name;
        card.appendChild(cardContent);
        
        const cardFooter = document.createElement('div');
        if (todoItem.completed) {
          cardFooter.setAttribute('class', 'card-footer completed');
          cardFooter.textContent = "Completed";
        } else {
          cardFooter.setAttribute('class', 'card-footer incomplete');
          cardFooter.textContent = "Incomplete";
        }
        card.appendChild(cardFooter);

        container.appendChild(card);
      }
      userRequest.send();
    });
  } else {
    const errorMessage = document.createElement('div');
    errorMessage.setAttribute('class', 'alert');
    errorMessage.textContent = "Can't connect to 'JSON Placeholder'.";

    app.appendChild(errorMessage);
  }
}

todosRequest.send();