Site builder
============

This builds a static site for given Paneron RegistryKit based dataset.

Not production ready; currently under development.

Intended to be run as::

    npx @paneron/site-builder --outdir dist [--datadir path/to/register] [watch --serve]

More complete option overview::

    npx @paneron/site-builder \
      --outdir dist \
      [--debug | --verbose] \
      [--datadir path/to/register] \
      [--dataversion (git rev-parse --short HEAD)] \
      [--devextpath /path/to/local/extension] \
      [--forusername <username>] \
      [watch [--serve] [--watch-template] [--port 12345]]

It would:

* place site assets under ``outdir``,
* generate data indices as required by site runtime
  and place them under ``outdir`` where expected.

Uses Node 20.11.2.


Development
-----------

Tested on:

- Node 20.11.2

Note that build is handled by esbuild, while TSC is still used
for typechecking. Type errors shouldn’t be ignored, but a type error
may still result in a valid build (depends on specifics).

Important scripts:

- Root package’s ``build-self`` script compiles site builder

- site/spa’s ``clean-build`` script compiles front-end code

  .. important::
  
     This repository uses Yarn PnP, but in ``loose`` mode
     for the sake of ``spa`` package build script.
     Since ExtensionKit and RegistryKit import packages
     that they list only in ``devDependencies``,
     in strict mode esbuild would fail with
     an `error <https://stackoverflow.com/questions/76015181/the-yarn-plugnplay-manifest-forbids-importing-xyz-here-because-its-not-list>`_
     for every such import when bundling SPA for client-side.

Release
~~~~~~~

- Remember to run the important scripts before testing & publishing

- Run ``npm publish`` from the root
  (no need to change into a separate “dist” dir)
