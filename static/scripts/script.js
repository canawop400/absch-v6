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

(() => {
	// Main function

	all();

	switch (window.location.pathname) {
/*		case "/":
			index();
			break;
*/		
/*		case "/tramites/":
			procedures();
			break;*/

		case "/noticias/":
			news();
			break;
/*
		case "/contacto/":
			contact();
			break;*/
	}

})();