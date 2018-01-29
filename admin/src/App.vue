<template>
    <div id="app">
        <template v-if="!isLogin">
            <header-nav></header-nav>
            <side-nav></side-nav>
        </template>
        <router-view></router-view>
    </div>
</template>

<script>
/**
 * @author {chen.zena@husky.neu.edu}
 *         {jia.xi@huaksy.neu.edu}
 *         {qiu.che@husky.neu.edu}
 * @file admin
 */

import HeaderNav from '@/components/common/HeaderNav'
import SideNav from '@/components/common/SideNav'

export default {
    name: 'app',
    data() {
        return {
            isLogin: true
        }
    },
    components: {
        HeaderNav,
        SideNav
    },
    watch: {
        $route(val) {
            this.isLogin = val.path === '/'
        }
    }
}
</script>

<style lang="scss" scoped>
  

</style>
