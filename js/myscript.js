const searchBook = () => {

    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;

    // clear search field
    searchField.value = '';

    // hide error message
    document.getElementById('error-message').style.display = 'none';

    if (searchText === '') {
        alert('Search field is empty!');
    }
    else {
        // clear previous results
        const previousResults = document.getElementById('display-books');
        previousResults.textContent = '';

        // hide search info
        document.getElementById('search-info').style.display = 'none';

        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.docs))
            .catch(error => displayError(1, error));
    }

}

// display error message
const displayError = (err_num, err = '') => {
    const errorElement = document.getElementById('error-message');
    if (err_num === 1) {
        errorElement.innerText = 'Something went wrong';
    }
    else {
        errorElement.innerText = 'No result found';
    }
    errorElement.style.display = 'block';
}

// display books
const displayData = (books) => {

    const totalSearchResult = books.length;
    if (totalSearchResult === 0) {
        displayError(2);
    }
    else {

        // count the number of books displayed
        let resultsDisplayed = 0;

        books.slice(0, 30).forEach(book => {

            resultsDisplayed++;

            const title = book.title; // type: string 
            const author_name = book.author_name; // type: array
            const first_publish_year = book.first_publish_year; // type: number
            const publisher = book.publisher; // type: array
            const cover_i = book.cover_i; // type: number

            // set imgage url based on cover_i value
            let img_url;
            if (cover_i === undefined) {
                img_url = "images/avatar_book-sm.png";
            }
            else {
                img_url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
            }

            const displayBooks = document.getElementById('display-books');
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <div class="row g-0">
                    <div class="col-md-4 p-3">
                        <img src=${img_url} class="img-fluid rounded-start rounded-end" alt="image of a book">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title  mb-3 fs-3">${title}</h5>
                            `+ `
                            ${author_name ? `<p class="card-text mb-4">by ${author_name.join(', ')}</p>` : ``}
                            `+ `
                            ${first_publish_year ? `<p class="card-text"><small class="text-muted">First published in ${first_publish_year}</small></p>` : ``}
                            `+ `
                            ${publisher ? `<p class="card-text">Publisher: ${publisher[0]} <a title="see all publishers" class="text-decoration-none" href="#">&nbsp;&nbsp;>></a></p>` : ``}
                            `+ `
                        </div>
                    </div>
                </div>
            </div>
        `;
            displayBooks.appendChild(div);
        })

        //toggle search info and update the values
        document.getElementById('search-info').style.display = 'block';
        const totalResult = document.getElementById('total-result-found');
        totalResult.innerText = totalSearchResult;
        const totalResultDisplayed = document.getElementById('displaying-result');
        totalResultDisplayed.innerText = resultsDisplayed;
    }
}