import {action, observable} from "mobx";
import axios from 'axios';

class UserStore {
    static __instance = null;

    static getInstance() {
        if (UserStore.__instance === null)
            UserStore.__instance = new UserStore();
        return UserStore.__instance;
    }

    constructor() {
        UserStore.__instance = this;
    }

    @observable user = null;
    @action login = async (userInfo) => {
        try {
            this.user = null;
            let response = await axios({
                url: 'http://localhost:8080/api/user/login',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'post',
                timeout: 3000,
                data: JSON.stringify(userInfo)
                });

            console.log(response);

            if(response.data === "") {
                alert("존재하지 않는 계정입니다.");
                return false;
            }
            if(response.status === 200) {
                this.user = response.data;
                return true;
            }

        } catch (e) {
            alert("로그인 실패 : " + e.toString());
            return false;
        }
    }

    @action logout = () => {
        try {
            this.user = null;
            if(this.user === null)
                return true;
            else
                return false;
        } catch (e) {
            return false;
        }
    }

    @action editUser = async (editInfo) => {
        try {
            this.user = null;
            let response = await axios({
                url: 'http://localhost:8080/api/user/modify',
                headers: {
                       'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'put',
                timeout: 3000,
                data: JSON.stringify(editInfo)
            });

            console.log(response);
            if(response.status === 200 && response.data !== '') {
                let findUser = await axios({
                   url: `http://localhost:8080/api/user/search/${editInfo.id}`,
                   headers: {
                       'Content-Type': 'application/json; charset=UTF-8'
                   },
                   method: 'get',
                   timeout: 3000,
                                           })
                if(findUser.status === 200) {
                    console.log(findUser.data);
                    this.user = findUser.data;
                    return true;
                } else
                    return false;
            }
            else
                return false;

        } catch (e) {
            alert("회원정보 수정 실패 : " + e.toString());
            return false;
        }
    }
}

export default UserStore.getInstance();