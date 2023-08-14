export { importBuild }

import type { Plugin, ResolvedConfig } from 'vite'
import { importBuild as importBuild_ } from '@brillout/vite-plugin-import-build/plugin'
import { getOutDirs, projectInfo, toPosixPath } from '../../utils.mjs'
import path from 'path'

function importBuild(): Plugin[] {
  let config: ResolvedConfig
  return [
    {
      name: 'vite-plugin-ssr:importBuild:config',
      enforce: 'post',
      configResolved(config_) {
        config = config_
      }
    },
    importBuild_({
      getImporterCode: ({ findBuildEntry }) => {
        const pageFilesEntry = findBuildEntry('pageFiles')
        return getImporterCode(config, pageFilesEntry)
      },
      libraryName: projectInfo.projectName
    })
  ]
}

function getImporterCode(config: ResolvedConfig, pageFilesEntry: string) {
  const importPathAbsolute = toPosixPath(
    // [RELATIVE_PATH_FROM_DIST] Current file: node_modules/vite-plugin-ssr/dist/cjs/node/plugin/plugins/importBuild/index.mjs
    require.resolve(`../../../../../../dist/cjs/node/runtime/globalContext/loadImportBuild.mjs`)
  )
  const { outDirServer } = getOutDirs(config)
  const importPath = path.posix.relative(outDirServer, importPathAbsolute)
  const importerCode = [
    '{',
    `  const { setImportBuildGetters } = require('${importPath}');`,
    '  setImportBuildGetters({',
    `    pageFiles: () => import('./${pageFilesEntry}'),`,
    "    clientManifest: () => require('../client/manifest.json'),",
    "    pluginManifest: () => require('../client/vite-plugin-ssr.json'),",
    '  });',
    '}',
    ''
  ].join('\n')
  return importerCode
}
