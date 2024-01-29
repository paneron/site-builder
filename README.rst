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
      [--forusername <username>] \
      [watch [--serve] [--watch-template]]

It would:

* place site assets under ``outdir``,
* generate data indices as required by site runtime
  and place them under ``outdir`` where expected.

Uses Node 20.11.2.
