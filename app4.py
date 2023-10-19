from flask import Flask, jsonify
import requests
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///breweries.db'
db = SQLAlchemy(app)

class Business(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    yelp_rating = db.Column(db.Float)
    review_count = db.Column(db.Integer)

# Yelp API setup
@app.route('/yelp_ratings', methods=['GET'])
def get_yelp_ratings():
    print("Received request for /yelp_ratings")
    
    YELP_API_KEY = 'YOUR_YELP_API_KEY'  # Replace 'YOUR_YELP_API_KEY' with your actual Yelp API key
    URL = 'https://api.yelp.com/v3/businesses/search'
    headers = {'Authorization': 'Bearer %s' % YELP_API_KEY}

    breweries = Business.query.all()
    for brewery in breweries:
        params = {'term': brewery.name, 'location': 'San Francisco'}  # Adjust location as needed
        response = requests.get(URL, headers=headers, params=params)
        if response.status_code == 200:
            yelp_data = response.json().get('businesses', [])
            for data in yelp_data:
                if data['name'].lower() == brewery.name.lower():
                    brewery.yelp_rating = data['rating']
                    brewery.review_count = data['review_count']
                    db.session.commit()
                    break

    return jsonify({'message': 'Ratings updated successfully'})

@app.route('/data')
def get_data():
    # Retrieve data from the database
    breweries = Business.query.all()

    # Prepare data for JSON response
    data = []
    for brewery in breweries:
        data.append({
            'name': brewery.name,
            'yelp_rating': brewery.yelp_rating,
            'review_count': brewery.review_count
        })

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
