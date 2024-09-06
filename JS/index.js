




let allGames = [];
let mySpinner = document.querySelector(".Loader");

async function getGamesByCategory(category) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a4b5658ef7msh0baffd1dc93b956p1ab941jsn437d0e9746a1',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    mySpinner.style.display = 'block'; 
    try {
        const response = await fetch(url, options);
        allGames = await response.json();
        displayGames();

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        mySpinner.style.display = 'none'; 
    }
}

function displayGames() {
    let cartoona = "";
    for (const game of allGames) {
        cartoona += `<div class="col-lg-3 col-md-4 col-sm-6">
            <figure class="game-card rounded-3" data-id="${game.id}">
                <div class="main-card p-3">
                    <img src="${game.thumbnail}" class="w-100" alt="">
                    <figcaption>
                        <div class="content d-flex align-items-center justify-content-between mt-2">
                            <h6 class="text-white">${game.title.split(" ").splice(0, 2).join(" ")}</h6>
                            <button class="btn btn-info fw-bold text-white">Free</button>
                        </div>
                        <div class="description text-center text-white mt-1">
                            <p>${game.short_description.split(" ").splice(0, 2).join(" ")}</p>
                        </div>
                    </figcaption>
                </div>
                <div class="end-card d-flex align-items-center justify-content-between">
                    <div class="border-black">
                        <span class="bg-info text-white p-1 rounded-3">${game.genre}</span>
                    </div>
                    <div>
                        <span class="bg-info text-white p-1 rounded-3">${game.platform}</span>
                    </div>
                </div>
            </figure>
        </div>`;
    }
    document.querySelector(".game-row").innerHTML = cartoona;

   
    document.querySelectorAll(".game-card").forEach(card => {
        card.addEventListener("click", async () => {
            const gameId = card.getAttribute("data-id");
            await getGameDetails(gameId);
        });
    });
// const selectorElement= document.querySelectorAll(".game-card")
//     for (const card of selectorElement) {
//         card.addEventListener("click",async function() {
//             const Id = this.dataset.id;
//             await getGameDetails(Id);
//         }
        
//        )}
}

async function getGameDetails(Id) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${Id}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a4b5658ef7msh0baffd1dc93b956p1ab941jsn437d0e9746a1',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const gameDetails = await response.json();
        displayGameDetails(gameDetails);
    } catch (error) {
        console.error('Error fetching game details:', error);
    }
}

function displayGameDetails(gameDetails) {
    const gameDetailsContent = document.getElementById("gameDetailsContent");
    gameDetailsContent.innerHTML = `
        <h2>${gameDetails.title}</h2>
        <img src="${gameDetails.thumbnail}" alt="${gameDetails.title}" class="img-fluid">
        <p><strong>Description:</strong> ${gameDetails.description}</p>
        <p><strong>Genre:</strong> ${gameDetails.genre}</p>
        <p><strong>Platform:</strong> ${gameDetails.platform}</p>
        <p><strong>Publisher:</strong> ${gameDetails.publisher}</p>
        <p><strong>Developer:</strong> ${gameDetails.developer}</p>
        <p><strong>Release Date:</strong> ${gameDetails.release_date}</p>
        <p><strong>Minimum System Requirements:</strong></p>
        <ul>
            <li>OS: ${gameDetails.minimum_system_requirements.os}</li>
            <li>Processor: ${gameDetails.minimum_system_requirements.processor}</li>
            <li>Memory: ${gameDetails.minimum_system_requirements.memory}</li>
            <li>Graphics: ${gameDetails.minimum_system_requirements.graphics}</li>
            <li>Storage: ${gameDetails.minimum_system_requirements.storage}</li>
        </ul>
        <p><strong>Screenshots:</strong></p>
        <div class="screenshots">
            ${gameDetails.screenshots.map(screenshot => `<img src="${screenshot.image}" alt="Screenshot" class="img-fluid mb-2">`).join('')}
        </div>
        <a href="${gameDetails.game_url}" target="_blank" class="btn btn-primary">Play Now</a>
    `;

    new bootstrap.Modal(document.getElementById("gameDetailsModal")).show();
}




document.querySelector(".navbar-nav").addEventListener("click", async function(e) {
    if (e.target.classList.contains("game-btn")) {
        const category = e.target.dataset.category;

       
        document.querySelectorAll(".game-btn").forEach(btn => btn.classList.remove("vip", "main-color"));
        e.target.classList.add("vip");

        document.querySelectorAll(".game-btn").forEach(btn => {
            if (btn !== e.target) {
                btn.classList.add("main-color");
            }
        });

 
        await getGamesByCategory(category);
    }
});


getGamesByCategory('MMORPG');
