const createPost = async () => {
event.preventDefault;

const subject = document.querySelector('#subject').value.trim();
const body = document.querySelector('#body').value.trim();

if (subject && body) {
  const response = await fetch('/api/users/create-post', {
    method: 'POST',
    body: JSON.stringify({ subject, body }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
} else {
    alert('Please fill out both subject and body.');
}
};

document.querySelector('#create-button').addEventListener('click', createPost);