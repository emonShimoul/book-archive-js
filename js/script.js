// function to load data from API
const loadData = async (searchText) => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayResult(data);
}