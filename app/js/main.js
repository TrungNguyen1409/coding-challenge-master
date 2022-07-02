const btn = document.getElementById('btn');

btn.addEventListener('click', function onClick(event) {
  // 👇️ Change text color globally
  document.body.style.color = 'darkgreen';

  // 👇️ Change text color for clicked element only
  // event.target.style.color = 'salmon';
});

//fetch(localhost:3000)