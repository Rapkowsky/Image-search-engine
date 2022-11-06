const auth = "563492ad6f917000010000017dd21fe197d642f5985a0e4b22e2dc1a";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-form__inupt");
const form = document.querySelector(".search-form");
const moreBtn = document.querySelector(".nav-button__more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

// Listeners

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
	e.preventDefault();
	currentSearch = searchValue;
	searchPhotos(searchValue);
});
moreBtn.addEventListener("click", loadMore);

// Fn

function updateInput(e) {
	searchValue = e.target.value;
}
async function fetchApi(url) {
	const dataFetch = await fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: auth,
		},
	});
	const data = await dataFetch.json();
	return data;
}

function generatePictures(data) {
	data.photos.forEach((photo) => {
		const galleryImg = document.createElement("div");
		galleryImg.classList.add("gallery-img-container");
		galleryImg.innerHTML = `
		<div class="gallery-info">
        <p>${photo.photographer}</p>
		<a href=${photo.src.original}>Download</a>
		</div>
		<div class="img-container">
		<img src=${photo.src.large}> </img>
		</div>`;
		gallery.appendChild(galleryImg);
	});
}

async function curatedPhotos() {
	fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
	const data = await fetchApi(fetchLink);
	generatePictures(data);
}

async function searchPhotos(inputValue) {
	clearGallery();
	fetchLink = `https://api.pexels.com/v1/search?query=${inputValue}+query&per_page=15&page=1`;
	const data = await fetchApi(fetchLink);
	generatePictures(data);
}
function clearGallery() {
	gallery.innerHTML = "";
	searchInput.value = "";
}

async function loadMore() {
	page++;
	if (currentSearch) {
		fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
	} else {
		fetchLink = `https://api.pexels.com/v1/curated?per_page=15&${page}`;
	}
	const data = await fetchApi(fetchLink);
	generatePictures(data);
}
curatedPhotos();
