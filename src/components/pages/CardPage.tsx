'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? "mb-4" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className={`grid ${embedded ? "gap-4" : "gap-6"}`}>
                {config.items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`bg-white dark:bg-neutral-900 ${embedded ? "p-4" : "p-6"} rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]`}
                    >
                        <div className="flex justify-between items-start gap-4 mb-2">
                            <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary`}>{item.title}</h3>
                            {item.date && (
                                <span className="shrink-0 text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                    {item.date}
                                </span>
                            )}
                        </div>
                        {item.subtitle && (
                            <p className={`${embedded ? "text-sm" : "text-base"} text-accent font-medium mb-3`}>{item.subtitle}</p>
                        )}
                        {item.images && item.images.length > 0 && (
                            <div className={`grid grid-cols-1 ${item.images.length > 1 ? 'sm:grid-cols-2' : ''} gap-4 my-5`}>
                                {item.images.map((figure) => (
                                    <figure key={figure.src} className={`min-w-0 ${figure.full_width && item.images!.length > 1 ? 'sm:col-span-2' : ''}`}>
                                        <a
                                            href={figure.src}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View full-size image: ${figure.alt}`}
                                            className="block rounded-lg border border-neutral-200 overflow-hidden bg-white focus-visible:outline-2 focus-visible:outline-accent"
                                        >
                                            <Image
                                                src={figure.src}
                                                alt={figure.alt}
                                                width={figure.width}
                                                height={figure.height}
                                                sizes={figure.full_width ? '(max-width: 895px) 100vw, 800px' : '(max-width: 639px) 100vw, 400px'}
                                                className={`w-full ${figure.full_width ? 'h-auto' : 'h-56'} object-contain p-3`}
                                            />
                                        </a>
                                        {figure.caption && (
                                            <figcaption className="mt-2 text-sm text-neutral-500 leading-relaxed">
                                                {figure.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                ))}
                            </div>
                        )}
                        {item.content && (
                            <div className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
                                <ReactMarkdown components={markdownComponents}>
                                    {item.content}
                                </ReactMarkdown>
                            </div>
                        )}
                        {item.videos && item.videos.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
                                {item.videos.map((video) => (
                                    <figure key={video.src} className="min-w-0">
                                        <video
                                            controls
                                            playsInline
                                            preload="none"
                                            poster={video.poster}
                                            aria-label={`${video.title}: ${item.title}`}
                                            className="w-full aspect-video rounded-lg bg-black object-contain"
                                        >
                                            <source src={video.src} type="video/mp4" />
                                            Your browser does not support embedded video.
                                            <a href={video.src}>Open {video.title}</a>
                                        </video>
                                        <figcaption className="mt-2 text-sm text-neutral-500 leading-relaxed">
                                            <a
                                                href={video.src}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-accent underline underline-offset-4"
                                            >
                                                {video.title}
                                            </a>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        )}
                        {item.tags && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        {item.links && item.links.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-5">
                                {item.links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${link.label}: ${item.title}`}
                                        className="inline-flex items-center rounded-lg border border-accent/40 px-4 py-2 text-sm font-medium text-primary hover:bg-accent/10 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
