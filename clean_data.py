import pandas as pd

# d = pd.read_csv("BRVM Composite Historical Data.csv")
# d.to_csv("clean_data.csv")

f = open("BRVM Composite Historical Data.csv", "r")

line = f.readlines()
line = "".join(line)

feet = '"'
print(feet)

line.replace(feet, "")
print(line)