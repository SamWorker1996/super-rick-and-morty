/**
 * General Structure of API Responses
 */
export interface APIResponse<T> {
    info: PageInfo
    results: T[]
}

/**
 * Page Info
 */
export interface PageInfo {
    count: number
    pages: number
    next: string | null
    prev: string | null
}