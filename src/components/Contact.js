import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDeatils';
// state 안에 있는 배열을 수정하려면? immutability helper 사용 또는 es6 스프레드 문법 사용
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';

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
        
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount() {
        const contactData = localStorage.contactData;

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }
    // localStorage.clear(); 콘솔에 입력하면 스토리지 초기화
    
    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact]})
        });
    }

    handleRemove() {
        if(this.state.selectedKey < 0 ) {
            return;
        }

        this.setState({
            contactData: update(this.state.contactData,
                { $splice: [[this.state.selectedKey, 1]]}
            ),
            selectedKey: -1
        });
    }
    
    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            )
        });
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
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}    
                    onEdit={this.handleEdit} 
                />
                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
};