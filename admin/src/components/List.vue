<template>
    <div class="list-container main">
        
        <div class="jumbotron">
                    <h1 class="display-3">Hello, Cloud Computing!</h1>
                    <p class="lead">
                        This is a simple website for login/signup
                    </p>
                    <hr class="my-4">
                    <p> Vuejs+nodejs(koa)+mySQL</p>
                    
        </div>
        <hr>
        
        <editor></editor>
        
    </div>
</template>

<script>
/**
 * @author {chen.zena@husky.neu.edu}
 *         {jia.xi@huaksy.neu.edu}
 *         {qiu.che@husky.neu.edu}
 * @file welcom page
 * */


export default {
    components: {
       
    },
    methods: {
        postArticle() {
            axios.post(
                '/api/v1/articles',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.ashenToken}`
                    }
                })
                .then(res => {
                    const updateId = res.data.insertId
                    this.$refs.articleList.updateList(updateId)
                })
                .catch(err => {
                    alert(err.message)
                })
        }
    },
    computed: {
        title() {
            return this.$store.state.title
        }
    }
}
</script>

<style lang="scss" scoped>
    .jumbotron{
        width:70%;
        margin:10em auto;
        background-color: rgba(255, 255, 255, 0.8)
    }

</style>
