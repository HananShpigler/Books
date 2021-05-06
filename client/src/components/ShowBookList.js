import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import { withAlert } from "react-alert";

class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const alert = this.props.alert;
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        this.setState({
          books: res.data,
        });
      })
      .catch((err) => {
        alert.error("No books were found in the database");
      });
  }

  render() {
    const books = this.state.books;

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Books List</h2>
            </div>

            <div className="col-md-11">
              <Link
                to="/create-book"
                className="btn btn-outline-warning float-right"
              >
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>

          <div className="list">
            {books.length > 0
              ? books.map((book, index) => <BookCard book={book} key={index} />)
              : "There is no book record !"}
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(ShowBookList);
