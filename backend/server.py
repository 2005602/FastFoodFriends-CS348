import sqlite3
from flask import Flask, request

app = Flask(__name__)

@app.route("/setup")
def setup():
    conn = sqlite3.connect('fff.db')
    cursor = conn.cursor()
    # create restaurants table
    command = """DROP TABLE IF EXISTS
    restaurants"""
    cursor.execute(command)
    command = """CREATE TABLE IF NOT EXISTS
    restaurants(restaurant_id TEXT PRIMARY KEY, category TEXT)"""
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

if __name__ == "__main__":
    app.run(debug=True)