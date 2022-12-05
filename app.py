from flask import Flask, render_template, request, send_from_directory
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
	return render_template("news.html", news=get_news())

@app.route("/contacto/")
def contact():
	return render_template("contact.html")


# Procedures
@app.route("/tramites/<name>/")
def process(name):
	if not name in ["boleta", "constancia"]:
		return ({"Error": "Tramite invalido"}, 400)

	return render_template("generic_process.html", name=f"Tramitar {name.title()}")


@app.get("/tramites/resultado/<name>/")
def result(name):
	if name == "boleta":
		return send_from_directory("files", "boleta.pdf")

	elif name == "constancia":
		return send_from_directory("files", "constancia.pdf")

	else:
		return ({"Error": "Tramite invalido"}, 400)

# Admin

@app.route("/admin/noticias/")
def admin_news():
	return render_template("admin_news.html", news=get_news())

@app.route("/admin/noticias/crear/")
def create_news():
	return render_template("create_news.html")


def get_news():
	conn = get_db()
	rows = conn.execute("SELECT * FROM news").fetchall()
	conn.close()

	news = {
		"news": []
	}

	for item in rows:
		news["news"].append({"id": item["id"], "image": item["image"], "title": item["title"], "content": item["content"]})

	return news["news"]


@app.post("/api/mails/")
def api_mails():
	name = request.form.get("name")
	email = request.form.get("email")
	message = request.form.get("message")

	return ("received", 200)


@app.post("/api/news/")
def api_news():
	""" Handles creation, modification and deletion """

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

	else:
		return ({"error": "Accion no encontrada"}, 400)

	conn.commit()
	conn.close()

	return ("Deleted", 200)

# Database

def get_db():
	conn = sqlite3.connect("database.db")
	conn.row_factory = sqlite3.Row

	return conn