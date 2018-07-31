import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from "antd";
import styled from 'styled-components';
import ShowMore from './component/showMore';
import CategoryList from './component/categoryList';
const StyledRow = styled(Row)`
    border-bottom: 1px dashed #f5f5f5;
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

const propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectCategory: PropTypes.func.isRequired,
    saveCategory: PropTypes.func.isRequired,
    label: PropTypes.string,
    saveBackground: PropTypes.string,
    cancelBackground:  PropTypes.string,
}

class CategoryFilter extends Component{
    constructor(props){
        super(props);
        this.state={
            collapse: true
        }
    }
    showMore = () => {
        this.setState(prevState => ({collapse:!prevState.collapse}))
    }
    cancel = () => {
        this.setState(prevState => ({collapse: true}))
    }
    render() {
        const {label, saveCategory} = this.props;
        return <StyledRow>
                <Col xl={3} lg={5}>
                    {label}
                </Col>
                <Col xl={18} lg={14}>
                    <CategoryList collapse={this.state.collapse}
                                  onSave={saveCategory}
                                  onCancel={this.cancel}
                                  {...this.props}/>
                </Col>
                <Col xl={3} lg={5}>
                    <ShowMore onClick={this.showMore}/>
                </Col>
            </StyledRow>
    }
}

CategoryFilter.propTypes = propTypes;

export default CategoryFilter;