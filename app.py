from flask import Flask, render_template, request
import sqlite3


app = Flask(__name__)


@app.route("/")
def index():
	return render_template("index.html")


@app.route("/tramites/")
def procedures():
	return render_template("procedures.html")


@app.route("/noticias/")
def news():

	# # Getting news
	# conn = get_db()
	# rows = conn.execute("SELECT * FROM news").fetchall()
	# conn.close()

	# news = {
	# 	"news": []
	# }

	# for item in rows:
	# 	news["news"].append({"id": item["id"], "created": item["created"], "title": item["title"], "content": item["content"]})

	return render_template("news.html", news=[1, 2, 3, 4, 5, 6])


@app.route("/contacto/")
def contact():
	return render_template("contact.html")


@app.post("/api/news/")
def api_news():
	""" Handles new-creation, new-modification and new-deletion """

	action = request.form.get("action")
	title = request.form.get("title")
	content = request.form.get("content")

	if not title or not content:
		return ({"error": "Ninguno de los campos puede estar vacio"}, 400)


	# WARNING: Esto es vulnerable a SQL-Injection
	# Ver: https://owasp.org/www-community/attacks/SQL_Injection
	conn = get_db()

	if action == "create":
		conn.execute(f"INSERT INTO news (title, content) VALUES ('{title}', '{content}');")

	elif action == "delete":
		conn.execute(f"DELETE FROM news WHERE title = '{title}' and content = '{content}' limit 1;")

	elif action == "edit":
		# TODO: Implementar esto
		pass

	else:
		return ({"error": "Opcion no encontrada"}, 400)

	conn.commit()
	conn.close()

	return 200


# Database

def get_db():
	conn = sqlite3.connect("/home/canawop400/absch/database.db")
	conn.row_factory = sqlite3.Row

	return conn