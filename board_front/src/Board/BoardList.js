import React from 'react';
import BoardListItem from './BoardListItem';

const BoardList = (props) => {
    return (
            props.items.map(item => <BoardListItem key={item.id} post={item}/>)

    );
};

export default BoardList;