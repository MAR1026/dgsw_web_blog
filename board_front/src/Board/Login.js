import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Login extends Component {

    state = {
        account: '',
        password: '',
        email: '',
        username: '',
        id: '',

        goToMain: false
    };

    render () {
        if(this.state.goToMain)
            return <Redirect to='/'/>

        let p = this.props.stores.userStore;
        if(p.user === null) {
            return (
                <div>
                    <div>로그인</div>
                    <div>
                        <input placeholder='아이디' value={this.state.account} onChange={this.updateAccount}/>
                    </div>
                    <div>
                        <input placeholder='비밀번호' value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                    <div>
                        <button onClick={this.login}>로그인</button>
                    </div>
                </div>
            )
        } else {

            return (
                <div>
                    <div>회원 정보 수정</div>
                    <div>
                        <input placeholder={p.user.account} value={this.state.account} onChange={this.updateAccount}/>
                    </div>
                    <div>
                        <input placeholder={p.user.username} value={this.state.username} onChange={this.updateUsername}/>
                    </div>
                    <div>
                        <input placeholder={p.user.email} value={this.state.email} onChange={this.updateEmail}/>
                    </div>
                    <div>
                        <button onClick={this.editProfile}>수정하기</button>
                    </div>
                    <div>
                        <button onClick={this.logout}>로그아웃</button>
                    </div>
                </div>
            );
        }
    }

    updateAccount = event => {
        this.setState({
            ...this.state,
            account: event.target.value,
        });
    }

    updateUsername = event => {
        this.setState({
                          ...this.state,
                          username: event.target.value,
                          id: this.props.stores.userStore.user.id
                      });
    }
    updateEmail = event => {
        this.setState({
                          ...this.state,
                          email: event.target.value,
                          id: this.props.stores.userStore.user.id
                      });
    }

    updatePassword = event => {
        this.setState({
            ...this.state,
            password: event.target.value
        });
    }

    login = async () => {
        if (this.state.account && this.state.password && await this.props.stores.userStore.login(this.state)) {
            await this.props.stores.postStore.fetchItems();
            this.setState({
                              ...this.state,
                              goToMain: true
                          });
        }
    }

    logout = async () => {
        if(this.props.stores.userStore.logout()) {
            await this.props.stores.postStore.fetchItems();
            this.setState({
                              ...this.state,
                  goToMain: true
            });
        }
    }

    editProfile = async () => {

        alert(this.state.id);
        if((this.state.account || this.state.email || this.state.username) && this.props.stores.userStore.editUser(this.state)) {
            await this.props.stores.postStore.fetchItems();
            this.setState({
                              ...this.state,
                              goToMain: true
            });
        }
    }

}


export default Login;