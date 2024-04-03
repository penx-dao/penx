const octo = [
  'octokit',
  '@octokit/oauth-app',
  '@octokit/openapi-types',
  '@octokit/core',
  '@octokit/app',
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  transpilePackages: [
    ...octo,
    '@penx/abi',
    '@penx/api',
    '@penx/app',
    '@penx/constants',
    '@penx/db',
    '@penx/math',
    '@penx/catalogue',
    '@penx/hooks',
    '@penx/node-hooks',
    '@penx/local-db',
    '@penx/wagmi',
    '@penx/editor',
    '@penx/editor-queries',
    '@penx/editor-shared',
    '@penx/editor-transforms',
    '@penx/editor-types',
    '@penx/editor-common',
    '@penx/editor-composition',
    '@penx/icons',
    '@penx/google-drive',
    '@penx/google-translate',
    '@penx/shared',
    '@penx/model',
    '@penx/context-menu',
    '@penx/service',
    '@penx/serializer',
    '@penx/extension-store',
    '@penx/storage',
    '@penx/store',
    '@penx/session',
    '@penx/model-types',
    '@penx/cmdk',
    '@penx/event',
    '@penx/storage-estimate',
    '@penx/word-count',
    '@penx/blockquote',
    '@penx/divider',
    '@penx/check-list',
    '@penx/auto-format',
    '@penx/paragraph',
    '@penx/list',
    '@penx/image',
    '@penx/file',
    '@penx/link',
    '@penx/bidirectional-link',
    '@penx/table',
    '@penx/database',
    '@penx/dnd-projection',
    '@penx/block-selector',
    '@penx/editor-leaf',
    '@penx/trpc-client',
    '@penx/sync',
    '@penx/sync-server-client',
    '@penx/unique-id',
    '@penx/extension-list',
    '@penx/worker',
    '@penx/widget',
    'uikit',
    '@penx/slate-lists',
  ],
}

export default nextConfig
