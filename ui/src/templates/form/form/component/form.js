import './form.scss';

let queryForm = function(e) {
  let t = !(!e || !e.reset) && e.reset;
  let n = window.location.toString().split('?');

  if (n.length > 1) {
    let o = n[1].split('&');

    for (s in o) {
      let r = o[s].split('=');
      (t || null === sessionStorage.getItem(r[0])) && sessionStorage.setItem(r[0], decodeURIComponent(r[1]))
    }
  }

  for (let i = document.querySelectorAll('input[type=hidden], input[type=text]'), s = 0; s < i.length; s++) {
    let a = sessionStorage.getItem(i[s].name);
    a && (document.getElementsByName(i[s].name)[0].value = a)
  }
};

setTimeout(() => { queryForm() }, 3000);
