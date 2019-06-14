import React from 'react';
import {Link} from 'react-router-dom'

const BoardListItem = (props) => {

    let {post} = props;
    let created = new Date(post.created);
    let link = `/board/view/${post.id}`;
    return (
        <tr>
            <th scope="row"><Link to={link}>{post.title}</Link></th>
            <td>{post.content}</td>
            <td><div>{created.getFullYear()}/
                {created.getMonth() + 1}/
                {created.getDate()} &nbsp;
                {created.getHours()}:
                {created.getMinutes()}:
                {created.getSeconds()}
            </div></td>
        </tr>
    );
};

export default BoardListItem;