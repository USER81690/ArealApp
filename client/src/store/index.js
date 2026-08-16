import { createStore } from "vuex"
import axios from "axios"


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


    actions: {
        async fetchArticles({ commit }) {
            const res = await axios.get("/articles/")
            commit("SET_ARTICLES", res.data)
        },
        async createArticle({ commit }, data) {
            const res = await axios.post("/article/", data)
            commit("ADD_ARTICLE", res.data)
            return res.data
        },
        async updateArticle({ commit }, data) {
            const res = await axios.patch(`/article/${data.id}/`, data)
            commit("UPDATE_ARTICLE", res.data)
            return res.data
        },
        async deleteArticle({ commit }, id) {
            await axios.delete(`/article/${id}/`)
            commit("DELETE_ARTICLE", id)
        },
        async fetchComments({ commit }, articleId) {
            const res = await axios.get(`/article/${articleId}/comments/`)
            commit("SET_COMMENTS_FOR_ARTICLE", {
                articleId,
                comments: res.data,
            })
            return res.data
        },
        async createComment({ commit }, { articleId, text }) {
            const res = await axios.post(`/article/${articleId}/comment/`, {
                text,
            })
            commit("ADD_COMMENT", { articleId, comment: res.data })
            return res.data
        },
        async updateComment({ commit }, { articleId, id, text }) {
            const res = await axios.patch(
                `/article/${articleId}/comment/${id}/`,
                { text },
            )
            commit("UPDATE_COMMENT", { articleId, comment: res.data })
            return res.data
        },
        async deleteComment({ commit }, { articleId, commentId }) {
            await axios.delete(`/article/${articleId}/comment/${commentId}/`)
            commit("DELETE_COMMENT", { articleId, commentId })
        },
    },
})