from flask import Flask, render_template, jsonify
import json
import requests
import sqlite3

app = Flask(__name__)


# Set up SQLite database
conn = sqlite3.connect('breweries.db')
c = conn.cursor()

# Close connection
conn.close()

@app.route("/")
def home():
   return render_template('index.html')
    

@app.route('/yelp')
def index():
    # Fetch data from OpenBreweryDB API
    response = requests.get('https://api.openbrewerydb.org/breweries')
    breweries = response.json()

    # Fetch Yelp ratings for each brewery
    for brewery in breweries:
        yelp_response = requests.get('LhQ2gqFoS0ydH6Qgaz6XXG4146mDLFrhN7W2e9U9MYioo89dk1oLeZYQ6UYqm8d2augwpx4PNEGKSZf-c-aJhKJpGvh6KmMJ1nCnGi6ba9J6m090XyQGqTCZ3w0vZXYx' + brewery['name'])  # Replace 'YELP_API_ENDPOINT' with the actual Yelp API endpoint
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
            'name': row[2],
            'brewery_type': row[3],
            'city': row[7],
            'state': row[8],
            'yelp_rating': row[5],##still needs to be pulled from top
            'longitude': row[13],
            'latitude': row[14]
        })

    file2 = open('static/js/data.json', 'w')
    file2.write(json.dumps(data))
    file2.close

    return jsonify(data)
    



if __name__ == '__main__':
    app.run(debug=True)
