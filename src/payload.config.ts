import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'
import { Hero } from './globals/Hero'
import { Stats } from './globals/Stats'
import { Documents } from './collections/Documents'
import { AboutUs } from './globals/AboutUs'
import { Services } from './collections/Services'
import { HowWorking } from './globals/HowWorking'
import { WhyUs } from './globals/WhyUs'
import { Partners } from './collections/Partners'
import { AccreditationsTrust } from './collections/AccreditationsTrust'
import { Articles } from './collections/Articles'
import { Testimonials } from './globals/Testimonials'
import { AboutPage } from './globals/AboutPage'
import { ConsultationRequests } from './collections/ConsultationRequests'
import { FAQ } from './globals/FAQ'
import { ArticlesPage } from './globals/ArticlesPage'
import { TeamPage } from './globals/TeamPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const resendAPIKey = process.env.RESEND_API_KEY
const resendFromEmail = process.env.RESEND_FROM_EMAIL

export default buildConfig({
  email: resendAPIKey && resendFromEmail
    ? resendAdapter({
        apiKey: resendAPIKey,
        defaultFromAddress: resendFromEmail,
        defaultFromName: 'YAZ Law',
      })
    : undefined,

  admin: {
    user: Users.slug,

    components: {
      graphics: {
        Icon: '/components/admin/Branding#AdminIcon',
        Logo: '/components/admin/Branding#AdminLogo',
      },
    },

    meta: {
      description: 'لوحة إدارة موقع شركة يزيد عبد الرحمن الزهراني',
      icons: [{ rel: 'icon', url: '/images/logo.png' }],
      titleSuffix: ' | YAZ Law',
    },

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

  collections: [
    Users,
    Media,
    Documents,
    Services,
    Partners,
    AccreditationsTrust,
    Articles,
    ConsultationRequests,
  ],

  globals: [
    SiteSettings,
    Hero,
    Stats,
    AboutUs,
    HowWorking,
    WhyUs,
    Testimonials,
    AboutPage,
    FAQ,
    ArticlesPage,
    TeamPage,
  ],

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

  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),

      collections: {
        media: {
          prefix: 'media',
        },
        'consultation-requests': {
          prefix: 'consultation-attachments',
        },
      },

      token: process.env.BLOB_READ_WRITE_TOKEN,

      clientUploads: true,

      addRandomSuffix: true,
    }),
  ],
})
