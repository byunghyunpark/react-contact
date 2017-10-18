import React from 'react';

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        };
    }
    
    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input 
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                    />
                </p>
                <button>Create</button>
            </div>
        )
    }
}