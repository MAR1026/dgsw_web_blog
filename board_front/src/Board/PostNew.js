import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@inject('stores')
@observer
class PostNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: this.props.stores.userStore.user.id,
            title: '',
            content: '',
            goToMain: false
        }

        if (this.props.postid && this.props.stores.postStore.viewItem !== null)
            this.state = {
                ...this.state,
                id: this.props.stores.postStore.viewItem.id,
                title: this.props.stores.postStore.viewItem.title,
                content: this.props.stores.postStore.viewItem.content,
            };
    }

    render() {
        if(this.state.goToMain)
            return <Redirect to='/' />;

        return (
            <div>
                <div>
                    제목: <input value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>
                    내용:
                    <div>

                        <CKEditor editor={ClassicEditor}
                            data={this.state.content}
                            onChange={this.updateContent}/>
                    </div>
                </div>
                <div>
                    <button onClick={this.addNewPost}>확인</button>
                </div>
            </div>
        );
    }

    addNewPost = async () => {

        if (this.props.postid) {
            if(!window.confirm("수정하시겠습니까?"))
            return;
            if(await this.props.stores.postStore.editPost(this.state, this.props.stores.userStore.user.id)) {
                await this.props.stores.postStore.fetchItems();
                this.setState({
                                  ...this.state,
                                  goToMain: true
                              });
            }
        }
        else {
            if(!window.confirm("작성하시겠습니까?"))
                return;
            if(await this.props.stores.postStore.addNewPost(this.state)) {
                await this.props.stores.postStore.fetchItems();
                this.setState({
                                  ...this.state,
                                  goToMain: true
                  });
            }
        }
    }

    updateTitle = event => {
        this.setState( {
            ...this.state,
            title: event.target.value
        });
    }

    updateContent = (event, editor) => {
        this.setState( {
                           ...this.state,
                           content: editor.getData()
                       });
    }



}

export default PostNew;

/*<textarea value={this.state.content} onChange={this.updateContent}/> */