import { libraryGenerator } from '@nrwl/angular/generators'
import { formatFiles, Tree } from '@nrwl/devkit'

async function createLibrary(host: Tree, appName, name, dryRun = false) {
  const directory = `${appName}/${name}`
  await libraryGenerator(host, {
    name: 'data-access',
    directory,
    tags: `scope:${appName},type:data-access`,
  })
  await libraryGenerator(host, {
    name: 'feature',
    directory,
    tags: `scope:${appName},type:feature`,
  })
  await libraryGenerator(host, {
    name: 'ui',
    directory,
    tags: `scope:${appName},type:feature`,
  })
}

export default async function (host: Tree, schema: { name: string; appName: string; dryRun?: boolean }) {
  const appName = schema.appName || 'web'
  await createLibrary(host, appName, schema.name, schema.dryRun)
  await formatFiles(host)
}
