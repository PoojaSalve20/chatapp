import React, {Component, component} from 'react' 
import { Form, icon, Input, Button, Row, Col, } from 'antd'
import { AiOutlineEnter } from "react-icons/ai";
import io from 'socket.io-client'
import { connect } from "react-redux";
import moment from "moment";

export class ChatPage extends Component {
    state= {
       chatMessage: "", 
    }
    componentDidMount(){
        let server = "http://localhost:5000";
        this.socket = io(server);

        this.socket.on("Output Chat Message",messageFromBackend => {
                console.log(messageFromBackend)

        })
    }

    handleSearchChange= (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    submitChatMessage = (e) => {
        e.preventDefault();

        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.userName;
        let userImage = this.props.user.userData.userImage;
        let nowTime = moment();
        let type = "Image"

        this.socket.emit("Input chat Message",{
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        })

        this.setState({chatMessage: ""})
    }

    render() {
        return(
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem',textAlign:'center'}}>Real Time Chat</p>
                </div>

                <div style={{maxWidth:'800px',margin:'0 auto'}}>
                    <div className="infinite-container">
                        {/* {this.props.chats && 
                            (<div>{this.renderCards()} </div>)
                        } */}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{float: "left",clear: "both"}}
                        />   
                    </div>
                    
                    <Row>
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                             <Col span={18}>
                                <Input
                                    id="message"
                                    // prefix={<Icon type="message" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Lets start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.handleSearchChange}
                                />   
                            </Col>
                            <Col span={2}>

                            </Col>
                            <Col span={4}>
                                <Button type="primary" style={{width: '100%'}} onClick={this.submitChatMessage} htmlType="submit">
                                <AiOutlineEnter/>
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state =>{
     return{
         user:state.user
     }
}
export default connect(mapStateToProps)(ChatPage)