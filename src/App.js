import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css'

const Home = () => <h1>Home</h1>

const isActiveFunc = (match, location) => {
  console.log(match, location);
  return false;
}

const Links = () => (
  <nav>
    <NavLink isActive={isActiveFunc} exact to='/'>Home</NavLink>
    <NavLink to={{pathname: '/about'}}>About</NavLink>
    <NavLink replace to='/contact'>Contact</NavLink>
    <NavLink to='/page/112'>Page</NavLink>
    <NavLink to='/12-12-2013.rr'>RegularExpressions</NavLink>
    <NavLink to='/bantu/?id=123'>Bantu</NavLink>
    <NavLink to={{pathname: '/bantu', search: 'id=456'}}>BBantu</NavLink>
  </nav>
)

const App = () => (
  <Router>
    <div>
      <Links />
      <Route exact path='/' component={Home} />
      <Route path='/about' render={() => <h1>About Page</h1>} />
      <Route path='/contact' render={() => <h1>Contact Page</h1>} />
      {/* Adding the question mark to the end of the parameter on the route path makes it optional for the user */}
      <Route path='/page/:number?' render={({match}) => (<h2>Display Number: {match.params.number}</h2>)} />
      {/* Using regular expressions to validate url matches */}
      <Route path='/:a(\d{2}-\d{2}-\d{4}):b(\.[a-z]+)' render={({match}) => (
        <h2>Date: {match.params.a}<br />form: {match.params.b || 'bolanle'}</h2>)} 
      />
      <Route path='/bantu' render={({match, location}) => (
        <div>
          <h1>{JSON.stringify(match)}</h1> 
          <h1>{JSON.stringify(location)}</h1>
          <h1>{new URLSearchParams(location.search).get('id')}</h1>
      </div>
      )} />
    </div>
  </Router>
)

export default App
