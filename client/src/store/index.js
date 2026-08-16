import { createStore } from "vuex"

export default createStore({
    state: {
        articles: [],
        comments: {},
    },


    mutations: {
        SET_ARTICLES(state, data) {
            state.articles = data
        },
        ADD_ARTICLE(state, data) {
            state.articles.unshift(data)
        },
        DELETE_ARTICLE(state, id) {
            state.articles = state.articles.filter((a) => a.id !== id)
        },
        UPDATE_ARTICLE(state, data) {
            const index = state.articles.findIndex((a) => a.id === data.id)
            if (index !== -1) {
                state.articles[index] = data
            }
        },
        SET_COMMENTS_FOR_ARTICLE(state, { articleId, comments }) {
            state.comments = { ...state.comments, [articleId]: comments }
        },
        ADD_COMMENT(state, { articleId, comment }) {
            if (!state.comments[articleId]) {
                state.comments[articleId] = []
            }
            state.comments[articleId].push(comment)
        },
        UPDATE_COMMENT(state, { articleId, comment }) {
            if (state.comments[articleId]) {
                const index = state.comments[articleId].findIndex(
                    (c) => c.id === comment.id,
                )
                if (index !== -1) {
                    state.comments[articleId][index] = comment
                }
            }
        },
        DELETE_COMMENT(state, { articleId, commentId }) {
            if (state.comments[articleId]) {
                state.comments[articleId] = state.comments[articleId].filter(
                    (c) => c.id !== commentId,
                )
            }
        },
    },

    
    actions: {}, 
})