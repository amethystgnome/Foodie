from pymongo import MongoClient
import pandas as pd

# Load the dataset
df = pd.read_csv('./data/cleaned_recipes.csv')

# Convert to dictionary format for MongoDB
data = df.to_dict('records')

# Connect to MongoDB Atlas
client = MongoClient('mongodb+srv://aubrysample:Longpassword123**@cluster.x0syb.mongodb.net/?retryWrites=true&w=majority&appName=cluster')

# Specify the database and collection
db = client['recipes_db']
collection = db['recipes']

# Insert data in batches for efficiency
batch_size = 1000
for i in range(0, len(data), batch_size):
    batch = data[i:i + batch_size]
    collection.insert_many(batch)
    print(f"Inserted batch {i // batch_size + 1}/{-(-len(data) // batch_size)}")

print("Data imported successfully!")
