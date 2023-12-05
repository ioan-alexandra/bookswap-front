import React, {Component} from "react";
import BookDataService from "../services/book.service";

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);

        this.state = {
            currentBook: {
                id: null,
                title: "",
                description: "",
                published: false,
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

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBook: {
                    ...prevState.currentBook,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentBook: {
                ...prevState.currentBook,
                description: description,
            },
        }));
    }

    updatePublished(status) {
        BookDataService.update(this.state.currentBook.id, {
            published: status,
        })
            .then(() => {
                this.setState((prevState) => ({
                    currentBook: {
                        ...prevState.currentBook,
                        published: status,
                    },
                    message: "The status was updated successfully!",
                }));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateBook() {
        const data = {
            title: this.state.currentBook.title,
            description: this.state.currentBook.description,
        };

        BookDataService.update(this.state.currentBook.id, data)
            .then(() => {
                this.setState({
                    message: "The book was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
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

        return (
            <div>
                <h4>Book</h4>
                {currentBook ? (
                    <div className="edit-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentBook.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentBook.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentBook.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentBook.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteBook}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateBook}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
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
