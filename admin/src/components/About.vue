<template>
    <div class="about-container main">
        <h2> /
            <span>ABOUT ME</span>
        </h2>
        <hr>
        <main>
            <textarea></textarea>
            <section class="btn-container">
                <button class="not-del" @click="updateAbout">submit changes</button>
            </section>
        </main>
    </div>
</template>

<script>
/**
 * @author {chen.zena@husky.neu.edu}
 * @file 关于我的后台管理组件
 * */

import 'font-awesome/css/font-awesome.min.css'
import 'simplemde/dist/simplemde.min.css'
import SimpleMDE from 'simplemde'

export default {
    data() {
        return {
            user: '',
            simplemde: ''
        }
    },
    mounted() {
        this.simplemde = new SimpleMDE({
            autoDownloadFontAwesome: false,
            spellChecker: false
        })

        axios.get('/api/v1/profile',)
            .then(res => {
                this.user = res.data[0].user
                console.log(this.user)
                axios.post(
                '/api/v1/briefs',
                {
                    username: this.user
                })
                .then(res => {
                    this.simplemde.value(res.data[0].content)
                })
            })      
    },
    methods: {
        updateAbout() {
            axios.put(
                `/api/v1/briefs/${this.user}`,
                {
                    content: this.simplemde.value()
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.ashenToken}`
                    }
                })
                .catch(err => alert(err))
        }
    }
}
</script>

<style lang="scss" scoped>
main {
    height: calc(100% - 48px);
    padding: 0.5em 0;
    overflow: auto;
    font-size: 1.6rem;
}

.btn-container {
    @include flex($justify: flex-end);
}
</style>
