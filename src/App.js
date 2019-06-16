import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Link, Redirect, Prompt } from 'react-router-dom';
import './App.css'

const Home = () => <h1>Home</h1>

class Form extends React.Component {
  state = {dirty: false}

  handleDirty = () => this.setState({dirty: true})

  render () {
    return (
      <div>
        <h1>The Form</h1>
        <input type='text' onChange={this.handleDirty}/>
        <Prompt 
          when={this.state.dirty}
          message={'You would lose all the data on this form if you change the change the page'}
        />
      </div>
    )
  }
}

const isActiveFunc = (match, location) => {
  console.log(match, location);
  return false;
}



const Menu = () => (
  <div>
    <h1>Welcome to Menu, Please find your choice</h1>
    <div className='submenu'>
      <Link to='/menu/foods'>Foods</Link>
      <Link to='/menu/drinks'>Drinks</Link>
      <Link to='/menu/sides'>Sides</Link>
    </div>
    <Route path='/menu/:section' render={({match}) => <h1>{match.params.section}</h1>}/>
  </div>
)



const Links = () => (
  <nav>
    <NavLink isActive={isActiveFunc} exact to='/'>Home</NavLink>
    <NavLink to={{pathname: '/about'}}>About</NavLink>
    <NavLink to='/form'>Form</NavLink>
    <NavLink replace to='/contact'>Contact</NavLink>
    <NavLink to='/page/112'>Page</NavLink>
    <NavLink to='/12-12-2013.rr'>RegularExpressions</NavLink>
    <NavLink to='/bantu/?id=123'>Bantu</NavLink>
    <NavLink to={{pathname: '/bantu', search: 'id=456'}}>BBantu</NavLink>
    <NavLink to='/aPageThatDoesNotExist'>Exist?</NavLink>
    <NavLink to='/menu'>Menu</NavLink>
    <NavLink to='/new/456'>NEW</NavLink>
    <NavLink to='/old/123'>OLD</NavLink>
  </nav>
)




const App = () => (
  <Router>
    <div>
      <Links />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/form'component={Form} /> 
        <Route path='/about' render={() => <h1>About Page</h1>} />
        <Route path='/contact' render={() => <h1>Contact Page</h1>} />
        <Route path='/page/:number?' render={({match}) => (<h2>Display Number: {match.params.number}</h2>)} />
        {/* Using regular expressions to validate url matches */}
        <Route path='/:a(\d{2}-\d{2}-\d{4}):b(\.[a-z]+)' render={({match}) => (
          <h2>Date: {match.params.a}<br />form: {match.params.b || 'bolanle'}</h2>)} 
        />
        <Route path='/new/:id' render={({match}) => <h1>New Guy: {match.params.id}</h1>}/>
        <Route path='/old/:id' render={({match}) => (<Redirect to={`/new/${match.params.id}`}/>)} />
        <Route path='/bantu' render={({match, location}) => (
          <div>
            <h1>{JSON.stringify(match)}</h1> 
            <h1>{JSON.stringify(location)}</h1>
            <h1>{new URLSearchParams(location.search).get('id')}</h1>
        </div>
        )} />
        <Route path='/menu' component={Menu} />
        <Route render={() => <h1>Page Not Found</h1>}/>
      </Switch>
    </div>
  </Router>
)

export default App
