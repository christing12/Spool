import React, { Component } from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { borderRadius, grid } from '../constants';
import TaskModal from '../modal';
import Avatar from 'react-avatar';
const getBackgroundColor = (
    isDragging,
    isGroupedOver,
    authorColors
) => {
    if (isDragging) return authorColors.soft;
    if (isGroupedOver) return colors.N30;
    return colors.N0;
};

const getBorderColor = (isDragging, authorColors) => isDragging ? authorColors.hard : 'transparent';

const imageSize = 40;

const CloneBadge = styled.div`
    background: ${colors.G100};
    bottom: ${grid / 2}px;
    border: 2px solid ${colors.G200};
    border-radius: 50$;
    box-sizing: border-box;
    font-size: 10px;
    position: absolute;
    right: -${imageSize / 3}px;
    top: -${imageSize / 3}px;
    transform: rotate(40deg);

    height: ${imageSize}px;
    width: ${imageSize}px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${props => getBorderColor(props.isDragging, props.colors)};
  background-color: ${props =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${colors.N70}` : 'none'};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: ${colors.N900};

  &:hover,
  &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;


// const Avatar = styled.img`
//     width: ${imageSize}px;
//     height: ${imageSize}px;
//     border-radius: 50$;
//     margin-right: ${grid}px;
//     flex-shrink: 0;
//     flex-grow: 0;
// `;

const Content = styled.div`
    flex-grow: 1;
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
`;

const BlockTitle = styled.div`
  text-align: left;
  font-weight: bold;
`;
const BlockQuote = styled.div`
  text-align: left;
  font-size: 12px;
    $::before {
        content: open-quote;
    }

    $::after { 
        content: close-quote;
    }
    align: left;
`;

const Footer = styled.div`
    display: flex;
    margin-top: ${grid}px;
    align-items: center;
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

const QuoteId = styled.small`
    flex-grow: 1;
    flex-shrink: 1;
    margin: 0;
    font-weight: normal;
    text-overflow: ellipsis;
    text-align: right;
`;

const Ava = styled(Avatar)`
  padding: 5px;
`;

function getStyle(provided, style) {
    if (!style) return provided.draggableProps.style;
    return {
        ...provided.draggableProps.style,
        ...style,
    };
}

export default class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.taskRef = React.createRef();
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
  }
  showModal = () => {
    this.setState({
      show: true
    });
  };

  hideModal = () => {
    this.setState({
      show: false
    });
  };

  handleMouseDown(event) {
    if (this.taskRef.current != null && this.taskRef.current.contains(event.target)) {
    }
  };


  handleMouseUp(event) {
    if (this.taskRef.current != null && this.taskRef.current.contains(event.target)) {
      this.showModal();
    }
  };

  render() {
    const {
      isDragging,
      isGroupedOver,
      provided,
      style,
      isClone,
      index,
      task,
    } = this.props;
    return (
      <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      colors={task.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={task.id}
      data-index={index}


    >
     {/* <Avatar src={task.author.avatarUrl} alt={task.author.name} /> */}
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
      <Content ref={this.taskRef}>
        <BlockTitle>{task.taskName}</BlockTitle>
        <Footer>
          {task.tags.map((item, index) => (
            <Tag colors={task.colors}>{item}</Tag>
          ))}
          {/* <QuoteId>id:{task.id}</QuoteId> */}
        </Footer>
        <TaskModal show={this.state.show}
          handleClose={this.hideModal}
          task={this.props.task}>
        </TaskModal>
      </Content>
    </Container>
    )
  }
}
