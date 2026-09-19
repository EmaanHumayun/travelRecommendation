// ========================================
// Travel Recommendation Website
// ========================================

// Get HTML elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
const results = document.getElementById("results");

// Store API data
let travelData = {};


// ========================================
// TASK 6 - FETCH API DATA
// ========================================

fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {

        travelData = data;

        console.log("Travel data loaded successfully:");
        console.log(travelData);

    })
    .catch(error => {

        console.error("Error fetching travel data:", error);

    });


// ========================================
// TASK 7 - SEARCH BUTTON
// ========================================

searchButton.addEventListener("click", searchRecommendations);


function searchRecommendations() {

    // Get user input
    const keyword = searchInput.value.trim().toLowerCase();

    // Clear previous results
    results.innerHTML = "";


    // ========================================
    // BEACH / BEACHES
    // ========================================

    if (keyword === "beach" || keyword === "beaches") {

        displayRecommendations(travelData.beaches);

    }


    // ========================================
    // TEMPLE / TEMPLES
    // ========================================

    else if (keyword === "temple" || keyword === "temples") {

        displayRecommendations(travelData.temples);

    }


    // ========================================
    // COUNTRY / COUNTRIES
    // ========================================

    else if (keyword === "country" || keyword === "countries") {

        displayCountries(travelData.countries);

    }


    // ========================================
    // NO MATCH
    // ========================================

    else {

        results.innerHTML = `
            <div class="no-results">
                <h3>No recommendations found</h3>
                <p>
                    Please search for beach, beaches,
                    temple, temples, country, or countries.
                </p>
            </div>
        `;
    }
}


// ========================================
// TASK 8 - DISPLAY BEACHES AND TEMPLES
// ========================================

function displayRecommendations(recommendations) {

    results.innerHTML = "";

    if (!recommendations || recommendations.length === 0) {

        results.innerHTML = `
            <div class="no-results">
                <h3>No recommendations available.</h3>
            </div>
        `;

        return;
    }


    recommendations.forEach(place => {

        const card = document.createElement("div");

        card.className = "recommendation-card";


        // Use online images according to recommendation
        let image = getImage(place.name);


        card.innerHTML = `
            <img
                src="${image}"
                alt="${place.name}"
            >

            <div class="card-content">

                <h3>${place.name}</h3>

                <p>${place.description}</p>

                <button class="visit-btn">
                    Visit Now
                </button>

            </div>
        `;


        results.appendChild(card);

    });
}


// ========================================
// TASK 8 - DISPLAY COUNTRIES
// ========================================

function displayCountries(countries) {

    results.innerHTML = "";

    if (!countries || countries.length === 0) {

        results.innerHTML = `
            <div class="no-results">
                <h3>No countries available.</h3>
            </div>
        `;

        return;
    }


    countries.forEach(country => {

        country.cities.forEach(city => {

            const card = document.createElement("div");

            card.className = "recommendation-card";


            let image = getImage(city.name);


            card.innerHTML = `
                <img
                    src="${image}"
                    alt="${city.name}"
                >

                <div class="card-content">

                    <h3>${city.name}</h3>

                    <p>${city.description}</p>

                    <button class="visit-btn">
                        Visit Now
                    </button>

                </div>
            `;


            results.appendChild(card);

        });

    });
}


// ========================================
// IMAGE FUNCTION
// ========================================

function getImage(placeName) {

    const images = {

        "Bora Bora, French Polynesia":
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",

        "Copacabana Beach, Brazil":
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=80",

        "Angkor Wat, Cambodia":
            "https://images.unsplash.com/photo-1600686000000-1c7e7e6c0a4f?auto=format&fit=crop&w=1000&q=80",

        "Taj Mahal, India":
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",

        "Sydney, Australia":
            "https://images.unsplash.com/photo-1506973035872-a4f7d0f6c0c3?auto=format&fit=crop&w=1000&q=80",

        "Melbourne, Australia":
            "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1000&q=80",

        "Tokyo, Japan":
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",

        "Kyoto, Japan":
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",

        "Rio de Janeiro, Brazil":
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=80",

        "São Paulo, Brazil":
            "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1000&q=80"

    };


    return images[placeName] ||
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80";
}


// ========================================
// TASK 9 - RESET / CLEAR BUTTON
// ========================================

resetButton.addEventListener("click", clearResults);


function clearResults() {

    searchInput.value = "";

    results.innerHTML = "";

}