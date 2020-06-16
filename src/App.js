import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import tachyons from 'tachyons';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register'





const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({
      user: {

        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined

      }
    })
  }

  // componentDidMount(){
  //   fetch("http://localhost:3001/")
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  displayFaceBox = (box) => {
    this.setState({ box: box });

  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value })

  }
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch('https://powerful-reef-77714.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())

      .then(response => {
        if (response) {
          fetch('https://powerful-reef-77714.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })

        } this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error))
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState)}

    // } else if (route === 'deleteAccount') {



    // } 
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }


  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange} />
        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl} />
          </div>
          : (
            this.state.route === 'signIn'
              ? <SignIn
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} />
              : <Register
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
