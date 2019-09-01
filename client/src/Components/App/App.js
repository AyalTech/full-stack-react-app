import React, { Component } from 'react';

import {
  Container,
  Button,
  FormGroup,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Input,
  Jumbotron,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

import Weather from '../Weather/weather'

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      weather: null,
      cityList: [],
      newCityName: '',
    }
  }

  componentDidMount() {
    this.getCityList();
  }

  getCityList = () => {
    fetch('/api/cities')
      .then(res => res.json())
      .then(res => {
        const cityList = res.map(r => r.city_name); // récuperer que la colonne city_name
        this.setState({cityList})
      })
  };

  handleInputChange = (event) => {
    this.setState({ newCityName: event.target.value });
  };

  handleAddCity = () => {
    fetch('/api/cities', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ city: this.state.newCityName })
    })
      .then(res => res.json())
      .then(res => {
        this.getCityList();
        this.setState({ newCityName: '' });
      })
  };

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        console.log(weather);
        this.setState({ weather });
      });
  };

  handleChangeCity = (event) => {
    this.getWeather(event.target.value);
  }

  render(){
    return (
      <div>
        <Container fluid className="centered">
          <Navbar dark color="dark">
            <NavbarBrand href="/">MyWeather</NavbarBrand>
          </Navbar>
          <Row>
            <Col>
              <Jumbotron>
                <h1 className="display-3">MyWeather</h1>
                <p className="lead">The current weather for your favourite cities !</p>

                <InputGroup>
                  <Input
                    placeholder="New city name..."
                    value={this.state.newCityName}
                    onChange={this.handleInputChange}
                  />
                  <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={this.handleAddCity}>Add city</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="display-5">Current Weather</h1>
              <FormGroup>
                <Input type="select" onChange={this.handleChangeCity}>
                  { this.state.cityList.length === 0 && <option disabled>No cities added yet.</option> }
                  { this.state.cityList.length > 0 && <option disabled>Select a city.</option> }
                  { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Weather data={this.state.weather}/>
        </Container>
      </div>
    )
  }
}

export default App;
