<template>
    <div class="login-container">
        <header class="login-head">
        </header>
        <section class="form">
            <span class="slogan">Final Presentation!
                <span>/ Login</span>
            </span>
            <input type="text" id="user" placeholder="Username" v-model="username">
            <input type="password" id="password" placeholder="Password" v-model="password">
            <button id="login" @click="login">Login</button>
            <button id="sign up" @click="signup">Sign up</button>
        </section>
        <footer></footer>
    </div>
</template>

<script>
/**
 * @author {chen.zena@husky.neu.edu}
 * @file admin端登录页
 */

import md5 from 'md5'

export default {
    data() {
        return {
            username: '',
            password: '',
            message:'',
        }
    },
    methods: {
        login() {

             if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.username))
              {
                                
                axios.post(
                '/api/v1/tokens',
                {
                    username: this.username,
                    password: this.password
                })
                .then(res => {
                    const data = res.data
                    localStorage.setItem('ashenToken', data)
                    this.$router.push('/lists')
                })
                .catch(err => {
                    const errorMsg = err.response.data.error
                    alert(errorMsg)
                })
              }else{
                alert("You have entered an invalid email address!")
                return (false)
            }
        },

        signup() {

            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.username))
            {
                axios.post(
                '/api/v1/signup',
                {
                    username: this.username,
                    password: this.password,
                })
                .then(res => {
                    this.message = res.data
                    if(this.message=="This username already exists!"){
                        alert('This username already exists!')
                    }else if(this.message=="Sign up successfull!"){
                        alert('Sign up successfull!')
                    }
                })
                .catch(err => alert(err))

                
            }else{
                alert("You have entered an invalid email address!")
                return (false)
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-container {
    height: 100%;
    @include flex($flow: column wrap);
    font-family: "KaiShu", "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    .login-head {
        @include flex;
        width: 100%;
        height: 3em;
        font-size: 2rem;
    }

    .form {
        @include flex($flow: column wrap);
        width: 400px;
        height: 250px;
        border-top: 20px solid $base;
        border-radius: 5px;
        // box-shadow: 4px 4px 5px -3px rgba(0, 0, 0, .3);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
        .slogan {
            font-size: 1.6rem;
            margin-bottom: 1em;
            //color: $quote;
            span {
                color: $base;
            }
        }
        input {
            font: {
                size: 1rem;
                family: Dosis, Arial, sans-serif;
            }
            margin-bottom: 2em;
            width: 20em;
            height: 2.5em;
            outline-color: $base;
            border-radius: 3px;
            border: 1px solid #ccc;
        }
        button {
            color: $white;
            font: {
                size: 1.6rem;
                family: KaiShu, Arial, sans-serif;
            }
            width: 6em;
            height: 2em;
            border: none;
            background: $base;
            outline: none;
            cursor: pointer;
        }
    }

    footer {
        height: 4em;
        @include flex;
        justify-self: flex-end;
    }
}
</style>

