import { h, html, render, useState, useEffect } from 'https://unpkg.com/htm/preact/standalone.module.js';

const api = "http://localhost:5000/api";

function App (props) {
  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetchPosts()
  }, []);

  function fetchPosts(){
    fetch(`${api}/posts`)
      .then(res => res.json())
      .then(d => setData(d || []));
  }

  function submitPost(){
    fetch(`${api}/posts`, {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({url, title})
    })
    .then(fetchPosts);
  }

  return html`
    <h1>Nilhelm Hacker News [48 65 6a 20 44 61 76 69 64]</h1>
    <div>
      ${data.map(row => html`
        <p key=${row.title}>
          ${row.title}: ${row.url}
        </p>
      `)}
    </div>
    <div class="form">
      <input type="text" name="title" onchange=${e => setTitle(e.target.value)} value=${title} placeholder="title" />
      <input type="text" name="url" onchange=${e => setUrl(e.target.value)} value=${url} placeholder="url" />
      <input type="button" onclick=${submitPost} value="yeet it to the cloud"/>
    </div>`;

}


render(html`<${App} name="World" />`, document.body);