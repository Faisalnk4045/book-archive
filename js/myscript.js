const searchBook = () => {
    // console.log(123);
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.docs))
}
const displayData = (books) => {
    const totalSearchResult = books.length;
    console.log(totalSearchResult);
    let BooksDisplayed = 0;
    books.slice(0, 20).forEach(book => {
        BooksDisplayed++;

        const title = book.title;
        const publisher = book.publisher;
        const first_publish_year = book.first_publish_year;
        const author_name = book.author_name;

        console.log(book);
        console.log("title: ", title);

        if (publisher === undefined) {
            console.log('publisher_not_found');
        }
        else {
            console.log("publisher: ", publisher);
        }

        if (first_publish_year === undefined) {
            console.log('first_publish_year_not_found');
        }
        else {
            console.log("first_publish_year: ", first_publish_year);
        }

        console.log("author_name: ", author_name);
        if (author_name === undefined) {
            console.log('author_name_not_found');
        }
        else {
            author_name.forEach(author => {
                console.log(author);
            })
        }
        console.log(' ');
    })
    console.log(BooksDisplayed);
}


/* // declare variable based on the name of an object property
const myObject = { x: 2, y: 50, z: 600, a: 25, b: 68 };
const { x, b } = myObject;
// console.log('myObject.p', myObject?.p?.q);

// destructuring array
const [p, q] = [45, 37, 91, 86];
// console.log(p, q);

const [best, faltu] = ['momotaj', 'poroshi'];
// console.log(best, faltu);
const { sky, color, money } = { sky: 'blue', soil: 'matti', color: 'red', money: 500 };

//chaining

const company = {
    name: 'GP',
    ceo: { id: 1, name: 'ajmol', food: 'fuchka' },
    web: {
        work: 'website development',
        employee: 22,
        framework: 'react',
        tech: {
            first: 'html',
            second: 'css',
            third: 'js'
        }
    },
};

console.log(company?.web?.tech?.third);
console.log(company?.web?.tech?.third);
// console.log(company?.backend?.tech.third);
if ((company.backend?.tech.third) == undefined) {
    console.log('undef');
}
else {
    console.log('ok');
} */
/* const array = [10,20,30,40,50,60];
const ary = array.slice(0,7);
console.log(ary); */