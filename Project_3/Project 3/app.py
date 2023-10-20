from flask import Flask, render_template, jsonify
import json
import requests
import sqlite3

app = Flask(__name__)

def create_connection():
    return sqlite3.connect('breweries.db')

def close_connection(conn):
    conn.close()

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/yelp')
def index():
    # Fetch data from Yelp API
    response = requests.get('https://api.yelp.com/v3/businesses/search')
    breweries = response.json()

    # Fetch Yelp ratings for each brewery
    for brewery in breweries:
        yelp_response = requests.get('YELP_API_ENDPOINT' + brewery['name'])  # Replace 'YELP_API_ENDPOINT' with the actual Yelp API endpoint
        yelp_data = yelp_response.json()
        brewery['yelp_rating'] = yelp_data.get('rating', None)

        # Store data in SQLite database
        conn = create_connection()
        with conn:
            c = conn.cursor()
            c.execute("INSERT INTO breweries (name, brewery_type, city, state, yelp_rating) VALUES (?, ?, ?, ?, ?)",
                      (brewery['name'], brewery['brewery_type'], brewery['city'], brewery['state'], brewery['yelp_rating']))

    return render_template('index.html')

@app.route('/data')
def get_data():
    # Retrieve data from the database
    conn = create_connection()
    with conn:
        c = conn.cursor()
        c.execute("SELECT * FROM breweries")
        rows = c.fetchall()

    # Prepare data for JSON response
    data = []
    for row in rows:
        data.append({
            'name': row[1],
            'brewery_type': row[2],
            'city': row[3],
            'state': row[4],
            'yelp_rating': row[5],  # still needs to be pulled from the top
            'longitude': row[6],  # Assuming column indices based on  database schema
            'latitude': row[7]  # Assuming column indices based on  database schema
        })

    with open('static/data.json', 'w') as file2:
        json.dump(data, file2)

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
