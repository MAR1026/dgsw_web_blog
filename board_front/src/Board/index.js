import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import BoardList from './BoardList';
import PostView from './PostView';
import PostNew from './PostNew';
import Login from './Login';
import {Link} from 'react-router-dom';

@inject('stores')
@observer
class Board extends Component {

    componentDidMount() {
        this.props.stores.postStore.fetchItems();
        console.log(this.props);
    }

    render () {
        if(this.props.match && this.props.match.params.postid && this.props.location && this.props.location.pathname === '/board/view/' + this.props.match.params.postid)
            return <PostView postid={this.props.match.params.postid}/>

        if(this.props.match && this.props.match.params.postid && this.props.location && this.props.location.pathname === '/board/edit/' + this.props.match.params.postid) {
            return <PostNew postid={this.props.match.params.postid}/>
        }

        if(this.props.location && this.props.location.pathname === '/board/new')
            return <PostNew />;

        if(this.props.location && this.props.location.pathname === '/board/login')
            return <Login />

        let p = this.props.stores;

        if(p.userStore.user === null) {
            return (
                <div className='home'>

                    <div><button onClick={p.postStore.fetchItems}>글 목록 불러오기</button></div>

                    <div className='board'>
                        <table >
                            <thead>
                            <tr>
                                <th scope="cols">제목</th>
                                <th scope="cols">내용</th>
                                <th scope="cols">작성일자</th>
                            </tr>
                            </thead>
                            <tbody>
                            {p.postStore.items && <BoardList items={p.postStore.items}/>}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='home'>

                    <div><button onClick={p.postStore.fetchItems}>글 목록 불러오기</button></div>

                    <div className='board'>
                        <table >
                            <thead>
                            <tr>
                                <th scope="cols">제목</th>
                                <th scope="cols">내용</th>
                                <th scope="cols">작성일자</th>
                            </tr>
                            </thead>
                            <tbody>
                            {p.postStore.items && <BoardList items={p.postStore.items}/>}
                            </tbody>
                        </table>
                        <div>
                            <Link to="/board/new"><button>새 글쓰기</button></Link>
                        </div>
                    </div>
                </div>
            );
        }

    };
}

export default Board;

/* <div>{t.current_time && t.current_time.toString()}</div>
      <div>{t.ms}</div>
<div><button onClick={t.getTime}>getTime from TimeStore</button></div>

                                                                  <div>{p.post_time && p.post_time.toString()}</div>
<div><button onClick={p.getTime}>getTime from PostStore</button></div>*/