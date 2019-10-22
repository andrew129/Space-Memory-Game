import React, { Component } from "react";
import './App.css';
import Header from './components/header/header'
import ImgContainer from './components/pictures/pictures'
import space from './space.json'
import Wrapper from './components/wrapper/wrapper'
import { relative } from "path";

class App extends Component {
  state = {
    space,
    score: 0,
    clicked: [],
    highScore: 0,
    seconds: 5,
    directions: "It's a memory test, click on each picture once to win. You lose by clicking on the same picture twice.",
    message: 'Click on Any Galaxy to Begin'
  }
  //method for handling the picture clicks
  handleClickedImage = id => {
    this.setState({ directions: "" })
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
      this.setState({ message: 'You Lost, Try Again' })
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
      this.setState({ directions: "It's a memory test, click on each picture once to win. You lose by clicking on the same picture twice." })
      this.setState({ message: 'Click on Any Galaxy to Begin' })
    }, 2000)
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
        <h4>{this.state.directions}</h4>
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
        <footer className="footer">
          <div className="container">
            <span id='copyright' className="text-white">Copyright © 2019 Andrew Stiles
              {/* <ul className='icons'>
                <li><a className='btn' target='blank' href="https://github.com/andrew129"><i className="fa fa-2x fa-github" aria-hidden="true"></i></a></li>
                <li><a className='btn' target='blank' href="https://www.linkedin.com/in/andrew-stiles-12b41167"><i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i></a></li>
                <li><a className='btn' target='blank' href='https://soundcloud.com/en1gmamusic/tracks'><i className="fa fa-2x fa-soundcloud" aria-hidden="true"></i></a></li>
              </ul> */}
            </span>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}

export default App;
