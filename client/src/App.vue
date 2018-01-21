<template>
    <div id="app">
        <header-nav></header-nav>
        <div id="main" @click="sweepMask">
            <router-view/>
        </div>
        <footer>Powered by<a class="github" href="https://github.com/lukchen/csye6225-spring2018" target="_blank">  Eli blog system</a></footer>
    </div>
</template>

<script>
    /**
     * @author {chen.zena@husky.neu.edu}
     * @file client根组件
     */

    import HeaderNav from '@/components/common/HeaderNav'

    export default {
        name: 'App',
        components: {
            HeaderNav
        },
        data() {
            return {
                maskFlag: false,
                
            }
        },
        methods: {
            sweepMask() {
                this.maskFlag = !this.maskFlag
            },
        }
    }
</script>

<style lang="scss" scoped>
    footer {
        font-weight: 200;
        width: 95%;
        max-width: 850px;
        text-align: center;
        font-size: 2.4rem;
        margin: 0 auto;
        padding: 2em 0;
        color: $special;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, .25);
        .github {
            color: $base;
        }
    }
</style>
