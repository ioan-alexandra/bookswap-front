import React, {Component} from "react";
import BookDataService from "../services/book.service";
import {Button, Col, Container, Row} from "reactstrap";
import Card from "react-bootstrap/Card";
import request from 'request';

export default class AddBook extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveBook = this.saveBook.bind(this);
        this.newBook = this.newBook.bind(this);
        this.searchBooks = this.searchBooks.bind(this);

        this.state = {
            title: "",
            description: "",
            published: false,

            submitted: false,

            books: []
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });

    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    searchBooks() {
        this.setState({});
        let options = {
            'method': 'GET',
            'url': 'https://openlibrary.org/search.json?q=' + this.state.title,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            this.setState({
                books: JSON.stringify(response.body),
            });
        });
    }

    saveBook() {
        let data = {
            title: this.state.title,
            description: this.state.description,
            published: false
        };

        BookDataService.create(data)
            .then(() => {
                console.log("Created new item successfully!");
                this.setState({
                    submitted: true,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newBook() {
        this.setState({
            title: "",
            description: "",
            published: false,

            submitted: false,
        });
    }

    render() {
        return (
            <Container>
                <Col>
                    {this.state.books.map(book => (
                        <Card style={{width: '18rem'}}>
                            <Card.Header>
                                {book.docs.title}
                            </Card.Header>

                            {/*<Card.Img variant="top" src={book.imageUrl}/>*/}

                            <Card.Body>
                                <center><Card.Title>
                                    <a href={"https://openlibrary.org/" + book.docs.key}>
                                        {book.docs.author_name}</a></Card.Title>
                                    <Button onClick={() => this.saveBook(book)} variant="primary">Save to
                                        list</Button></center>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>

                <Col>
                    <div className="submit-form">
                        {this.state.submitted ? (
                            <div>
                                <h4>You submitted successfully!</h4>
                                <button className="btn btn-success" onClick={this.newBook}>
                                    Add
                                </button>
                            </div>
                        ) : (
                            <div>

                                <Row>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            required
                                            value={this.state.title}
                                            onChange={this.onChangeTitle}
                                            name="title"
                                        />
                                    </div>

                                    {/*<button className="btn btn-success" onClick={this.searchBooks}>*/}
                                    {/*    Add*/}
                                    {/*</button>*/}

                                </Row>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        required
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}
                                        name="description"
                                    />
                                </div>

                                <button onClick={this.saveBook} className="btn btn-success">
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>
                </Col>
            </Container>

        );
    }
}
