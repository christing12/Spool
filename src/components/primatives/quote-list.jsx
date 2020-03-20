import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from './quote-item';
import { grid } from '../constants';
import Title from './title';

export const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
    if (isDraggingOver) return colors.R50;
    if (isDraggingFrom) return colors.T50;
    return colors.N30;
};

const Wrapper = styled.div`
  background-color: ${props =>
    getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const scrollContainerHeight = 250;
const DropZone = styled.div`
    min-height: ${scrollContainerHeight}px;
    padding-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    max-height: ${scrollContainerHeight}px;
`;

const Container = styled.div``;

const InnerQuoteList = React.memo(function InnerQuoteList(props) {
    return props.quotes.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(dragProvided, dragSnapshot) => (
                <TaskItem
                    key={task.id}
                    quote={task}
                    isDragging={dragSnapshot.isDragging}
                    isGroupedOver={dragSnapshot.combineTargetFor}
                    provided={dragProvided}

                    task={task}
                />
            )}
        </Draggable>
    ));
});

function InnerList(props) {
    const { quotes, dropProvided, tasks } = props;
    const title = props.title ? <Title>{props.title}</Title> : null;

    return (
        <Container>
            {title}
            <DropZone ref={dropProvided.innerRef}>
                <InnerQuoteList quotes={quotes} tasks={tasks} />
                {dropProvided.placeholder}
            </DropZone>
        </Container>
    )
}

export default function QuoteList(props) {
    const {
        ignoreContainerClipping,
        internalScroll,
        scrollContainerStyle,
        isDropDisabled,
        isCombineEnabled,
        listId = 'LIST',
        listType,
        style,
        quotes,
        title,
        useClone,
        tasks
    } = props;

    return (
        <Droppable
            droppableId={listId}
            type={listType}
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
            isCombineEnabled={isCombineEnabled}
            renderClone={
                useClone
                    ? (provided, snapshot, descriptor) => (
                        <TaskItem
                            quote={quotes[descriptor.source.index]}
                            provided={provided}
                            isDragging={snapshot.isDragging}
                            isClone

                            task={tasks[descriptor.source.index]}
                        />
                      )
                    : null
            }
        >
            {(dropProvided, dropSnapshot) => (
                <Wrapper
                    style={style}
                    isDraggingOver={dropSnapshot.isDraggingOver}
                    isDropDisabled={isDropDisabled}
                    isDraggingFrom={dropSnapshot.draggingFromThisWith}
                    {...dropProvided.droppableProps}
                >
                    {internalScroll ? (
                        <ScrollContainer style={scrollContainerStyle}>
                            <InnerList
                                quotes={quotes}
                                title={title}
                                dropProvided={dropProvided}

                                task={tasks}
                            />
                        </ScrollContainer>
                    ) : (
                        <InnerList
                            quotes={quotes}
                            title={title}
                            dropProvided={dropProvided}

                            tasks={tasks}
                        />
                    )}
                </Wrapper>
            )}
        </Droppable>
    );
}