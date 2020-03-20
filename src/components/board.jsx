import React, {Component} from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { colors } from '@atlaskit/theme';
import Column from './column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import reorder, { reorderQuoteMap } from './reorder';

const ParentContainer = styled.div`
    height: ${({ height }) => height};
    overflow-x: hidden;
    overflow-y: auto;
`;

const Container = styled.div`
  background-color: ${colors.B100};
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

const Dragger = styled(DragDropContext)`
  background-color: colors.N30;
`;



export default class Board extends Component {
    static defaultProps = {
        isCombineEnabled: false,
    };

    //columns: 3 js objects in js array, category is the keys for each object.
    constructor(props) {
        super(props);
        this.state = {
            columns: this.props.initial,
            ordered: Object.keys(this.props.initial),
        }
    };

    onDragEnd = result => {
        if (result.combine) {
            if (result.type === "COLUMN") {
                const shallow = [...this.state.ordered];
                shallow.splice(result.source.index, 1);
                this.setState({
                    ordered: shallow
                });
                return;
            }
            const column = this.state.columns[result.source.droppableId];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const columns = { 
                ...this.state.columns,
                [result.source.droppableId]: withQuoteRemoved,
            };
            this.setState({
                columns
            });
            return;
        }

        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        if (result.type === 'COLUMN') {
            const ordered = reorder(
                this.state.ordered,
                source.index,
                destination.index,
            );
            this.setState({
                ordered,
            });
            return;
        }

        const data = reorderQuoteMap({
            quoteMap: this.state.columns,
            source,
            destination,
        });

        this.setState({
            columns: data.quoteMap,
        });
    };

    render() {
        const columns = this.state.columns;
        const ordered = this.state.ordered;
        const {
            containerHeight,
            useClone,
            isCombineEnabled,
            withScrollableColumns,
        } = this.props;

        const board = (
            <Droppable
                droppableId="board"
                type="COLUMN"
                direction="horizontal"
                ignoreContainerClipping={containerHeight}
                isCombineEnabled={isCombineEnabled}
            >
                {(provided) => (
                    <Container ref={provided.innerRef} {...provided.droppableProps}>
                        {ordered.map((key, index) => (
                            <Column
                                key={key}
                                index={index}
                                title={key}
                                info={columns[key]}
                                quotes={columns[key]}
                                isScrollable={withScrollableColumns}
                                isCombineEnabled={isCombineEnabled}
                                useClone={useClone}

                                tasks={columns[key]}
                            />
                        ))}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        );

        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {containerHeight ? (
                        <ParentContainer height={containerHeight}>{board}</ParentContainer>
                    ) : (
                        board
                    )}
                </DragDropContext>
                <Global
                    styles={css`
                        body{
                            background-color: #fff;
                        }
                    `}
                />
            </React.Fragment>
        );
    }
}