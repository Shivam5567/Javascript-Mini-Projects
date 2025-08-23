document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchBox = document.getElementById("search-box");
    const searchResult = document.getElementById("search-result");
    const showMoreBtn = document.getElementById("show-more-btn");
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    let keyword = "";
    let page = 1;
    const accessKey = " "// ✅ your key

    async function searchImages() {
        if (!keyword) return;

        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;
        console.log("Fetching:", url); 

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (page === 1) {
                searchResult.innerHTML = "";
            }

            if (data.results.length === 0) {
                searchResult.innerHTML = `<p>No results found for "${keyword}"</p>`;
                showMoreBtn.style.display = "none";
                return;
            }

            data.results.forEach((item) => {
                const image = document.createElement("img");
                image.src = item.urls.small;
                image.alt = item.alt_description || "Unsplash image";

                const imageLink = document.createElement("a");
                imageLink.href = item.links.html;
                imageLink.target = "_blank";
                imageLink.rel = "noopener noreferrer";

                imageLink.appendChild(image);
                searchResult.appendChild(imageLink);
            });

            showMoreBtn.style.display = "block";
        } catch (err) {
            console.error("Error fetching images:", err);
        }
    }

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        keyword = searchBox.value.trim();
        page = 1;
        if (keyword) {
            searchImages();
        }
    });

    showMoreBtn.addEventListener("click", () => {
        page++;
        searchImages();
    });

    sidebarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            keyword = link.dataset.category;
            console.log("Category clicked:", keyword);
            searchBox.value = "";
            page = 1;
            searchImages();
        });
    });
});

