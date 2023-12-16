Site builder
============

This builds a static site for given Paneron RegistryKit based dataset.

Not production ready; currently under development.

Intended to be run as
(assuming invocation from dataset root directory, i.e. where register.yaml is located)::

    npx @paneron/site-builder --outdir dist --debug

It would:

* place site assets under ``outdir``,
* generate data indices as required by site runtime
  and place them under ``outdir`` where expected.
