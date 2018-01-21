<template>

    <header class="nav-container">
        <div class="line"></div>
        <router-link :to="{path: '/articles', query: {page: 0}}" class="nav-title">
        </router-link>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1"><a name="articles" @click="jump($event)" :class="{'active': $route.path === '/articles'}">Articles</a></el-menu-item>
          <el-menu-item index="2"><a name="archives" @click="jump($event)" :class="{'active': $route.path === '/archives'}">Archive</a></el-menu-item>
          <el-menu-item index="3"><a name="tags" @click="jump($event)" :class="{'active': $route.path === '/tags'}">Tag</a></el-menu-item>
          <el-menu-item index="4"><a name="lists" @click="jump($event)" :class="{'active': $route.path === '/lists'}">Reading List</a></el-menu-item>          
          <el-menu-item index="5"><a name="about" @click="jump($event)" :class="{'active': $route.path === '/about'}">About</a></el-menu-item>
        </el-menu>

    </header>
</template>

<script>
/**
 * @author {chen.zena@husky.neu.edu}
 * @file 公用的header
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export default {
    props: ['maskFlag'],
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        }
    },
    methods: {
        jump(evt) {
            const path = evt.target.name
            switch (path) {
                case 'articles':
                    this.$router.push({path: `/${path}`, query: {page: 0}})
                    break
                case 'archives':
                    this.$router.push('/archives')
                    break
                case 'tags':
                    this.$router.push('/tags')
                    break
                case 'lists':
                    this.$router.push('/lists')
                    break
                case 'about':
                    this.$router.push('/about')
                    break
                default:
                    break
            }
        }
    },
    watch: {
        
    }
}
</script>

<style lang="scss" scoped>

</style>
