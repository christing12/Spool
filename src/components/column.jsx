import React, { Component } from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { grid, borderRadius} from './constants';
import { Draggable } from 'react-beautiful-dnd';
import QuoteList from './primatives/quote-list';
import Title from './primatives/title';

const Container = styled.div`
    margin: ${grid}px;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: $(borderRadius}px;
    border-top-right-radius: ${borderRadius}px;
    background-color: ${( { isDragging } ) => 
        isDragging ? colors.G50 : colors.N30 };
    transition: background-color 0.2s ease;

    $:hover {
        background-color: ${colors.G50};
    }
`;

export default class Column extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tasks = this.props.quotes;

        const title = this.props.title;
        const quotes = this.props.quotes;
        const index = this.props.index;
        return (
            <Draggable draggableId={title} index={index}>
                {(provided, snapshot) => (
                    <Container ref={provided.innerRef} {...provided.draggableProps}>
                        <Header isDragging={snapshot.isDragging}>
                            <Title isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                                {title}
                            </Title>
                        </Header>
                        <QuoteList
                            listId={title}
                            listType="QUOTE"
                            style={{
                                backgroundColor: snapshot.isDragging
                            }}
                            quotes={quotes}
                            internalScroll={this.props.isScrollable}
                            isCombineEnabled={this.props.isCombineEnabled}
                            useClone={this.props.useClone}

                            tasks={tasks}
                        />
                    </Container>
                )}
            </Draggable>
        );
    }
}