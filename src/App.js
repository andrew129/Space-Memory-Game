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
    clicked: [],
    highScore: 0,
    message: 'Click on Any Galaxy to Begin'
  }

  handleClickedImage = id => {
    const filteredSpace = this.state.space.filter(space => space.id === id)
    if (this.state.score < 15) {
      this.setState({ clicked: this.state.clicked.concat(filteredSpace[0].id) })
      console.log(this.state.clicked)
      this.randomize()
      this.setState({ score: this.state.score + 1})
    }

    if (this.state.score > this.state.highScore) {
      this.setState({ highScore: this.state.score })
    }

    if (this.state.clicked.includes(id)) {
      this.setState({ score: 0 })
      this.setState({ message: 'Your Memory Sucks' })
      this.setState({ highScore: this.state.score })
      this.setState({ clicked: [] })
      setTimeout(() => {
        this.setState({ message: 'Click on Any Galaxy to Begin' })
      }, 3000)
    }

    if (this.state.score === 15) {
      this.setState({ clicked: [] })
      this.setState({ highScore: this.state.score })
      this.setState({ score: 0 })
      this.randomize()
      this.setState({ message: "Congratulations You don't Suck" })
      setTimeout(() => {
        this.setState({ message: 'Click on Any Galaxy to Begin' })
      }, 3000)
    }
  }

  randomize = () => {
    let newArray = space;
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray
  }


  //**if this.state.message === 'your memory sucks' {this.setState({ highScore: this.state.score })} */

  render() {
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
        <footer className="footer-container">
          <p className="footer-content">
              Copyright © 2019 <a className="github-link" href='https://github.com/andrew129'>Andrew Stiles</a>
          </p>
        </footer>
      </React.Fragment>
    )
  }
}

export default App;
