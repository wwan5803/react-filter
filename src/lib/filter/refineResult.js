import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from "antd";
import styled from 'styled-components';
const StyledRow = styled(Row)`
    padding-bottom: 10px;
    margin-bottom: 10px;
`;
const StyledCol = styled(Col)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    cursor: pointer;
`;

const propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    brands: PropTypes.arrayOf(PropTypes.string).isRequired,
    removeFilter: PropTypes.func.isRequired,
    label: PropTypes.string,
    categoryLabel: PropTypes.string,
    brandLabel: PropTypes.string,
    dateLabel: PropTypes.string,
}

class RefineResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMoreCategories: false,
            showMoreBrands: false,
            showMoreDate: false
        }
    }

    render() {
        const {label, categoryLabel, brandLabel,
            dateLabel, categories, brands, date, removeFilter, children} = this.props;
        return <StyledRow gutter={16}>
            <Col xl={2} lg={3}>
                {label}
            </Col>
            {categories[0] &&
                <Col xl={3} lg={4}>
                    <FilterDetails onMouseOver={() => this.setState({showMoreCategories: true})}
                                   onMouseLeave={() => this.setState({showMoreCategories: false})}>
                        <Row>
                            <StyledCol xl={18} lg={18}>
                                {categoryLabel}: {categories[0]}...
                            </StyledCol>
                            <Col xl={{ span: 2, offset: 4 }} lg={{ span: 2, offset: 4 }}>
                                <RemoveSpan onClick={() => removeFilter('CATEGORY')}>X</RemoveSpan>
                            </Col>
                        </Row>
                    </FilterDetails>

                    {
                        this.state.showMoreCategories &&
                        <FloatContent>
                            {categories.map((d, index) => <ResultsSpan key={index}>{d},</ResultsSpan>)}
                        </FloatContent>
                    }
                </Col>
            }
            {brands[0] &&
            <Col xl={3} lg={4}>

                <FilterDetails onMouseOver={() => this.setState({showMoreBrands: true})}
                               onMouseLeave={() => this.setState({showMoreBrands: false})}>
                    <Row>
                        <StyledCol xl={18} lg={18}>
                            {brandLabel}: {brands[0]}...
                        </StyledCol>
                        <Col xl={{ span: 2, offset: 4 }} lg={{ span: 2, offset: 4 }}>
                            <RemoveSpan onClick={() => removeFilter('BRAND')}>X</RemoveSpan>
                        </Col>
                    </Row>
                </FilterDetails>

                {
                    this.state.showMoreBrands &&
                    <FloatContent>
                        {brands.map((d, index) => <ResultsSpan key={index}>{d},</ResultsSpan>)}
                    </FloatContent>
                }
            </Col>
            }
            {date &&
            <Col xl={3} lg={4}>

                <FilterDetails onMouseOver={() => this.setState({showMoreDate: true})}
                               onMouseLeave={() => this.setState({showMoreDate: false})}>
                    <Row>
                        <StyledCol xl={18} lg={18}>
                            {dateLabel}: {date}
                        </StyledCol>
                        <Col xl={{ span: 2, offset: 4 }} lg={{ span: 2, offset: 4 }}>
                            <RemoveSpan onClick={() => removeFilter('DATE')}>X</RemoveSpan>
                        </Col>
                    </Row>
                </FilterDetails>

                {
                    this.state.showMoreDate &&
                    <FloatContent>
                        <ResultsSpan>{date}</ResultsSpan>
                    </FloatContent>
                }
            </Col>
            }
            {children}
        </StyledRow>
    }
}

RefineResult.propTypes = propTypes;
export default RefineResult;