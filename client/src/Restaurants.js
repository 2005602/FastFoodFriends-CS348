import React, {useState, useEffect} from 'react';

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [newRestaurant, setNewRestaurant] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [deleteRes, setDeleteRes] = useState("");


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

    function searchCat() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "search": searchCategory})
        };
        fetch("/searchCategory", requestOptions).then(
        res => res.json()
        ).then(
            data => {
            setRestaurants(data.restaurants)
            console.log(data.restaurants)
            }
        )
    }

    function renderRestaurants() {
        let items = []
        restaurants.forEach((res, index) => {
            items.push(<div><a href={`/ViewRestaurant?place=${res[0]}`}>{res[0]}, {res[1]}</a></div>)
        })
        return items
    }

    function deleteTarget() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'restaurant': deleteRes})
        };
        fetch("/deleteRes", requestOptions).then(
        res => res.json()
        ).then(
            data => {
            setRestaurants(data.restaurants)
            console.log(data.restaurants)
            }
        )
    }


    return (
    <div>
        <button onClick={() => window.location.href = "http://localhost:3000"}>Logout</button>
        <form>
        <label>
            Restaurant:
            <input value={newRestaurant} onChange={e => setNewRestaurant(e.target.value)}/>
            Category:
            <input value={newCategory} onChange={e => setNewCategory(e.target.value)}/>
        </label>
        <button onClick={() => addRestaurant()}>Add</button>
        </form>
        <form>
            <label>
                Search Category:
                <input value={searchCategory} onChange={e => setSearchCategory(e.target.value)}/>
            </label>
            <button type="button" onClick={() => searchCat()}>Search</button>
        </form>
        <form>
            <label>
                Delete Restaurant:
                <input value={deleteRes} onChange={e => setDeleteRes(e.target.value)}/>
            </label>
            <button onClick={() => deleteTarget()}>Delete</button>
        </form>
        <p>Places:</p>
        {renderRestaurants()}
    </div>
    );
}

export default Restaurants;
