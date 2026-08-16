<template>
    <v-container style="max-width: 600px;">


        <!-- Форма -->
        <v-card class="mb-4" elevation="2" rounded="lg">
            <v-card-title class="text-h6 font-weight-regular border-bottom pt-8 pb-8">{{ editForm.id ? "Edit article" : "Create article" }}</v-card-title>
            <v-card-text>
                <v-text-field v-model="editForm.title" label="Title" variant="outlined" density="compact" hide-details class="mb-4"/>
                <v-textarea v-model="editForm.content" label="Content" variant="outlined" density="compact" hide-details rows="4" class="mb-4"/>
                <v-btn color="grey-darken-4" height="40" block rounded="lg" @click="saveArticle">{{ editForm.id ? "Save edit" : "Post" }}</v-btn>
                <v-btn v-if="editForm.id" color="red" variant="text" height="40" block class="mt-2" @click="editForm = { id: null, title: '', content: '' }">Cancel</v-btn>
            </v-card-text>
        </v-card>


        <!-- Список -->
        <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-h6 font-weight-regular">All articles</span>
            <v-chip size="small" color="red">{{ articles.length }}</v-chip>
        </div>


        <!-- Карточка -->
        <v-card v-for="article in articles" :key="article.id" class="mb-3" elevation="2" rounded="lg">
            <v-card-item>
                <div class="d-flex justify-space-between align-center">
                    <v-card-title class="text-body-1 font-weight-medium pt-4 pb-4">{{cut(article.title, 30)}}</v-card-title>
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" v-bind="props" size="x-small" variant="text" color="red"/>
                        </template>
                        <v-list density="compact" rounded="lg">
                            <v-list-item @click="viewArticle(article)">
                                <v-list-item-title>View</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="editArticle(article)">
                                <v-list-item-title>Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="removeArticle(article.id)">
                                <v-list-item-title class="text-error">Delete</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-card-item>
            <v-card-text class="text-body-2 text-grey-darken-1">{{cut(article.content, 120)}}</v-card-text>
            <v-divider class="mx-3"/>
            <v-card-text>
                <div class="d-flex justify-space-between align-center mb-2">
                    <span class="text-subtitle-2 font-weight-medium">Comments:</span>
                    <v-chip size="small" color="red">{{getComments(article.id)?.length || 0}}</v-chip>
                </div>
                <div v-if="getComments(article.id)?.length">
                    <div v-for="comment in getComments(article.id)" :key="comment.id" class="d-flex justify-space-between align-center py-1">
                        <span class="text-body-2 text-grey-darken-1">{{cut(comment.text, 20)}}</span>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn icon="mdi-dots-vertical" v-bind="props" size="x-small" variant="text" color="red"/>
                            </template>
                            <v-list density="compact" rounded="lg">
                                <v-list-item @click="viewComment(comment)">
                                    <v-list-item-title>View</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="editComment({comment, articleId: article.id})">
                                    <v-list-item-title>Edit</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="removeComment({articleId: article.id, commentId: comment.id})">
                                    <v-list-item-title class="text-error">Delete</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <div v-else class="text-caption text-grey">No comments</div>
                <div class="d-flex ga-2 mt-2">
                    <v-text-field v-model="commentTexts[article.id]" label="Write a comment..." variant="outlined" density="compact" hide-details class="flex-grow-1" @keyup.enter="addComment(article.id)"/>
                    <v-btn color="grey-darken-4" height="40" rounded="lg" @click="addComment(article.id)">
                        Send
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>


        <!-- Модалка -->
        <v-dialog v-model="dialog.visible" max-width="600px" transition="dialog-transition">
            <v-card rounded="lg" elevation="3">
                <v-card-title class="text-h6 font-weight-regular pt-4 pb-4">{{dialog.title}}</v-card-title>
                <v-card-text>
                    <template v-if="dialog.type === 'view-article'">
                        <h3 class="text-h6 font-weight-regular mb-3">{{ dialog.data?.title }}</h3>
                        <p class="text-body-1" style="white-space: pre-wrap">{{ dialog.data?.content }}</p>
                        <p class="text-caption text-grey">ID: {{ dialog.data?.id }}</p>
                    </template>
                    <template v-else-if="dialog.type === 'view-comment'">
                        <p class="text-body-1" style="white-space: pre-wrap">{{ dialog.data?.text }}</p>
                        <p class="text-caption text-grey">ID: {{ dialog.data?.id }}</p>
                    </template>
                    <template v-else-if="dialog.type === 'edit-comment'">
                        <v-text-field v-model="dialog.form.text" label="Comment text" variant="outlined" density="compact" hide-details/>
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-btn v-for="btn in dialog.actions" :key="btn.text" :color="btn.color || 'grey-darken-4'" variant="text" rounded="lg" @click="btn.handler">{{ btn.text }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>


<script>
import { mapState, mapActions } from "vuex"


export default {
    data() {
        return {
            editForm: { id: null, title: "", content: "" },
            commentTexts: {},
            dialog: {
                visible: false,
                type: null,
                title: "",
                data: null,
                form: null,
                actions: [],
            },
        }
    },
    computed: {
        ...mapState(["articles", "comments"]),
        getComments() {
            return (id) => this.comments[id] || []
        },
    },
    methods: {
        ...mapActions([
            "fetchArticles",
            "fetchComments",
            "createArticle",
            "updateArticle",
            "deleteArticle",
            "createComment",
            "updateComment",
            "deleteComment",
        ]),
        cut(text, len) {
            return text?.length > len ? text.slice(0, len) + "..." : text || ""
        },
        openDialog(config) {
            this.dialog = { visible: true, ...config }
        },
        closeDialog() {
            this.dialog.visible = false
        },
        async viewArticle(article) {
            await this.fetchComments(article.id)
            this.openDialog({
                type: "view-article",
                title: "View article",
                data: article,
                actions: [
                    {
                        text: "Close",
                        handler: this.closeDialog,
                        color: "grey-darken-4",
                    },
                ],
            })
        },
        editArticle(article) {
            this.editForm = { ...article }
            this.$nextTick(() =>
                document.querySelector(".v-card-title")?.scrollIntoView(),
            );
        },
        async saveArticle() {
            if (!this.editForm.title || !this.editForm.content) return
            if (this.editForm.id) {
                await this.updateArticle(this.editForm)
            } else {
                await this.createArticle(this.editForm)
            }
            await this.fetchArticles();
            this.editForm = { id: null, title: "", content: "" }
        },
        async removeArticle(id) {
            await this.deleteArticle(id)
            await this.fetchArticles()
        },
        async addComment(articleId) {
            const text = this.commentTexts[articleId] || ""
            if (!text.trim()) return;
            await this.createComment({ articleId, text })
            this.commentTexts[articleId] = ""
            await this.fetchComments(articleId)
        },
        viewComment(comment) {
            this.openDialog({
                type: "view-comment",
                title: "View comment",
                data: comment,
                actions: [{ text: "Close", handler: this.closeDialog }],
            })
        },
        editComment({ comment, articleId }) {
            this.openDialog({
                type: "edit-comment",
                title: "Edit comment",
                form: { ...comment },
                actions: [
                    {
                        text: "Cancel",
                        handler: this.closeDialog,
                        color: "grey",
                    },
                    {
                        text: "Save",
                        handler: async () => {
                            await this.updateComment({
                                articleId,
                                id: this.dialog.form.id,
                                text: this.dialog.form.text,
                            })
                            await this.fetchComments(articleId)
                            this.closeDialog();
                        },
                        color: "grey-darken-4",
                    },
                ],
            })
        },
        async removeComment({ articleId, commentId }) {
            await this.deleteComment({ articleId, commentId })
            await this.fetchComments(articleId)
        },
    },
    async mounted() {
        await this.fetchArticles()
        await Promise.all(this.articles.map((a) => this.fetchComments(a.id)))
    },
}
</script>


<style>
    .v-card {
        transition: all 0.25s ease;
    }
    .v-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08) !important;
    }
</style>
