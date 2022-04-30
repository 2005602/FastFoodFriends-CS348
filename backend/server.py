import sqlite3
from flask import Flask, request

app = Flask(__name__)

@app.route("/setup")
def setup():
    conn = sqlite3.connect('fff.db')
    cursor = conn.cursor()
    command = """DROP TABLE IF EXISTS
    restaurants"""
    cursor.execute(command)
    command = """CREATE TABLE IF NOT EXISTS
    restaurants(restaurant_id TEXT PRIMARY KEY, category TEXT)"""
    cursor.execute(command)
    command = """DROP TABLE IF EXISTS
    Menu"""
    cursor.execute(command)
    command = """CREATE TABLE IF NOT EXISTS
    Menu(restaurant_id TEXT , name TEXT, price DOUBLE, calories INTEGER, PRIMARY KEY(restaurant_id,name))"""
    cursor.execute(command)
    command = """DROP TABLE IF EXISTS
    users"""
    cursor.execute(command)
    command = """CREATE TABLE IF NOT EXISTS
    users(email TEXT PRIMARY KEY, password TEXT)"""
    cursor.execute(command)

    conn.close()
    return "Done!"

@app.route("/addRestaurant", methods = ['POST'])
def addRestaurant():
    jsonData = request.get_json()
    name = jsonData['name']
    category = jsonData['category']

    conn = sqlite3.connect('fff.db')
    cursor = conn.cursor()
    print(name, flush=True)
    print(category, flush=True)
    command = """INSERT INTO restaurants VALUES
    (?, ?)"""
    cursor.execute(command, (name, category))
    conn.commit()
    conn.close()
    return "Done!"

@app.route("/addMenuItem", methods = ['POST'])
def addMenuItem():
    jsonData = request.get_json()
    restaurant = jsonData['restaurant']
    name = jsonData['name']
    price = jsonData['price']
    calories = jsonData['calories']
    conn = sqlite3.connect('fff.db')
    cursor = conn.cursor()
    command = """INSERT INTO Menu VALUES
    (?, ?, ?, ?)"""
    cursor.execute(command, (restaurant, name, price, calories))
    conn.close()
    return {"status": "Done"}

@app.route("/addUser", methods = ['POST'])
def addUser():
    jsonData = request.get_json()
    email = jsonData['email']
    password = jsonData['password']
    conn = sqlite3.connect('fff.db')
    cursor = conn.cursor()
    print(email, flush=True)
    print(password, flush=True)
    command = """INSERT INTO users VALUES
    (?, ?)"""
    cursor.execute(command, (email, password))
    conn.commit()
    conn.close()
    return {"status": "Done"}

@app.route("/MenuItem", methods = ['POST'])
def getMenu():
    jsonData = request.get_json()
    restaurant = jsonData['restaurant']
    print(restaurant)
    conn = sqlite3.connect('fff.db')
    cursor = conn.cursor()
    command = """SELECT * FROM Menu WHERE restaurant_id = (?)"""
    cursor.execute(command, (restaurant,))
    result = cursor.fetchall()
    conn.close()
    print(result, flush=True)
    return {"menu": result}

@app.route("/checkUser", methods = ['POST'])
def checkUser():
    jsonData = request.get_json()
    email = jsonData['email']
    password = jsonData['password']

    conn = sqlite3.connect('fff.db')
    cursor = conn.cursor()
    print(email, flush=True)
    print(password, flush=True)
    command = """
        SELECT email, password
        FROM users
        WHERE email = (?) AND password = (?)        
        """
    cursor.execute(command, (email, password))

    result = cursor.fetchall()
    conn.close()
    print(result, flush=True)
    if len(result) >= 1:
        return "true"

    return "false"
    
@app.route("/restaurants")
def getRestaurants():
    conn = sqlite3.connect('fff.db')
    cursor = conn.cursor()
    command = """SELECT * FROM restaurants"""
    cursor.execute(command)
    result = cursor.fetchall()
    conn.close()
    print(result, flush=True)
    return {"restaurants": result}

@app.route("/users")
def getUsers():
    conn = sqlite3.connect('fff.db')
    cursor = conn.cursor()
    command = """SELECT * FROM users"""
    cursor.execute(command)
    result = cursor.fetchall()
    conn.close()
    print(result, flush=True)
    return {"users": result}

if __name__ == "__main__":
    app.run(debug=True)