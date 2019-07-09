import React from "react";
import { connect } from "react-redux";
import { getNotes, getNotesBySort } from "../actions";
import NotesList from "../components/NotesList";


class JournalView extends React.Component {
  constructor() {
    super();
    this.state = {
      sort: "none"
    };
  }
  componentDidMount() {
    this.props.getNotes(this.props.userId); 
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sort !== prevState.sort) {
      if (this.state.sort === "alphabetically") {
        this.props.getNotesBySort(function(a, b) {
          return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
        });
      } else if (this.state.sort === "none") {
        this.props.getNotes(this.props.userId);
      }
    }
  }

  sortHandler = e => {
    console.log(e.target.value);
    this.setState({ ...this.state, sort: e.target.value });
  };

  render() {
    console.log("running render function");
    
      return (
        <div className="notes-list-wrapper">
          <NotesList {...this.props} sortHandler={this.sortHandler} />
        </div>
      );
    
  }
}

const mapStateToProps = state => ({
  sort: state.sort,
  notes: state.notes,
  isFetching: state.fetching,
  error: state.error,
  userId: state.userID
});

export default connect(
  mapStateToProps,
  { getNotes, getNotesBySort }
)(JournalView);
