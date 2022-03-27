import React, {useState, useEffect} from 'react';

function App() {
  const [restaurants, setRestaurants] = useState({});
  const [newRestaurant, setNewRestaurant] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetch("/restaurants").then(
      res => res.json()
    ).then(
      data => {
        setRestaurants(data.restaurants)
        console.log(data.restaurants)
      }
    )

  }, []); 

  function addRestaurant() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "name": newRestaurant, "category": newCategory})
    };
    fetch("/addRestaurant", requestOptions);
  }


  return (
    <div>
      <form>
        <label>
          Restaurant:
          <input value={newRestaurant} onChange={e => setNewRestaurant(e.target.value)}/>
          Category:
          <input value={newCategory} onChange={e => setNewCategory(e.target.value)}/>
        </label>
        <button onClick={() => addRestaurant()}>Add</button>
      </form>
      <p>Places: {JSON.stringify(restaurants)}</p>
    </div>
  );
}

export default App;
