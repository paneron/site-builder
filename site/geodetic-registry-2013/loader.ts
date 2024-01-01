const byteFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

function loadScript(
  onProgress: (done: number, total: number) => void,
  onError: (resp: XMLHttpRequest["response"]) => void,
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
        onError(xhr.response);
      }
    }
  };
  xhr.onprogress = function (e) {
    onProgress(e.loaded, e.total);
  };
  xhr.send();
}

const progressEl = document.createElement('progress');
const statusEl = document.createElement('p');
const app = document.getElementById('app')!;
app.innerHTML = '';
app.appendChild(progressEl);
app.appendChild(statusEl);

loadScript(
  (done, total) => {
    progressEl.setAttribute('max', String(total));
    progressEl.setAttribute('value', String(done));
    statusEl.innerHTML = `Loading Paneron Web<br/>${byteFormatter.format(done)}`;
  },
  (resp) => {
    statusEl.innerHTML = "An error occurred during the initial loading sequence.";
    console.error("Failed to load script", resp);
  },
);

