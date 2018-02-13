<template>
         

    <div id="login">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <h1 class="navbar-brand">CSYE6225 Assignment2</h1>           
        </nav> 

        
        <form class="form jumbotron">
            <fieldset>

                <div class="form-title"><h3>Please Login</h3></div>
                

                <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input class="form-control" aria-describedby="emailHelp" placeholder="Enter email as Username" type="email"
                                id="user" v-model="username">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input class="form-control"  placeholder="Password" type="password"
                                id="password" v-model="password">
                </div>
                
                <div class="form-button">
                        <button type="button" class="btn btn-secondary" id="login" @click="login">Login</button>
                        <button type="button" class="btn btn-secondary" id="sign up" @click="signup">Sign up</button>
                </div>

            </fieldset>

        </form>

        
        <footer></footer>
    </div>
</template>

<script>
/**
 * @author {chen.zena@husky.neu.edu}
 *         {jia.xi@huaksy.neu.edu}
 *         {qiu.che@husky.neu.edu}
 * @file admin--login/sign up
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
                    this.$router.push('/welcome')
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
    .navbar-brand{
        font-size:2em;
    }
    .form{
        width:40%;
        margin: 10em auto;
        background-color: rgba(255, 255, 255,0.8);
    }
    .form legend{
        text-align: center;
    }
    .form-title{
        text-align: center;
        margin-bottom: 3em;
    }
    .form-button{
        text-align: center;
        margin-top: 4em;
    }
   

</style>

