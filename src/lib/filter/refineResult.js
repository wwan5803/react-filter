import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from "antd";
import styled from 'styled-components';
const StyledRow = styled(Row)`
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

const FilterDetails = styled.div`
    border: 1px dashed grey;
    padding: 5px;
`;
const FloatContent = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid #f5f5f5;
    z-index: 2;
`;
const ResultsSpan = styled.span`
    padding: 5px;
`;
const RemoveSpan = styled.span`
    float: right;
    margin-right: 10px;
    cursor: pointer;
    padding: 0 5px;
`;

const propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    removeFilter: PropTypes.func.isRequired,
    label: PropTypes.string,
}

class RefineResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false
        }
    }

    render() {
        const {label, data, removeFilter, children} = this.props;
        return <StyledRow>
            <Col xl={2} lg={3}>
                {label}
            </Col>
            <Col xl={3} lg={4}>
                {data[0] &&
                <FilterDetails onMouseOver={() => this.setState({showMore: true})}
                               onMouseLeave={() => this.setState({showMore: false})}>
                    {data[0]}...
                    <RemoveSpan onClick={removeFilter}>X</RemoveSpan>
                </FilterDetails>
                }
                {
                    this.state.showMore &&
                    <FloatContent>
                        {data.map((d, index) => <ResultsSpan key={index}>{d},</ResultsSpan>)}
                    </FloatContent>
                }
            </Col>
            {children}
        </StyledRow>
    }
}

RefineResult.propTypes = propTypes;
export default RefineResult;