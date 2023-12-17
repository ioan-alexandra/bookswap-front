import React, {Component} from "react";
import BookDataService from "../services/book.service";
import Book from "./book";

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBook = this.setActiveBook.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            books: [],
            currentBook: null,
            currentIndex: -1,
        };

        this.unsubscribe = undefined;
    }

    componentDidMount() {
        this.unsubscribe = BookDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let books = [];

        items.forEach((item) => {
            let id = item.id;
            let data = item.data();
            books.push({
                id: id,
                title: data.title,
                description: data.description,
                published: data.published,
                author: data.author,
                thumbnail: data.thumbnail
            });
        });

        this.setState({
            books: books,
        });
    }

    refreshList() {
        this.setState({
            currentBook: null,
            currentIndex: -1,
        });
    }

    setActiveBook(book, index) {
        this.setState({
            currentBook: book,
            currentIndex: index,
        });
    }

    render() {
        const {books, currentBook, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Books List</h4>

                    <ul className="list-group">
                        {books &&
                            books.map((book, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveBook(book, index)}
                                    key={index}
                                >
                                    {book.title}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentBook ? (
                        <Book
                            book={currentBook}
                            refreshList={this.refreshList}
                        />
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Book...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
