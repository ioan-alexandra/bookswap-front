import React, {Component} from "react";
import BookDataService from "../services/book.service";

import {Button, TextField, withStyles} from "@material-ui/core"
import {styles} from "./css-common"

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveBook = this.saveBook.bind(this);
        this.newBook = this.newBook.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    saveBook() {
        let data = {
            title: this.state.title,
            description: this.state.description
        };

        BookDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newBook() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,

            submitted: false
        });
    }

    render() {
        const {classes} = this.props

        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newBook}>
                            Add
                        </Button>
                    </div>
                ) : (
                    <div className={classes.form}>
                        <div className={classes.textField}>
                            <TextField
                                label="Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                required
                            />
                        </div>

                        {/*<div className={classes.textField}>*/}
                        {/*    <TextField*/}
                        {/*        label="Description"*/}
                        {/*        name="description"*/}
                        {/*        value={this.state.description}*/}
                        {/*        onChange={this.onChangeDescription}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.saveBook}>
                            Search
                        </Button>
                        <br/> <br/>

                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.saveBook}>
                            Save
                        </Button>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddBook)