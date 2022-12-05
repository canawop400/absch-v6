import sqlite3


connection = sqlite3.connect('database.db')

cursor = connection.cursor()
# cursor.execute(f"INSERT INTO news (title, content) VALUES ('Noticia test', '{'Ejemplo de noticia'}')")

with open("schema.sql", "r") as file:
	script = file.read()
	cursor.executescript(script)

connection.commit()
connection.close()