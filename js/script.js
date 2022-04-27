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