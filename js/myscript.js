const searchBook = () => {

    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;

    // clear search field
    searchField.value = '';

    // hide error message
    document.getElementById('perror').style.display = 'none';

    if (searchText === '') {
        alert('Search field is empty!');
    }
    else {
        // clear previous result
        const element = document.getElementById('parent');
        element.textContent = '';

        // hide search info
        document.getElementById('search-info').style.display = 'none';

        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.docs))
            .catch(error => displayError(1, error));
    }

}

const displayError = (err_num, err = '') => {
    const errorElement = document.getElementById('perror');
    if (err_num === 1) {
        errorElement.innerText = 'Something went wrong';
    }
    else {
        errorElement.innerText = 'No result found';
    }
    errorElement.style.display = 'block';
}

const displayData = (books) => {

    // const element = document.getElementById('parent');
    // element.textContent = ''; // clear previous result

    const totalSearchResult = books.length;
    if (totalSearchResult === 0) {
        displayError(2);
    }
    else {
        let resultsDisplayed = 0;

        books.slice(0, 7).forEach(book => {

            resultsDisplayed++;

            const title = book.title; // string
            const author_name = book.author_name; // array
            const first_publish_year = book.first_publish_year; // number
            const publisher = book.publisher; // array
            const cover_i = book.cover_i; // number

            const parent = document.getElementById('parent');
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
            <div class="row g-0">
                <div class="col-md-4 p-3">
                                <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="img-fluid rounded-start rounded-end" alt="image of a book">
                </div>
                 <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title  mb-3 fs-3">${title}</h5>
                        `+ `
                        ${author_name ? `<p class="card-text mb-4">by ${author_name.join(', ')}</p>` : ``}
                        `+ `
                        ${first_publish_year ? `<p class="card-text"><small class="text-muted">First published in ${first_publish_year}</small></p>` : ``}
                        `+ `
                        ${publisher ? `<p class="card-text">Publisher: ${publisher[0]}</p>` : ``}
                        `+ `
                    </div>
                </div>
            </div>
        </div>
        `;
            parent.appendChild(div);
        })
        document.getElementById('search-info').style.display = 'block';
        const totalResult = document.getElementById('total-result-found');
        totalResult.innerText = totalSearchResult;
        const totalResultDisplayed = document.getElementById('displaying-result');
        totalResultDisplayed.innerText = resultsDisplayed;

    }
}