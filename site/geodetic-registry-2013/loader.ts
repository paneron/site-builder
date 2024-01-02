/**
 * Does the initial bootstrap and should be as light as possible
 * (while being sufficiently useful and user-friendly).
 */


import './base.css';
import './loader.css';

const byteFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

const LOAD_STATUS: Record<string, { done: number, total: number }> = {};

function loadScript(
  srcs: readonly string[],
  onProgress: (done: number[], total: number[]) => void,
  onError: (msg?: string, resp?: XMLHttpRequest["response"]) => void,
  onDone: (src: string) => void,
) {
  const xhrs: XMLHttpRequest[] = [];

  for (const scriptSrc of srcs) {
    console.debug("loading dependency", scriptSrc);

    const xhr = new XMLHttpRequest;
    xhrs.push(xhr);

    xhr.open('GET', scriptSrc, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 2 && !LOAD_STATUS[scriptSrc]) {
        LOAD_STATUS[scriptSrc] = {
          done: 0,
          total: parseInt(
            xhr.getResponseHeader('content-length') ?? '0',
            10),
        };
      }
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onDone(scriptSrc);
        } else {
          handleError((e.currentTarget as XMLHttpRequest).status);
        }
      }
    };
    xhr.onerror = function (e) {
      handleError((e.currentTarget as XMLHttpRequest).status);
    };
    xhr.onprogress = function (e) {
      LOAD_STATUS[scriptSrc] = { done: e.loaded, total: e.total };
      onProgress(
        Object.values(LOAD_STATUS).map(e => e['done']),
        Object.values(LOAD_STATUS).map(e => e['total']),
      );
    };

    xhr.send();

    function handleError(status: number, e?: unknown) {
      console.error("failed to load dependency", scriptSrc, status, xhr.response, e);
      if (status === 404) {
        onError(`${scriptSrc} was not found.`);
      } else if (status === 500) {
        onError(`Server error occurred while serving ${scriptSrc}.`);
      } else if (status === 0) {
        onError(`Request was aborted or content length incorrect for ${scriptSrc}.`);
      } else {
        onError(`Server returned an unexpected HTTP status for ${scriptSrc}.`, xhr.response);
      }

      abortAll();
    }
  }

  const abortAll = function abortAll() {
    for (const xhr of xhrs) {
      xhr.abort();
    }
  }

  return abortAll;
}

const progressEl = document.createElement('progress');
progressEl.style.marginBottom = '1em';
const statusEl = document.createElement('p');
const app = document.getElementById('app')!;
app.innerHTML = '';
app.appendChild(progressEl);
app.appendChild(statusEl);

loadScript(
  ['./index.js', './index.css'],
  (done_, total_) => {
    const done = done_.reduce((a, v) => a + v);
    const total = total_.reduce((a, v) => a + v);
    if (done < total) {
      progressEl.setAttribute('max', String(total));
      progressEl.setAttribute('value', String(done));
    } else {
      progressEl.removeAttribute('max');
      progressEl.removeAttribute('value');
    }
    statusEl.innerHTML = `Loading Paneron Web<br/>${byteFormatter.format(done)}`;
  },
  (err) => {
    statusEl.innerHTML = `An error occurred during the initial loading sequence.<br />${err}`;
  },
  (src) => {
    if (src.endsWith('.js')) {
      const tag = document.createElement('script');
      tag.setAttribute('src', src);
      document.head.appendChild(tag);
    } else if (src.endsWith('.css')) {
      const tag = document.createElement('link');
      tag.setAttribute('href', src);
      tag.setAttribute('rel', 'stylesheet');
      document.head.appendChild(tag);
    }
  },
);
