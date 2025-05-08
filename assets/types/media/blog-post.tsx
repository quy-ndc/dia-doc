export type BlogPost = {
    id: string
    title: string
    content: string
    contentHtml: string
    imageUrl: string
    references?: string
    createdDate: string
    view: number
    category: {
        id: string
        name: string
        imageUrl: string
    }
    user: {
        id: string
        fullName: string
        imageUrl: string
    }
    isBookmarked: boolean
}