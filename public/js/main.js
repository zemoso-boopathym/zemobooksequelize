const backdrop = document.querySelector('.backdrop');
const logoutButton = document.getElementById('logout-btn');
const post = document.querySelectorAll('a.posts');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function logoutHandler() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  document.location.href="/";
}

function postXHRParse(e) {
  const name = e.target.name;
  if(name) {
    const sessionToken = sessionStorage.getItem('token');
    const token = `Bearer ${sessionToken}`
    const url = "/post/" + name;
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const mainEl = document.getElementById('content-replacement');
      mainEl.outerHTML = xhr.response;
      history.pushState({}, null, url);
    }
    xhr.open("GET", url);
    if (sessionToken){
      xhr.setRequestHeader("Authorization", token);
    }
    xhr.send();
  }
}

backdrop.addEventListener('click', backdropClickHandler);
post.forEach(e => e.addEventListener('click', postXHRParse));

if (logoutButton){
  logoutButton.addEventListener('click', logoutHandler);
}
