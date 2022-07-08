#!/usr/bin/env node
/**
 * @file Generate routes definitions for react-router from the `routes` dir.
 */
import { globbySync } from 'globby'
import { pascalCase } from 'change-case'
import * as path from 'node:path'
import * as fs from 'node:fs'

const srcDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../src')

const files = globbySync('**/*.@(ts|tsx)', {
  cwd: path.resolve(srcDir, './routes'),
  ignore: ['**/_shared', '**/*.style.@(ts|tsx)']
})

const routes = []
const result = Symbol('result')
const level = { [result]: routes }
files.forEach(file => {
  file.split('/').reduce((r, name, i, a) => {
    if (!r[name]) {
      r[name] = { [result]: [] }
      r[result].push({
        fileName: name,
        children: r[name][result]
      })
    }

    return r[name]
  }, level)
})

let imports = ''
const renderedRoutes = mapRoute({ children: routes }, '', 4)

fs.writeFileSync(
  path.resolve(srcDir, 'core/RootRoutes.tsx'),
  `// Auto generated by bin/generate-routes.mjs, DO NOT change this file manually!
import { FC, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

${imports}
export const RootRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
${renderedRoutes}
      </Routes>
    </BrowserRouter>
  )
}`
)

function mapRoute(root, pathPrefix, depth) {
  return root.children
    .map(route => {
      const basename = path.basename(route.fileName, path.extname(route.fileName))
      const routePath = basename === '$' ? '*' : basename.replaceAll('$', ':')
      const importPath = `${pathPrefix}/${basename}`
      const componentName = pascalCase(
        // eslint-disable-next-line no-nested-ternary
        `${pathPrefix}/${routePath === '*' ? 'match-all' : routePath === '_' ? 'layout' : routePath}`
      )
      if (routePath === '_') {
        imports += `const ${componentName} = lazy(async () => await import('@/routes${importPath}'))\n`
        root.componentName = componentName
        return ''
      } else {
        const pathSegment = routePath === 'index' ? 'index' : `path="${routePath}"`
        if (route.children.length === 0) {
          imports += `const ${componentName} = lazy(async () => await import('@/routes${importPath}'))\n`
          return `<Route ${pathSegment} element={<${componentName} />} />`
        } else {
          const childRoutes = mapRoute(route, importPath, depth + 1)
          return `<Route ${routePath === 'index' ? 'index' : `path="${routePath}"`}${
            route.componentName ? ` element={<${route.componentName} />}` : ''
          }>\n${childRoutes}\n${' '.repeat(depth * 2)}</Route>`
        }
      }
    })
    .filter(Boolean)
    .map(line => `${' '.repeat(depth * 2)}${line}`)
    .join('\n')
}
