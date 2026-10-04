import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  i18n: {
    fallbackLanguage: 'ar',
    supportedLanguages: {
      ar,
      en,
    },
  },

  localization: {
    defaultLocale: 'ar',
    fallback: true,
    locales: [
      {
        code: 'ar',
        label: {
          ar: 'العربية',
          en: 'Arabic',
        },
        rtl: true,
      },
      {
        code: 'en',
        label: {
          ar: 'الإنجليزية',
          en: 'English',
        },
      },
    ],
  },

  collections: [Users, Media],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  sharp,

  plugins: [],
})
