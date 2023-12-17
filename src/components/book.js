import React, {Component} from "react";
import BookDataService from "../services/book.service";
import Card from "react-bootstrap/Card";

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);

        this.state = {
            currentBook: {
                id: null,
                title: "",
                author: "",
                description: "",
                published: false,
                imageURL: ''
            },
            message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {book} = nextProps;
        if (prevState.currentBook.id !== book.id) {
            return {
                currentBook: book,
                message: ""
            };
        }

        return prevState.currentBook;
    }

    componentDidMount() {
        this.setState({
            currentBook: this.props.book,
        });
    }

    deleteBook() {
        BookDataService.delete(this.state.currentBook.id)
            .then(() => {
                this.props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const {currentBook} = this.state;
        console.log(currentBook)
        return (
            <div>
                <h4>Book</h4>
                {currentBook ? (
                    <div className="edit-form">

                        <Card style={{width: '18rem'}}>

                            <Card.Img variant="top" src={currentBook.thumbnail
                                ? "https://covers.openlibrary.org/b/id/" + currentBook.thumbnail + "-L.jpg"
                                : "https://dummyimage.com/180x190/dedede/3b3b3b&text=Image+Not+Available"}
                            />

                            <Card.Body>
                                <Card.Title>{currentBook.title} - {currentBook.author}</Card.Title>
                                <Card.Text>
                                    {currentBook.description}
                                </Card.Text>

                                <button
                                    className="badge badge-danger mr-2"
                                    onClick={this.deleteBook}
                                >
                                    Delete
                                </button>
                                <p>{this.state.message}</p>
                            </Card.Body>
                        </Card>


                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Book...</p>
                    </div>
                )}
            </div>
        );
    }
}
