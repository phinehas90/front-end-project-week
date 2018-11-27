import React from 'react';
import axios from 'axios';



class EditNote extends React.Component {
    state = {
            note: [],
            title: '',
            textBody: '',
        }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitNote = e => {
        this.props.editNote(e, this.state.note._id, this.state);
        this.setState({ title: "", textBody: "" });
        this.props.history.push("/");
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchNote(id)
    }
    
    fetchNote = id => {
        axios
        .get(`https://fe-notes.herokuapp.com/note/get/${id}`)
        .then(response => this.setState({ note: response.data }))
        .catch(response => console.log(response));
    }
    
    
    render() {
        return (
            <div>
                <div>
                    <h3>Edit Note:</h3>
                </div>
                <div>
                <form onSubmit={this.submitNote}>
                    <textarea                         
                        name="title"
                        size='80'
                        value={this.state.title}
                        onChange={this.changeHandler}
                        type="text"
                        placeholder={this.state.note.title}
                    />
                    <br/>
                    <textarea
                        contentEditable='true'            
                        name="textBody"
                        cols='80'
                        rows='30'
                        value={this.state.textBody}
                        onChange={this.changeHandler}
                        type="text"
                        placeholder={this.state.note.textBody}
                    />
                    <br/>
                    <button>Update</button>
                </form>
                </div>
            </div>
        );
    }
}

export default EditNote;