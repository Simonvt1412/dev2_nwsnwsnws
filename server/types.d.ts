// Type-definitie voor postgres-js
declare module 'postgres' {
    interface PostgresClient {
        <T = any>(strings: TemplateStringsArray, ...params: any[]): Promise<T[]>;
        query: (sql: string, params?: any[]) => Promise<any>;
        begin: (callback: (transaction: PostgresClient) => Promise<void>) => Promise<void>;
        end: () => Promise<void>;
        unsafe: <T = any>(sql: string, params?: any[]) => Promise<T[]>;
    }

    export default function postgres(options: string | { [key: string]: any }): PostgresClient;
}

// Types voor onze data
export interface News {
    id: number;
    created_at: Date;
    title: string;
    slug: string | null;
    content: string | null;
    image: string | null;
}

export interface Comment {
    id: number;
    news_id: number;
    author: string;
    comment: string;
    created_at: Date;
    news_title?: string;
}