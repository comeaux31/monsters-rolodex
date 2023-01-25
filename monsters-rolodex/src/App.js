
import { useEffect, useState } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [items, setItems] = useState(monsters)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, [])

  useEffect(() => {
      const values = monsters.filter((monster) => { 
            return monster.name.toLocaleLowerCase().includes(searchField);
           });
      setItems(values)
  }, [monsters, searchField])

  const onSearchChange = (event) => {
      console.log(event.target.value)
      const searchFieldString = event.target.value.toLocaleLowerCase();
      setSearchField(searchFieldString)

  }

    return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
      onChangeHandler={ onSearchChange }
      placeholder="Search Monsters"
      className='monster-search-box' 
      />
      <CardList monsters = { items }/>
    </div>
  );

}

export default App;
