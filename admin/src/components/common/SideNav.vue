<template>
    <aside class="side-nav">
        <div class="list-group">

            <a href="#" class="list-group-item list-group-item-action">
                    <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-quanbu"></use>
                    </svg>
                    <p class="descript">Vuejs</p>
                </a>

                <a href="#" class="list-group-item list-group-item-action">
                    <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-huiyuanbiaoqian"></use>
                    </svg>
                    <p class="descript">Nodejs</p>
                </a>

                <a href="#" class="list-group-item list-group-item-action">
                    <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-zaixianzhidao"></use>
                    </svg>
                    <p class="descript">MySQL</p>
                </a>
                    
        </div>
        
    </aside>
</template>

<script>
/**
 * @author {chen.zena@husky.neu.edu}
 *         {jia.xi@huaksy.neu.edu}
 *         {qiu.che@husky.neu.edu}
 * @file side nav-bar
 * */
export default {}
</script>

<style lang="scss" scoped>
    .list-group{
        width:6%;
        position: fixed;
        top:7em;
    }

</style>
