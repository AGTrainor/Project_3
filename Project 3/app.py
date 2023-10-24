from flask import Flask, render_template, jsonify
import json
import requests
import sqlite3

app = Flask(__name__)


# Set up SQLite database
conn = sqlite3.connect('templates/breweries.db')
c = conn.cursor()

# Close connection
conn.close()

@app.route("/")
def home():
   return render_template('index.html')
    

@app.route('/yelp')
def index():
    api_key = 'LhQ2gqFoS0ydH6Qgaz6XXG4146mDLFrhN7W2e9U9MYioo89dk1oLeZYQ6UYqm8d2augwpx4PNEGKSZf-c-aJhKJpGvh6KmMJ1nCnGi6ba9J6m090XyQGqTCZ3w0vZXYx'


    # Replace with your actual Yelp API key
    db_connection = sqlite3.connect('templates/breweries.db')
    cursor = db_connection.cursor()
    select_query = "SELECT rowid, latitude, longitude FROM breweries"
    cursor.execute(select_query)
    coordinates = cursor.fetchall()
    def fetch_yelp_data(row_id, latitude, longitude):
        yelp_url = f"https://api.yelp.com/v3/businesses/search?latitude={latitude}&longitude={longitude}&sort_by=best_match&limit=2"
        headers = {'Authorization': f'Bearer {api_key}'}
        response = requests.get(yelp_url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            if 'businesses' in data and len(data['businesses']) > 0:
                rating = data['businesses'][0].get('rating', 'Rating not found')
                update_query = "UPDATE breweries SET rating = ? WHERE rowid = ?"
                cursor.execute(update_query, (rating, row_id))
                db_connection.commit()
    for row_id, latitude, longitude in coordinates:
        fetch_yelp_data(row_id, latitude, longitude)
    db_connection.close()

    return render_template('index.html')


@app.route('/data')
def get_data():
    # Retrieve data from the database
    conn = sqlite3.connect('templates/breweries.db')
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
            'longitude': row[13],
            'latitude': row[14],
            'rating': row[15],
            'price': row[16]
        })

    file2 = open('static/js/data.json', 'w')
    file2.write(json.dumps(data))
    file2.close

    return jsonify(data)
    



if __name__ == '__main__':
    app.run(debug=True)
