function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#searchFormInput');
  let cityElement = document.querySelector('#city');
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector('#search_form');
searchFormElement.addEventListener('submit', handleSearchSubmit);
