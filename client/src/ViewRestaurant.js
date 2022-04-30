import React, {useState, useEffect} from 'react';

function ViewRestaurant() {
    const [menu, setMenu] = useState([]);
    const [newFoodName, setNewFoodName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newCalories, setNewCalories] = useState("");

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
        )
        
        }, []);
    
    function renderMenu() {
        let items = []
        menu.forEach((res, index) => {
            items.push(<div><p>Item: {res[1]}, Price: {res[2]}, Calories: {res[3]}</p></div>)
        })
        return items
    }    
    
    function addMenuItem() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "restaurant": restaurant, "name": newFoodName, 
                "price": parseFloat(newPrice), "calories": parseInt(newCalories)})
        };
        fetch("/addMenuItem", requestOptions);
        window.location.reload(false);
    }

    return (
        <div>
            <h1>{restaurant}</h1>
            <h4>Menu:</h4>
            {renderMenu()}
            <label>
                Food Name:
                <input value={newFoodName} onChange={e => setNewFoodName(e.target.value)}/>
                Price:
                <input value={newPrice} onChange={e => setNewPrice(e.target.value)}/>
                Calories:
                <input value={newCalories} onChange={e => setNewCalories(e.target.value)}/>
            </label>
            <button onClick={() => addMenuItem()}>Add</button>
        </div>


    );
}

export default ViewRestaurant;