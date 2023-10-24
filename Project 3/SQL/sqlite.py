import sqlite3
import pandas as pd

#Load data file
df = pd.read_csv(breweries2.csv)

#connect to sqlite database
connection = sqlite3.connect(breweries.db)

#load CSV to SQLITE database
df.to_sql('breweries', connection, if_exists='replace')

#close connection
connection.close()