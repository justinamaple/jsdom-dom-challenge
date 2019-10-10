document.addEventListener('DOMContentLoaded', () => {
  function changeCounter(direction) {
    const counter = document.getElementById('counter');
    let count = parseInt(counter.innerText);

    if(direction === '+')
      count++;
    else if(direction === '-')
      count--;

    counter.innerText = count.toString();
  }

  function incrementCounter() {
    if(!paused)
      changeCounter('+');
  }

  const counter = document.getElementById('counter');
  let paused = false;
  let interval = setInterval(incrementCounter, 1000);

  const minus = document.getElementById('minus');
  minus.addEventListener('click', function() {
    changeCounter('-')
  });
  
  const plus = document.getElementById('plus');
  plus.addEventListener('click', function() {
    changeCounter('+')
  });

  const heart = document.getElementById('heart');
  heart.addEventListener('click', function() {
    const likes = document.getElementsByClassName('likes')[0];
    let items = Array.from(likes.getElementsByTagName("li"));
    let map = items.map(item => item['attributes'][0]['value']);

    let datanum = counter.innerText;
    let li = document.createElement('li');
    li.setAttribute('data-num', parseInt(datanum));

    if(map.includes(datanum)) {
      let li = document.querySelector('[data-num="' + datanum + '"]');
      let span = li.querySelector('span');
      let count = parseInt(span.innerText);
      count++;
      span.innerText = count;
    } else {
      let span = document.createElement('span');
      span.innerHTML = 1;
      li.appendChild(document.createTextNode(`${counter.innerText} has been liked `));
      li.appendChild(span);
      li.appendChild(document.createTextNode(` times`));
      likes.appendChild(li);
    }
  });
  
  const pause = document.getElementById('pause');
  pause.addEventListener('click', function() {
    minus.disabled = !minus.disabled;
    plus.disabled = !plus.disabled;
    heart.disabled = !heart.disabled;
    submit.disabled = !submit.disabled;
    paused = !paused;
  });

  const form = document.getElementById('comment-form');
  const list = document.getElementById('list');
  const input = document.getElementById('comment-input');
  form.addEventListener('submit', function() {
    event.preventDefault()
    let text = input.value;
    input.value = '';
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(text))
    list.appendChild(p);
  });
});
