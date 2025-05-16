let travelData = null;

// Step 1: Fetch the JSON data
fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("failed to load data.");
        }
        return response.json();
    })

    .then(data => {
        travelData = data;
    })
    .catch(error => {
        console.error("Error getching recommendations:", error);
    });


    //Event listener for the Search button

    document.getElementById('searchBtn').addEventListener('click', () => {
        const input = document.getElementById('searchInput').value.trim().toLowerCase();
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ``;

        if (!travelData) return;
        let results = [];

        //Match beaches
        if (input.includes("beach")) {
            results = travelData.beaches;
        }

        //Match temples
        if (input.includes("temple")){
            results = travelData.temples;
        }

        //Match countries
        else {
            travelData.countries.forEach(country => {
                if (country.name.toLowerCase().includes(input)) {
                    results.push(...country.cities);
                }
            });
        }

        //Display matching results
        if (results.length > 0) {
            resultsContainer.style.display = 'grid';
            results.forEach(item => {
                const card = document.createElement('div');
                card.className = 'recommendation-card';

                card.innerHTML = `
                <h3>${item.name}</h3>
                    <img src="${item.imageUrl}" alt="${item.name}" />
                    <p>${item.description}</p>
                `;

                resultsContainer.appendChild(card);
            });
        } else {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = '<p>No results found for "${input}".</p>';
        }
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        const searchInput = document.getElementById('searchInput');
        const resultsContainer = document.getElementById('results');

        searchInput.value= '';   //Clear the text input
        resultsContainer.innerHTML = '';  //Remove all the result cards
        resultsContainer.style.display = 'none'; //Hide the result panel
    });

   /*  .then(data => {
        console.log("Fetched data:", data);
        // Step 2: Display recommendations (example: citites)
        const resultsContainer = document.getElementById('results');

        data.countries.forEach(country => {
            country.cities.forEach(city => {
                const card = document.createElement('div');
                card.className = 'recommendation-card';

                card.innerHTML = `
                    <h3>${city.name}</h3>
                    <img src="${city.imageUrl}" alt="${city.name}" />
                    <p>${city.description}</p>
                `;

            resultsContainer.appendChild(card);
        });
    });
})
.catch(error => {
    console.error("Error fetching recommendations:", error);
});
 */
