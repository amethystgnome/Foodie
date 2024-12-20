import pandas as pd

# Load the dataset
df = pd.read_csv('./data/recipes.csv')

# Select the relevant columns
df = df[['recipe_name', 'ingredients', 'directions', 'img_src']]

# Save the cleaned dataset
df.to_csv('./data/cleaned_recipes.csv', index=False)
print("Dataset cleaned and saved as 'cleaned_recipes.csv'")
