import React from 'react';

export default class ContactInfo extends React.Component {
    render() {
        return (
            // this.props.onClick를 설정해줘야 클릭 이벤트가 전달된다. onClick이벤트가 props로 전달된다. 
            <div onClick={this.props.onClick}>{this.props.contact.name}</div>
        );
    }
}