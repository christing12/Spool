import React, { Component } from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { taskMap } from './data';
import { borderRadius, grid } from './constants';


// Creates and handles the pop-up window for individual tasks

const ModalBG = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
    position: fixed;
    background: white;
    width: 80%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Show = styled.div`
    display: block;
`;

const Hide = styled.div`
    display: none;
`;

const Content = styled.p`
    padding: 5px;
    padding-left: 40px;
    padding-right: 40px;
`;

const BlockTitle = styled.div`
  font-weight: bold;
  text-align: left;
  margin-bottom: 5px;
  font-size: 18px;
`;

const TasksDescription = styled.div`
    margin-bottom: 10px;
`;
const BlockQuote = styled.div`
    display: inline-block;
    text-align: left;
    font-size: 12px;
    width: 60%;
    align: left;
    vertical-align: top;
`;

const BlockTag = styled.div`
    display: inline-block;
    text-align: left;
    font-size: 12px;
    width: 15%;
    vertical-align: top;
`;

const Tag = styled.small`
    color: ${props => props.colors.hard};
    flex-grow: 0;
    margin: 0;
    background-color: ${props => props.colors.soft};
    border-radius: ${borderRadius}px;
    font-weight: normal;
    padding: ${grid / 2}px;
    margin-right: 5px;
`;

export default class TaskModal extends Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }
    componentDidUpdate() {
    }

    handleClick(event) {
        if (this.modalRef.current != null && this.props.show && !this.modalRef.current.contains(event.target)) {
            this.props.handleClose();
        }
    }

    render() {
        const show = this.props.show;
        const task = this.props.task;
        return (
            <React.Fragment>
                    {
                        show ?
                        (<Show>
                            <ModalBG>
                                <Modal ref={this.modalRef}>

                                    <Content>
                                        <BlockTitle>{task.taskName}</BlockTitle>
                                        <TasksDescription>
                                            <BlockTag>Content</BlockTag>
                                            <BlockQuote>{task.content}</BlockQuote>
                                        </TasksDescription>
                                        <TasksDescription>
                                            <BlockTag>Status</BlockTag>
                                            <BlockQuote>{task.category}</BlockQuote>
                                        </TasksDescription>
                                        <TasksDescription>
                                            <BlockTag>Assignees</BlockTag>
                                            <BlockQuote>
                                            {task.assignees.reduce((previous, assignee) => (
                                                previous + ", " + assignee
                                            ))}
                                            </BlockQuote>
                                        </TasksDescription>
                                        <TasksDescription>
                                            <BlockTag>Tags</BlockTag>
                                            <BlockQuote>
                                            {task.tags.map((item, index) => (
                                                <Tag colors={task.colors}>{item}</Tag>
                                            ))}
                                            </BlockQuote>
                                        </TasksDescription>
                                    </Content>
                                </Modal>
                            </ModalBG>
                        </Show>)
                        :
                        (<Hide> </Hide>)
                    }
            </React.Fragment>
        );
    }
}