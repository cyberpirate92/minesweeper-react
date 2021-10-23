import { Component } from 'react';
import './App.css';
import Board from './Board/Board';

class App extends Component {
    render = () => {
        return (
            <div class="App">
                <Board />
            </div>
        );
    }
}

export default App;
