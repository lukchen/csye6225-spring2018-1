<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">

            <h1 class="navbar-brand">CSYE6225 Assignment2</h1> 

            <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav mr-auto">
                      
                      <li class="nav-item">
                            <section>
                                    <Clock :blink="true" />
                            </section>
                            <vue-clock></vue-clock>
                      </li>
                    </ul>
            </div>
                
                <a class="log-out" @click="logOut">
                        
                        <button class="btn btn-primary btn-lg">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-tuichu"></use>
                            </svg>
                            Log out
                        </button>
                </a>        
    </nav> 
    
</template>

<script>
/**
 * @author {chen.zena@husky.neu.edu}
 *         {jia.xi@huaksy.neu.edu}
 *         {qiu.che@husky.neu.edu}
 * @file header nav-bar
 * */
import Clock from 'vue-digital-clock'


export default {
    components: {
        Clock
    },
    methods: {
        logOut() {
            localStorage.removeItem('ashenToken')
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
    #navbarColor01{
        color:white;
    }
    .icon{
        color: white;
    }

</style>
