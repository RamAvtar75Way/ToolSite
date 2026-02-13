import { MetadataRoute } from 'next'
import { tools, categories } from '@/data/tools'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tool4you.com' // Replace with actual domain when deployed

    // Static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
        '/categories',
        '/sitemap-page', // The HTML sitemap page
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Category routes
    const categoryRoutes = categories.map((category) => ({
        url: `${baseUrl}/categories/${category.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Tool routes
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...routes, ...categoryRoutes, ...toolRoutes]
}
