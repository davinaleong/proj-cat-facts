const app = document.getElementById('root');

const pageHeading = document.createElement('h1');
pageHeading.textContent = "Cat Facts";
app.appendChild(pageHeading);

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://jsonplaceholder.typicode.com/todos/', true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(this.response);

    data.forEach(todoItem => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const cardContent = document.createElement('div');
      cardContent.setAttribute('class', 'card-content');
      cardContent.textContent = todoItem.title;
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
    });
  } else {
    const errorMessage = document.createElement('div');
    errorMessage.setAttribute('class', 'alert');
    errorMessage.textContent = "Can't connect to 'JSON Placeholder'.";

    app.appendChild(errorMessage);
  }
}

request.send();