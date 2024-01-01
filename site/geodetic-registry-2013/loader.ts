import './site.css';

const byteFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

function loadScript(
  onProgress: (done: number, total: number) => void,
  onError: (msg?: string, resp?: XMLHttpRequest["response"]) => void,
) {
  const xhr = new XMLHttpRequest;
  const tag = document.createElement("script");
  const scriptSrc = './index.js';
  xhr.open("GET", scriptSrc, true);
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        tag.setAttribute('src', scriptSrc);
        document.head.appendChild(tag);
      } else {
        onError("Server returned unexpected HTTP status", xhr.response);
      }
    }
  };
  xhr.onerror = function () {
    xhr.abort();
    onError("Request was aborted or content length incorrect.");
  };
  xhr.onprogress = function (e) {
    onProgress(e.loaded, e.total);
  };
  xhr.send();
}

const progressEl = document.createElement('progress');
progressEl.style.marginBottom = '1em';
const statusEl = document.createElement('p');
const app = document.getElementById('app')!;
app.innerHTML = '';
app.appendChild(progressEl);
app.appendChild(statusEl);

loadScript(
  (done, total) => {
    if (done < total) {
      progressEl.setAttribute('max', String(total));
      progressEl.setAttribute('value', String(done));
    } else {
      progressEl.removeAttribute('max');
      progressEl.removeAttribute('value');
    }
    statusEl.innerHTML = `Loading Paneron Web<br/>${byteFormatter.format(done)}`;
  },
  (err, resp) => {
    statusEl.innerHTML = `An error occurred during the initial loading sequence.<br />${err}`;
    console.error("Failed to load script", resp);
  },
);

