<template>
    <div class="reading-list-container main">
        <div >
        <h1>Select an image</h1>
        <input type="file" @change="onFileChange">
        </div>
        <div v-if="!image">
        <img src=http://via.placeholder.com/350x250 />
        </div>
        <div v-else>

            <img id="avartar" :src="image" />
         </div>   
            <button @click="removeImage">Remove image</button>
        
    </div>
</template>

<script>
/**
 * @author {chen.zena@husky.neu.edu}
 * @file 阅读列表的后台管理组件
 * */
import Star from '@/components/common/Star'

export default {

    data() {
        return {
            user: '',
            image: '',
            message: '',

            books: [],
            isDiaShow: false,
            isEditing: false,
            editingId: '',
            editingIndex: '',
            score: 0
        }
    },
    components: {
        Star
    },
    created() {
        axios.get('/api/v1/books')
            .then(res => {
                this.books = res.data
            })
            .catch(err => alert(err))

        axios.get('/api/v1/profile',)
            .then(res => {
            this.user = res.data[0].user
            console.log(this.user)
            
            axios.post('/api/v1/image',
            {
                user: this.user
            })
            .then(res => {
                if(res.data=="you dont have picture yet"){
                    alert("you dont have picture yet");
                }else{
                    this.image = res.data
                }
            })
                        
        })              
            
    },
    methods: {

        onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImage(files[0]);
        },
        createImage(file) {
          var image = new Image();
          var reader = new FileReader();
          var vm = this;

          reader.onload = (e) => {            
            vm.image = e.target.result;

            axios.get('/api/v1/profile',)
            .then(res => {
                this.user = res.data[0].user
                console.log(this.user)
                axios.put('/api/v1/image', 
                    {
                        image: vm.image,
                        user: this.user
                    })
                .then(res => {
                    this.message = res.data
                    if(this.message=="This username already exists!"){
                        alert('This username already exists!')
                    }else if(this.message=="Sign up successfull!"){
                        alert('Sign up successfull!')
                    }
                })
                .catch(err => alert(err));
                
            })            

          };
          reader.readAsDataURL(file);
        },
        removeImage: function (e) {
          this.image = '';
          axios.post(`/api/v1/image/${this.user}`)
            .then(res => {
                this.message = res.data
                if(this.message=="delete successfully!"){
                    alert('delete successfully!')
                }
                if(this.message=="you dont have picture yet!"){
                    alert('you dont have picture yet!')
                }

            })
            .catch(err => alert(err));
        },

        addBook() {
            this.isDiaShow = true
            this.isEditing = false
            this.score = 0
            document.getElementById('name').value = ''
            document.getElementById('author').value = ''
        },
        editBook(index) {
            this.isDiaShow = true
            this.isEditing = true
            this.score = this.books[index].score
            document.getElementById('name').value = this.books[index].name
            document.getElementById('author').value = this.books[index].author
            this.editingId = this.books[index].id
            this.editingIndex = index
        },
        deleteBook(index) {
            axios.delete(
                `/api/v1/books/${this.books[index].id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.ashenToken}`
                    }
                })
                .then(res => {
                    this.books.splice(index, 1)
                })
                .catch(err => alert(err))
        },
        hideDialog(evt) {
            if (evt.target.className === 'dialog-container' || evt.target.id === 'cancel') {
                this.isDiaShow = false
            }
        },
        chooseScore({evt, width}) {
            const offsetX = evt.offsetX
            // toFixed返回的是字符串...
            let score = (parseInt(evt.target.dataset.index, 10) + parseFloat(offsetX / width)).toFixed(2)
            if (score > 4.9) {
                score = 5
            }
            this.score = score
        },
        confirmChange() {
            if (!this.isEditing) {
                // 添加书籍的逻辑
                const name = document.getElementById('name').value
                const author = document.getElementById('author').value
                const score = this.score
                if (name && author) {
                    axios.post(
                        '/api/v1/books',
                        {
                            name,
                            author,
                            score
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.ashenToken}`
                            }
                        })
                        .then(res => {
                            const id = res.data.insertId
                            const book = {
                                id,
                                name,
                                author,
                                score
                            }
                            this.books.push(book)
                            this.isDiaShow = false
                        })
                        .catch(err => alert(err))
                }
                else {
                    alert('输入信息不完整！')
                }
            }
            else {
                // 编辑书籍的逻辑
                const name = document.getElementById('name').value
                const author = document.getElementById('author').value
                const score = this.score
                const id = this.editingId
                if (name && author) {
                    axios.put(
                        `/api/v1/books/${id}`,
                        {
                            name,
                            author,
                            score
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.ashenToken}`
                            }
                        })
                        .then(res => {
                            this.books.splice(this.editingIndex, 1, {id, name, author, score})
                            this.isDiaShow = false
                        })
                        .catch(err => alert(err))
                }
                else {
                    alert('输入信息不完整！')
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
main {
    height: calc(100% - 48px);
    padding: 0.5em 0;
    overflow: auto;
}

.rd-list {
    width: 100%;
    border-collapse: collapse;
    th {
        height: 3em;
        font-size: 1.6rem;
        border-bottom: 1px solid $word;
    }
    td {
        text-align: center;
        height: 4em;
        border-bottom: 1px dotted $word;
    }
    .col-1,
    .col-2,
    .col-4 {
        width: 20%;
    }

    .col-2,
    .col-3 {
        border-left: 1px dotted $word;
        border-right: 1px dotted $word;
    }
}

.dialog-container {
    @include flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    min-width: 1024px;
    min-height: 900px;
    overflow: auto;
    background: rgba(0, 0, 0, 0.3);
    .dialog {
        @include flex($flow: column wrap, $justify: flex-start);
        width: 400px;
        height: 300px;
        background: $white;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
        border-top: 20px solid $base;
        border-radius: 5px;
        h5 {
            margin: 20px;
        }
        .star {
            margin-top: 0;
            /deep/ .star-item {
                width: 1.5em;
                height: 1.5em;
            }
        }
        input {
            margin-bottom: 15px;
            width: 200px;
            height: 2.5em;
            border-radius: 2px;
            border: 1px solid $special;
            outline-color: $base;
        }
        .btn-container {
            width: 200px;
            @include flex($justify: space-between);
        }
    }
}

.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(-900px);
    opacity: 0;
}

img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
button {
  
}
</style>
