import './site.css';

const byteFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

function loadScript(
  scriptSrc: string,
  onProgress: (done: number, total: number) => void,
  onError: (msg?: string, resp?: XMLHttpRequest["response"]) => void,
) {
  console.debug("loading script", scriptSrc);

  const xhr = new XMLHttpRequest;
  const tag = document.createElement("script");
  xhr.open("GET", scriptSrc, true);
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        tag.setAttribute('src', scriptSrc);
        document.head.appendChild(tag);
      } else if (xhr.status === 404) {
        onError("Script was not found.");
      } else if (xhr.status === 500) {
        onError("Server error occurred while serving the script.");
      } else {
        console.error("failed to load script", xhr.response);
        onError("Server returned an unexpected HTTP status.", xhr.response);
      }
    }
  };
  xhr.onerror = function (e) {
    xhr.abort();
    console.error("failed to load script", scriptSrc, e);
    if (xhr.status === 404) {
      onError("Script was not found.");
    } else if (xhr.status === 500) {
      onError("Server error occurred while serving the script.");
    } else {
      onError("Request was aborted or content length incorrect.");
    }
  };
  xhr.onprogress = function (e) {
    onProgress(e.loaded, e.total);
  };
  xhr.send();
}

const progressEl = document.createElement('progress');
progressEl.style.marginBottom = '1em';
progressEl.style.alignSelf = 'center';
const statusEl = document.createElement('p');
statusEl.style.alignSelf = 'center';
const app = document.getElementById('app')!;
app.innerHTML = '';
app.appendChild(progressEl);
app.appendChild(statusEl);

loadScript(
  './index.js',
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
    console.error("failed to load", resp);
  },
);

