export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
    videos?: Array<{
        src: string;
        poster?: string;
        title: string;
    }>;
    images?: Array<{
        src: string;
        alt: string;
        caption?: string;
        full_width?: boolean;
        width: number;
        height: number;
    }>;
    links?: Array<{
        label: string;
        href: string;
    }>;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}
