import React, { Component } from "react";
import './App.css';
import Header from './components/header/header'
import ImgContainer from './components/pictures/pictures'
import space from './space.json'
import Wrapper from './components/wrapper/wrapper'

class App extends Component {
  state = {
    space,
    score: 0,
    highScore: 0,
    message: 'Click on Any Galaxy to Begin'
  }

  handleClickedImage = id => {
    this.setState({ score: this.state.score + 1})
  }

  render() {
    console.log(space[0].image)
    return (
      <React.Fragment>
        <Header
          message={this.state.message}
          score={this.state.score}
          highScore={this.state.highScore}
        />
        <Wrapper>
          {this.state.space.map(space => (
            <ImgContainer
              id={space.id}
              key={space.id}
              name={space.name}
              image={space.image}
              onClick={this.handleClickedImage}
            />
          ))}
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default App;
