import React, {useState, useEffect} from 'react';

function ViewRestaurant() {
    const [menu, setMenu] = useState([]);
    const [newFoodName, setNewFoodName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newCalories, setNewCalories] = useState("");
    const [minCalories, setMinCalories] = useState("");
    const [maxCalories, setMaxCalories] = useState("");
    const [editFoodName, setEditFoodName] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editCalories, setEditCalories] = useState("");
    const [locs, setLocs] = useState([]);
    const [newState, setNewState] = useState("");
    const [newCity, setNewCity] = useState("");

    const params = new URLSearchParams(window.location.search);
    let restaurant = params.get('place');


    useEffect(() => {
        console.log(restaurant);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'restaurant': restaurant})
        };
        fetch("/MenuItem", requestOptions).then(
            res => res.json()
        ).then(
            data => {
                setMenu(data.menu)
                console.log(data.menu)
            }
        );
        fetch("/ResLocation", requestOptions).then(
            res => res.json()
        ).then(
            data => {
                setLocs(data.locs)
                console.log(data.locs)
            }
        );
        }, []);

    function renderMenu() {
        let items = []
        menu.forEach((res, index) => {
            items.push(<div><p>Item: {res[1]}, Price: {res[2]}, Calories: {res[3]}</p></div>)
        })
        return items
    }

    function renderLocation() {
        return locs?.map(loc => (<div><p>State: {loc[0]}, City: {loc[1]}</p></div>))
    }

    function addLocation() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "restaurant": restaurant, "state": newState,
                "city": newCity})
        };
        console.log(requestOptions)
        fetch("/addLocation", requestOptions);
        window.location.reload(false);
    }

    function deleteLocation() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "restaurant": restaurant, "state": newState,
                "city": newCity})
        };
        console.log(requestOptions)
        fetch("/deleteLocation", requestOptions);
        window.location.reload(false);
    }

    function addMenuItem() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "restaurant": restaurant, "name": newFoodName,
                "price": parseFloat(newPrice), "calories": parseInt(newCalories)})
        };
        console.log(requestOptions)
        fetch("/addMenuItem", requestOptions);
        window.location.reload(false);
    }

    function editMenuItem() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "restaurant": restaurant, "name": editFoodName,
                "price": parseFloat(editPrice), "calories": parseInt(editCalories)})
        };
        console.log(requestOptions)
        fetch("/updateMenuItem", requestOptions);
        window.location.reload(false);
    }


    function filterCals() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "restaurant": restaurant,  "minCals": parseInt(minCalories),
            "maxCals": parseInt(maxCalories)})
        };
        console.log(requestOptions)
        fetch("/menuCals", requestOptions).then(
            res => res.json()
        ).then(
            data => {
                setMenu(data.menu)
                console.log(data.menu)
            }
        )
    }

    return (
        <div>
            <h1>{restaurant}</h1>
            <button onClick={() => window.location.href = "http://localhost:3000/Home"}>Back</button>
            <h2>Menu:</h2>
            {renderMenu()}
            <h4>Update Food Item</h4>
            <label>
                Food Name:
                <input value={editFoodName} onChange={e => setEditFoodName(e.target.value)}/>
                Price:
                <input value={editPrice} onChange={e => setEditPrice(e.target.value)}/>
                Calories:
                <input value={editCalories} onChange={e => setEditCalories(e.target.value)}/>
            </label>
            <button onClick={() => editMenuItem()}>Update</button>
            <h4>Filter Food Item</h4>
            <br/>
            <label>
                Min Calories:
                <input value={minCalories} onChange={e => setMinCalories(e.target.value)}/>
                Max Calories:
                <input value={maxCalories} onChange={e => setMaxCalories(e.target.value)}/>
                <button type="button" onClick={() => filterCals()}>Filter</button>
            </label>
            <h4>Create Food Item</h4>
            <br/>
            <label>
                Food Name:
                <input value={newFoodName} onChange={e => setNewFoodName(e.target.value)}/>
                Price:
                <input value={newPrice} onChange={e => setNewPrice(e.target.value)}/>
                Calories:
                <input value={newCalories} onChange={e => setNewCalories(e.target.value)}/>
            </label>
            <button onClick={() => addMenuItem()}>Add</button>
            <h2>Restaurant Locations:</h2>
            {renderLocation()}
            <h4>Add/Remove Restaurant Location</h4>
            <br/>
            <label>
                State:
                <input value={newState} onChange={e => setNewState(e.target.value)}/>
                City:
                <input value={newCity} onChange={e => setNewCity(e.target.value)}/>
            </label>
            <button onClick={() => addLocation()}>Add</button>
            <button onClick={() => deleteLocation()}>Delete</button>
        </div>


    );
}

export default ViewRestaurant;
