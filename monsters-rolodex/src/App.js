
import { Component } from 'react';
import logo from './logo.svg';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
constructor() {
  super();
  this.state = {
    monsters: [],
    searchField: ''
  };
}

 componentDidMount() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then(users => 
      this.setState(() => {
        return { 
                monsters: users,
            };
          },
          () => {
            console.log(this.state)
          }
        )
      );
 }

 onSearchChange = (event) => {
  console.log(event.target.value)
  const searchField = event.target.value.toLocaleLowerCase();
  
  this.setState(() => {
      return {
      searchField
      };
  })
}

render(){
  const items = this.state.monsters.filter((monster) => { 
    return monster.name.toLocaleLowerCase().includes(this.state.searchField);
   });

  const { onSearchChange } = this;

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
      onChangeHandler={ onSearchChange }
      placeholder="Search Monsters"
      className='monster-search-box' 
      />
      <CardList monsters={ items }/>
      
    </div>
  );
}

}

export default App;
