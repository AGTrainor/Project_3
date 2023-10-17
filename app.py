from flask import Flask, render_template, jsonify
import requests
import sqlite3

app = Flask(__name__)

# Set up SQLite database
conn = sqlite3.connect('breweries.db')
c = conn.cursor()

# Create table if not exists
c.execute('''CREATE TABLE IF NOT EXISTS breweries
             (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, brewery_type TEXT, city TEXT, state TEXT, yelp_rating REAL)''')
conn.commit()

# Close connection
conn.close()


@app.route('/')
def index():
    # Fetch data from OpenBreweryDB API
    response = requests.get('https://api.openbrewerydb.org/breweries')
    breweries = response.json()

    # Fetch Yelp ratings for each brewery
    for brewery in breweries:
        yelp_response = requests.get('Enter your yelp_API_Endpoint key here' + brewery['name'])  # Replace 'YELP_API_ENDPOINT' with the actual Yelp API endpoint
        yelp_data = yelp_response.json()
        brewery['yelp_rating'] = yelp_data.get('rating', None)

        # Store data in SQLite database
        conn = sqlite3.connect('breweries.db')
        c = conn.cursor()
        c.execute("INSERT INTO breweries (name, brewery_type, city, state, yelp_rating) VALUES (?, ?, ?, ?, ?)",
                  (brewery['name'], brewery['brewery_type'], brewery['city'], brewery['state'], brewery['yelp_rating']))
        conn.commit()
        conn.close()

    return render_template('index.html')


@app.route('/data')
def get_data():
    # Retrieve data from the database
    conn = sqlite3.connect('breweries.db')
    c = conn.cursor()
    c.execute("SELECT * FROM breweries")
    rows = c.fetchall()
    conn.close()

    # Prepare data for JSON response
    data = []
    for row in rows:
        data.append({
            'name': row[1],
            'brewery_type': row[2],
            'city': row[3],
            'state': row[4],
            'yelp_rating': row[5]
        })

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
