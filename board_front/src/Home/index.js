import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import './board.scss';
import Board from "../Board";


@inject('stores')
@observer
class Home extends Component {


    render() {

        return (
            <div>
                <Board/>
            </div>
        )
    }
}

export default Home;