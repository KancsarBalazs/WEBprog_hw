// ajax.js

const API_URL = 'http://gamf.nhely.hu/ajax2/';

function validateInput(...fields) {
  return fields.every(field => field.trim() !== '' && field.length <= 30);
}

function readData() {
  const code = document.getElementById('readCode').value.trim();
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `op=read&code=${code}`
  })
  .then(response => response.json())
  .then(data => {
    const resultsDiv = document.getElementById('readResults');
    resultsDiv.innerHTML = '';
    let total = 0;
    let max = -Infinity;
    data.list.forEach(entry => {
      resultsDiv.innerHTML += `<p>ID: ${entry.id}, Name: ${entry.name}, Height: ${entry.height}, Weight: ${entry.weight}</p>`;
      const h = parseFloat(entry.height);
      if (!isNaN(h)) {
        total += h;
        if (h > max) max = h;
      }
    });
    const avg = (data.list.length > 0) ? (total / data.list.length).toFixed(2) : 0;
    resultsDiv.innerHTML += `<p><strong>Total Height:</strong> ${total}</p>`;
    resultsDiv.innerHTML += `<p><strong>Average Height:</strong> ${avg}</p>`;
    resultsDiv.innerHTML += `<p><strong>Max Height:</strong> ${max}</p>`;
  });
}

function createData() {
  const name = document.getElementById('createName').value.trim();
  const height = document.getElementById('createHeight').value.trim();
  const weight = document.getElementById('createWeight').value.trim();
  const code = document.getElementById('createCode').value.trim();
  const feedback = document.getElementById('createFeedback');

  if (!validateInput(name, height, weight, code)) {
    feedback.innerText = 'Invalid input. Fields must be filled and ≤ 30 chars.';
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`
  })
  .then(res => res.text())
  .then(text => feedback.innerText = 'Create result: ' + text);
}

function getDataForId() {
  const id = document.getElementById('updateId').value.trim();
  const code = document.getElementById('updateCode').value.trim();

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `op=read&code=${code}`
  })
  .then(response => response.json())
  .then(data => {
    const entry = data.list.find(item => item.id === id);
    if (entry) {
      document.getElementById('updateName').value = entry.name;
      document.getElementById('updateHeight').value = entry.height;
      document.getElementById('updateWeight').value = entry.weight;
    } else {
      document.getElementById('updateFeedback').innerText = 'Record not found.';
    }
  });
}

function updateData() {
  const id = document.getElementById('updateId').value.trim();
  const name = document.getElementById('updateName').value.trim();
  const height = document.getElementById('updateHeight').value.trim();
  const weight = document.getElementById('updateWeight').value.trim();
  const code = document.getElementById('updateCode').value.trim();
  const feedback = document.getElementById('updateFeedback');

  if (!validateInput(id, name, height, weight, code)) {
    feedback.innerText = 'Invalid input. Fields must be filled and ≤ 30 chars.';
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`
  })
  .then(res => res.text())
  .then(text => feedback.innerText = 'Update result: ' + text);
}

function deleteData() {
  const id = document.getElementById('deleteId').value.trim();
  const code = document.getElementById('deleteCode').value.trim();
  const feedback = document.getElementById('deleteFeedback');

  if (!validateInput(id, code)) {
    feedback.innerText = 'Invalid input. Fields must be filled and ≤ 30 chars.';
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `op=delete&id=${id}&code=${code}`
  })
  .then(res => res.text())
  .then(text => feedback.innerText = 'Delete result: ' + text);
}
