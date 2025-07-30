import type { MetaType } from '@/types/route-types/MetaType'
import { useHead } from '@unhead/vue'

export const useMeta = (root: string) => ({
  setMeta: (meta: MetaType, path: string) => {
    useHead({
      title: `${meta.title}`,
      meta: [
        {
          name: 'description',
          content: `${meta.description}`,
        },
        {
          name: 'og:title',
          content: `${meta.title}`,
        },
        {
          name: 'og:description',
          content: `${meta.description}}`,
        },
        {
          name: 'og:image',
          content: `${root}/img/ogp.png`,
        },
        {
          name: 'og:url',
          content: `${root}${path}`,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: `${meta.title}`,
        },
        {
          name: 'twitter:description',
          content: `${meta.description}`,
        },
        {
          name: 'twitter:image',
          content: `${root}/img/ogp.png`,
        },
      ],
    })
  },
})
