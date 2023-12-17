import React, {useEffect, useState} from "react";
import BookDataService from "../services/book.service";
import {Col, Container, Modal, Row} from "reactstrap";
import Book from "./book";
import "../components/Modal/Modal.css";
import Loader from "../components/Loader/Loader";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setCurrentIndex(-1);
        setCurrentBook(null);
        setShow(false);
    }
    const handleShow = (book, index) => {
        setShow(true);
        setCurrentIndex(index);
        setCurrentBook(book);
    }

    const searchQuery = (e) => {
        setPageCount(1);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [pageCount]);

    const fetchData = () => {
        setLoading(true);
        let q = query ? query : "harry potter";
        fetch("http://openlibrary.org/search.json?q=" + q + "&limit=10&page=" + pageCount)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                data.numFound ? setData(data) : setData(null);
                setLoading(false);
            });
    };

    const prevClick = () => {
        setPageCount((prev) => prev - 1);
    };

    const nextClick = () => {
        setPageCount((prev) => prev + 1);
    };

    const refreshList = (book, index) => {
        setCurrentBook(null);
        setCurrentIndex(-1);
    }

    const saveBook = (book) => {
        console.log(book)
        let data = {
            title: book.title,
            author: JSON.stringify(book.author_name),
            description: book.first_sentence,
            thumbnail: book.cover_i
        };

        BookDataService.create(data)
            .then(() => {
                console.log("Created new item successfully!");
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const newBook = () => {
        setTitle("");
        setDescription("");
        setSubmitted(false);
        setQuery([]);
    }

    return (
        <Container>
            <Col>
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <button className="btn btn-success" onClick={() => newBook}>
                                Add
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Row>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Search by name or author"
                                        className="form-control"
                                        id="title"
                                        required
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        name="title"
                                    />
                                </div>

                                <button className="btn btn-success" onClick={searchQuery}>
                                    Search
                                </button>

                            </Row>
                        </div>
                    )}
                </div>
            </Col>
            <Row xs={1} md={4} className="d-flex g-4">
                {data && data.docs.map((book, index) => (
                    <Col className="d-flex gap-2">

                        <Card style={{width: '18rem'}} onClick={() => handleShow(book)}>

                            <Card.Img variant="top" src={book.cover_i
                                ? "https://covers.openlibrary.org/b/id/" + book.cover_i + "-L.jpg"
                                : "https://dummyimage.com/180x190/dedede/3b3b3b&text=Image+Not+Available"}
                            />

                            <Card.Body>
                                <Card.Title>{book.title} - {book.author_name && book.author_name.map((d) => `${d}, `)}

                                </Card.Title>
                                <Card.Text>
                                    {book.description}
                                </Card.Text>
                                <button onClick={() => saveBook(book)} className="btn btn-success">
                                    Add To List
                                </button>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}
                {data && (
                    <div className="btn-box">
                        <button
                            type="button"
                            className="btn"
                            onClick={prevClick}
                            disabled={pageCount <= 1}
                        >
                            Prev
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={nextClick}
                            disabled={pageCount >= data.numFound / 10}
                        >
                            Next
                        </button>
                    </div>
                )}

                <Loader state={loading}/>
            </Row>

            {currentBook &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentBook.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{currentBook.first_sentence}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

        </Container>
    );

}
export default AddBook;