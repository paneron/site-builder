Site builder
============

This builds a static site for given Paneron RegistryKit based dataset.

Not production ready; currently under development.

Intended to be run as::

    npx @paneron/site-builder [--debug|--verbose] --outdir dist [--datadir path/to/register] [watch --serve]

It would:

* place site assets under ``outdir``,
* generate data indices as required by site runtime
  and place them under ``outdir`` where expected.

Uses Node 20.11.2.
