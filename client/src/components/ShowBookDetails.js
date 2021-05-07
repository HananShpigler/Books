import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { withAlert } from "react-alert";
import moment from "moment";
import axios from "axios";

class showBookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
    };
  }

  componentDidMount() {
    const alert = this.props.alert;
    axios
      .get("http://localhost:5000/api/books/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          book: res.data,
        });
      })
      .catch((err) => {
        alert.error("No book with this id was found");
      });
  }

  onDeleteClick(id) {
    const alert = this.props.alert;
    axios
      .delete("http://localhost:5000/api/books/" + id)
      .then((res) => {
        alert.success("The book has been successfully deleted");
        this.props.history.push("/");
      })
      .catch((err) => {
        alert.error(
          "Could not delete the book, please check the details and try again !"
        );
      });
  }

  render() {
    const book = this.state.book;
    let BookItem = (
      <div>
        <table className="table table-hover table-dark">
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Title</td>
              <td>{book.title}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Author</td>
              <td>{book.author}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>ISBN</td>
              <td>{book.isbn}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Publisher</td>
              <td>{book.publisher}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Published Date</td>
              <td>{moment(book.published_date).format("DD/MM/YYYY")}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Description</td>
              <td>{book.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="ShowBookDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Book List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Book's Record</h1>
              <p className="lead text-center">View Book's Info</p>
              <hr /> <br />
            </div>
          </div>
          <div>{BookItem}</div>

          <div className="row">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-outline-danger btn-lg btn-block"
                onClick={this.onDeleteClick.bind(this, book._id)}
              >
                Delete Book
              </button>
              <br />
            </div>

            <div className="col-md-6">
              <Link
                to={`/edit-book/${book._id}`}
                className="btn btn-outline-info btn-lg btn-block"
              >
                Edit Book
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(showBookDetails);
