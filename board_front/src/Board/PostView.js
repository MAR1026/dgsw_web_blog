import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {inject, observer} from "mobx-react";
import './post.scss';

@inject('stores')
@observer
class PostView extends Component {

    state = {
        goToList: false
    };

    componentDidMount() {
        this.props.stores.postStore.fetchItem(this.props.postid);
    }

    render() {
        if(this.state.goToList === true)
            return <Redirect to='/'/>

        let p = this.props.stores;
        if(p.postStore.viewItem === null)
            return <div/>;

        let link = "/board/edit/" + this.props.postid;

        if(p.userStore.user && (p.userStore.user.id === p.postStore.viewItem.author)) {
            return (
                <div className='post'>
                    <div>
                        제목 : {p.postStore.viewItem.title}
                    </div>
                    <div className='content'>
                        내용 : {p.postStore.viewItem.content}
                    </div>
                    <div>
                        작성시간 : {new Date(p.postStore.viewItem.created).toLocaleDateString()}
                    </div>
                    <div>
                        <Link to="/"><button>목록</button></Link>
                        <Link to={link}><button onClick={this.editPost}>수정</button></Link>
                        <button onClick={this.deletePost}>삭제</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='post'>
                    <div>
                        제목 : {p.postStore.viewItem.title}
                    </div>
                    <div className='content'>
                        내용 : {p.postStore.viewItem.content}
                    </div>
                    <div>
                        작성시간 : {new Date(p.postStore.viewItem.created).toLocaleDateString()}
                    </div>
                    <div>
                        <Link to="/"><button>목록</button></Link>
                    </div>
                </div>
            )
        }

    }

    deletePost = async () => {
        if(window.confirm('삭제하시겠습니까?') === false)
            return;


        if(await this.props.stores.postStore.deleteItem(this.props.stores.userStore.user.id)) {
            await this.props.stores.postStore.fetchItems();
            this.setState({
                goToList: true
            });
        }

    }
}

export default PostView;