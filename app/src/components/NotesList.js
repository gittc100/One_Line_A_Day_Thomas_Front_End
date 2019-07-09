import React, { Fragment, Component } from "react";

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredNotes: []
      // markdown: "regular"
    };
  }

  searchPostsHandler = e => {
    const filteredNotes = this.props.notes.filter(note => {
      if (note.title.includes(e.target.value)) {
        return note;
      }
    });
    this.setState({ ...this.state, filteredNotes: filteredNotes });
  };

  render() {
    // console.log("rendering NotesList component");
    if (this.props.userId === 0) {
      localStorage.removeItem("jwt");
      return <h4>Login</h4>;
    }
    if (this.props.isFetching) {
      return <h4>Loading items...</h4>;
    }
    return (
      <>
        <h2>Entries</h2>
        <div className="entries-container">test
          
        </div>
      </>
    );
  }
}

export default NotesList;
