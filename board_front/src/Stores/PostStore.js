import {action, observable} from "mobx";
import axios from 'axios';

import TimeStore from './TimeStore';

class PostStore {
    static __instance = null;
    static getInstance() {
        if(PostStore.__instance === null)
            PostStore.__instance = new PostStore();
        return PostStore.__instance;
    }

    constructor() {
        PostStore.__instance = this;

    }


    @observable post_time = null;
    @action getTime = async () => {
        this.post_time = await new Date().getTime();
    }
    getSomething = () => TimeStore.getTime();

    @observable items = null;
    @action fetchItems = async () => {
        try {
            let response = await axios({
                                           url: 'http://localhost:8080/api/post/posts',
                                           headers: {
                                               'Content-Type': 'application/json; charset=UTF-8'
                                           },
                                           method: 'get',
                                           timeout: 3000
                                       });
            console.log(response);
            if(response.status === 200) {
                this.items = response.data;
            }
        } catch (e) {
            alert(e.toString());
        }
    }

    @observable viewItem = null;
    @action fetchItem = async (id) => {
        try {
            this.viewItem = null;
            let response = await axios({
              url: `http://localhost:8080/api/post/search/${id}`,
              headers: {
                  'Content-Type': 'application/json; charset=UTF-8'
              },
              method: 'get',
              timeout: 3000
          });

            console.log("fetchItem : " + response.data.author);
            if(response.status === 200) {
                setTimeout(
                () => this.viewItem = response.data,
                100
            );
            }
        } catch (e) {
            alert(e.toString());
        }
    }

    @action addNewPost = async (newPost) => {
        try {
            let response = await axios({
               url: 'http://localhost:8080/api/post/add',
               headers: {
                   'Content-Type': 'application/json; charset=UTF-8'
               },
               method: 'post',
               timeout: 3000,
               data: JSON.stringify(newPost)
           });
            console.log(response);
            return (response.status === 200);
        } catch (e) {
            return false;
        }
    }

    @action editPost = async (post, userid) => {
        try {
            if(post.author !== userid){
                alert("작성자만 글을 수정할 수 있습니다.");
                return;
            }
            let response = await axios({
                url: 'http://localhost:8080/api/post/modify',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'put',
                timeout: 3000,
                data: JSON.stringify(post)
            });
            console.log(response);
            return (response.status === 200);
        } catch (e) {
            return false;
        }
    }

    @action deleteItem = async (userid) => {
        try {
            if(this.viewItem.author !== userid){
                alert("작성자만 글을 수정할 수 있습니다.");
                return;
            }
            let response = await axios({
                url: `http://localhost:8080/api/post/delete/${this.viewItem.id}`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'delete',
                timeout: 3000
            });
            console.log(response);
            return (response.status === 200);
        } catch (e) {
            alert(e.toString());
            return false;
        }
    }
}

export default PostStore.getInstance();