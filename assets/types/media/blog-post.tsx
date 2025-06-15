export type BlogPost = {
    id: string
    title: string
    content: string
    contentHtml: string
    thumbnail: string
    references?: string
    createdDate: string
    view: number
    like: number
    categories: BlogCategory[]
    moderator: {
        id: string
        fullName: string
        imageUrl: string
    },
    doctor: {
        id: string
        fullName: string
        imageUrl: string
    },
    wordCount: number
    isBookMarked: boolean
    isLiked: boolean
}

export type BlogCategory = {
    id: string
    name: string
    imageUrl: string
}