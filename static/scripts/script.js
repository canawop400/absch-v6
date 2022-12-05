function all() {
	let hamburgerMenu = document.getElementById("hamburger-menu");
	let navbar = document.getElementById("navbar")
	let main = document.getElementById("main");


	main.addEventListener("click", (event) => {
		if (hamburgerMenu.contains(event.target)){
			navbar.classList.remove("hidden");
			main.classList.add("blur");
		}

		if ((!(hamburgerMenu.contains(event.target))) && !(navbar.contains(event.target))) {
			navbar.classList.add("hidden");
			main.classList.remove("blur");
		}
	});

}

function news() {
	// Hacer que el alto de las noticias aumente entre mas texto tengan.

	let newsWrapper = document.getElementById("news-wrapper");
	let news = [...document.getElementsByClassName("new")];

	// Add colors to the images
	(() => {
		const colors = ["#8AFF80", "#FFCA80", "#FF80BF", "#9580FF", "#FF9580", "#FFFF80"];
		const images = [...document.getElementsByClassName("new-image")];

		images.forEach((image) => {
			image.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
		});
	})();
	
}

function createNews() {

	document.getElementById("submit").addEventListener("click", (event) => {
		let data = new FormData();
		data.append("action", "create");
		data.append("title", document.getElementById("title").value);
		data.append("content", document.getElementById("content").value);

		let xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/api/news/");
		xhttp.send(data);

		document.getElementById("submit").disabled = true;

		setTimeout(() => {
			window.location.href = "/admin/noticias/";
		}, 500);
	});

	document.getElementById("cancel").addEventListener("click", (event) => {
		window.location.href = "/admin/noticias/";
	});
}

function adminNews() {
	let deleteMode = false;
	let news = [...document.getElementsByClassName("new")];


	document.getElementById("add").addEventListener("click", (event) => {
		window.location.href = "/admin/noticias/crear/";
	});

	document.getElementById("remove").addEventListener("click", (event) => {
		if (deleteMode) {
			deleteMode = false;

		} else {
			deleteMode = true;
		}

		news.forEach((element) => {
			element.classList.toggle("deleting");
		});
	});

	news.forEach((element) => {
		element.addEventListener("click", (event) => {
			if (deleteMode) {
				let title = element.children[1].innerHTML;
				let content = element.children[2].innerHTML;

				let xhttp = new XMLHttpRequest();
				
				let data = new FormData();
				data.append("action", "delete");
				data.append("title", title);
				data.append("content", content);
				
				xhttp.onload = function() {
					if (this.status == 200) {
						element.remove();
					}
				}

				xhttp.open("POST", "/api/news/");
				xhttp.send(data);

			}
		});
	});
}


function contact() {
	document.getElementById("submit").addEventListener("click", (event) => {
		let name = document.getElementById("name").value;
		let email = document.getElementById("email").value;
		let message = document.getElementById("message").value;

		let xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/api/mails/");

		let data = new FormData();
		data.append("name", name);
		data.append("email", email);
		data.append("message", message);

		xhttp.send(data);
	});
}


function procedures() {
	document.getElementById("submit").addEventListener("click", (event) => {
		let name = document.getElementById("name");
		let lastNames = document.getElementById("last-names");
		let curp = document.getElementById("curp");
		let controlNumber = document.getElementById("control-number");

		console.log(controlNumber);

		if (name && lastNames && curp && controlNumber) {
			let name = ""

			switch (window.location.pathname) {
				case "/tramites/boleta/":
					window.location.href = "/tramites/resultado/boleta/";
					break;

				case "/tramites/constancia/":
					window.location.href = "/tramites/resultado/constancia/";
					break;
			}
		}
	});
}


(() => {
	// Main function

	all();

	switch (window.location.pathname) {
		case "/admin/noticias/":
			adminNews()

		case "/noticias/":
			news();
			break;

		case "/admin/noticias/crear/":
			createNews();
			break;

		case "/contacto/":
			contact();
			break;

		case "/tramites/boleta/":
			procedures();
			break;

		case "/tramites/constancia/":
			procedures();
			break;
	}

})();