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

function _loadAssets<Src extends string>(
  srcs: readonly Src[],
  onProgress: (done: number[], total: number[]) => void,
  onError: (assetSrc: Src, msg?: string, resp?: XMLHttpRequest["response"]) => void,
  onDone: (assetSrc: Src) => void,
) {
  for (const src of srcs) {
    if (LOAD_STATUS[src]) {
      throw new Error(`Attempt to load ${src} twice!`);
    }
    LOAD_STATUS[src] = {
      done: 0,
      total: 0,
    };
  }
  const xhrs: { [src in Src]: XMLHttpRequest } = srcs.
    map((assetSrc: Src) => {
      console.debug("Loading dependency", assetSrc);

      const xhr = new XMLHttpRequest;

      xhr.open('GET', assetSrc, true);
      xhr.onload = function (e) {
        if (xhr.readyState === 2) {
          LOAD_STATUS[assetSrc].total = parseInt(
            xhr.getResponseHeader('content-length') || '0',
            10);
        }
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            handleDone();
          } else {
            handleError((e.currentTarget as XMLHttpRequest).status);
          }
        }
      };
      xhr.onerror = function (e) {
        handleError((e.currentTarget as XMLHttpRequest).status);
      };
      xhr.onprogress = function (e) {
        if (!LOAD_STATUS[assetSrc]) {
          throw new Error(`Unknown asset ${assetSrc} (not being loaded)`);
        }
        LOAD_STATUS[assetSrc].done = e.loaded;
        LOAD_STATUS[assetSrc].total = e.total;
        onProgress(
          Object.values(LOAD_STATUS).map(e => e['done']),
          Object.values(LOAD_STATUS).map(e => e['total']),
        );
      };

      xhr.send();

      function handleError(status: number, e?: unknown) {
        console.error("failed to load dependency", assetSrc, status, xhr.response, e);
        if (status === 404) {
          onError(assetSrc, "URL was not found");
        } else if (status === 500) {
          onError(assetSrc, "Server error occurred while serving");
        } else if (status === 0) {
          onError(assetSrc, "Request was aborted or content length incorrect");
        } else {
          onError(assetSrc, "Server returned an unexpected HTTP status", xhr.response);
        }

        abortAll();
      }

      return { [assetSrc]: xhr } as { [key in Src]: XMLHttpRequest };
    }).
    reduce((prev, curr) => ({ ...prev, ...curr }));

  function getXHRs(): XMLHttpRequest[] {
    return ([...Object.values(xhrs)] as XMLHttpRequest[]);
  }

  function handleDone() {
    const unfinished = getXHRs().find(xhr => xhr.status !== 200 || xhr.readyState !== 4);

    if (!unfinished) {
      for (const scriptSrc of Object.keys(xhrs)) {
        onDone(scriptSrc as Src);
      }
    }
  }

  const abortAll = function abortAll() {
    for (const xhr of getXHRs()) {
      xhr.abort();
    }
  }

  return abortAll;
}

const app = document.getElementById('app')!;
app.innerHTML = '';

function createProgress(assetSrc: string): { bar: HTMLElement, label: HTMLElement } {
  if (!assets[assetSrc]) {
    const progressEl = document.createElement('progress');
    progressEl.style.marginBottom = '1em';
    const statusEl = document.createElement('p');
    app.appendChild(progressEl);
    app.appendChild(statusEl);
    assets[assetSrc] = { bar: progressEl, label: statusEl };
  }
  return assets[assetSrc];
}
const assets:
Record<string, { bar: HTMLElement, label: HTMLElement }> =
{} as const;

const loadAssets = async () => {

  const injectionManifestJson = await (await fetch('/injection-manifest.json')).json();

  const { injectedEntries } = injectionManifestJson;

  const assetSrcs = [
    ...injectedEntries,
    './index.js',
    './index.css',
  ] as const;

  _loadAssets<typeof assetSrcs[number]>(
    assetSrcs,
    function handleProgress (done_, total_) {
      for (const [idx, ] of total_.entries()) {
        const assetSrc = assetSrcs[idx];
        console.log('Handling asset: ', assetSrc);
        const { bar: progressEl, label: statusEl } = createProgress(assetSrc);
        const done = done_[idx];
        const total = total_[idx];
        if (done < total) {
          progressEl.setAttribute('max', String(total));
          progressEl.setAttribute('value', String(done));
        } else {
          progressEl.removeAttribute('max');
          progressEl.removeAttribute('value');
        }
        statusEl.innerHTML = `Loading ${assetSrc}<br/>${byteFormatter.format(done)}`;
      }
    },
    function handleError (assetSrc, err) {
      const { label: statusEl } = createProgress(assetSrc);
      statusEl.innerHTML = `An error occurred fetching ${assetSrc}.<br />${err}.`;
    },
    function handleDone (src) {
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
};

loadAssets();
