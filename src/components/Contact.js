import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDeatils';

export default class Contact extends React.Component {
    // 생성자가 변경하면 페이지를 리로드해야함
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [
                { name: 'park', phone: '010-0000-0000' },
                { name: 'Byung', phone: '010-0000-0000' },
                { name: 'Hyun', phone: '010-0000-1000' },
                { name: 'kknd', phone: '010-0000-0000' },
                { name: 'cnc', phone: '010-0000-0000' }
            ]
        };
        // method 를 추가하면 constructor에서 반드시 this를 바인딩해줘야한다.
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    // e는 이벤트
    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }
    
    handleClick(key) {
        this.setState({
            selectedKey: key
        });
        console.log(key, 'is selected');
    }

    render() {
        const mapToComponent = (data) => {
            data.sort();
            
            // 검색기능
            data = data.filter(
              (contact) => {
                  return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
              }  
            );

            return data.map((contact2, i) => {
                return (<ContactInfo 
                            contact={contact2}
                            key={i} 
                            onClick={() => this.handleClick(i)}/>);
            });
        };

        return (
            <div>
                <h1>Contact</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponent(this.state.contactData)}</div>
                <ContactDetails 
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}/>
            </div>
        )
    }
};