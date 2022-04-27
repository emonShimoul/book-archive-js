// function to load data from API
const loadData = async (searchText) => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayResult(data);
}
// click handler
document.getElementById('search-btn').addEventListener('click', () => {
    const searchBox = document.getElementById('search-box');
    const inputValue = searchBox.value;
    searchBox.value = '';
    loadData(inputValue);

});
// function to display total result number.
const totalBookNumber = (data) => {
    const showTotalResult = document.getElementById('show-message');
    showTotalResult.textContent = '';
    const h2 = document.createElement('h2');
    h2.classList.add('text-white', 'text-center', 'mb-3', 'mt-3', 'fw-bold');
    if (data.numFound !== 0 && data.q !== "") {
        h2.innerText = `Total ${data.numFound} result found for ${data.q} !!`;
        showTotalResult.appendChild(h2);
    }
}
// function to display error message.
const errorMessage = (data) => {
    const showError = document.getElementById('show-error');
    showError.textContent = '';
    const h2 = document.createElement('h2');
    h2.classList.add('text-white', 'text-center', 'mb-3', 'mt-5', 'fw-bold')
    if (data.numFound === 0 && data.q === "") {
        h2.innerText = `Please Enter Something in the Field !!`;
        showError.appendChild(h2);
    }
    else if (data.numFound === 0 && data.q !== "") {
        h2.innerText = `Your Searching Result is not Found. Please Try Again !!`;
        showError.appendChild(h2);
    }
}
// function to display first 21 results.
const displayResult = (data) => {
    const displayData = document.getElementById('display-data');
    totalBookNumber(data);
    errorMessage(data);
    displayData.textContent = '';
    const data20 = data.docs.slice(0, 21);
    data20.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col-md-4', 'card', 'p-4', 'my-3', 'mx-auto', 'bg-info', 'text-white');
        div.style.width = "22rem";
        div.innerHTML = `
            <p class="card-text fw-bold"><span class="fw-bold text-dark">Title:</span> ${element.title}</p>
            <p class="card-text fw-bold"><span class="fw-bold text-dark">Author:</span> ${element.author_name?.[0]}</p>
            <p class="card-text fw-bold"><span class="fw-bold text-dark">Publisher:</span> ${element.publisher?.[0]}</p>
            <p class="card-text fw-bold"><span class="fw-bold text-dark">1st Publish Year:</span> ${element.first_publish_year}</p>
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" height="300px" width="200px" class="mx-auto">
        `;
        displayData.appendChild(div);
    });
}