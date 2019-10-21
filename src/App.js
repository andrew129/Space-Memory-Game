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
    seconds: 5,
    message: 'Click on Any Galaxy to Begin'
  }
  //method for handling the picture clicks
  handleClickedImage = id => {
    // this.timerRun()
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

    if (this.state.score === 5) {
      this.setState({ message: "You're Doing Good, Keep it Up"})
    }

    if (this.state.clicked.includes(id)) {
      this.setState({ message: 'Your Memory Sucks, Try Again' })
      this.reset()
      if (this.state.score > this.state.highScore) {
        this.setState({highScore: this.state.score})
      }
    }

    if (this.state.score === 15) {
      this.setState({ message: "Congratulations You don't Suck" })
      this.reset()
    }
  }

  //start the game over
  reset = () => {
    this.setState({ seconds: 5 })
    this.setState({ clicked: [] })
    this.setState({ score: 0 })
    this.randomize()
    setTimeout(() => {
      this.setState({ message: 'Click on Any Galaxy to Begin' })
    }, 3000)
  }

  // timerRun = () => {
  //   let intervalId;
  //   clearInterval(intervalId)
  //   this.setState({ seconds: 5 })
  //   intervalId = setInterval(() => {
  //     this.setState({ seconds: this.state.seconds - 1 })
  //   }, 1000)
  //   if (this.state.seconds === 0) {
  //     clearInterval(intervalId)
  //     this.randomize()
  //     this.setState({ score: this.state.score - 1})
  //     this.setState({ message: 'Come On, Be Faster'})
  //   }
  // }
  //best randomize algorithm out there
  randomize = () => {
    let newArray = space;
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray
  }
  //rendering the html on the page
  render() {
    return (
      <React.Fragment>
        <Header
          message={this.state.message}
          score={this.state.score}
          highScore={this.state.highScore}
        />
        <h4>It's a memory test, click on each picture once to win.  You lose by clicking on the same picture twice</h4>
        {/* <h4>Time Remaining: {this.state.seconds}</h4> */}
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
