import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Col } from "antd";
import ShowMore from './component/showMore';
import BrandList from './component/brandList';
import AlphabetList from './component/alphabet';
const StyledRow = styled(Row)`
    border-bottom: 1px dashed #f5f5f5;
    padding-bottom: 10px;
`;
const propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectBrand: PropTypes.func.isRequired,
    saveBrand: PropTypes.func.isRequired,
    selectAlphabet: PropTypes.func.isRequired,
    pickedBrands: PropTypes.array.isRequired,
    saveBackground: PropTypes.string,
    cancelBackground: PropTypes.string,
    label: PropTypes.string,
}

class BrandFilter extends Component{
    constructor(props){
        super(props);
        this.state={
            collapse: true
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.pickedBrands.length > 0 && nextProps.pickedBrands.length !== this.props.pickedBrands.length){
            this.setState({collapse: false})
        }

        if(nextProps.pickedBrands.length === 0 && nextProps.pickedBrands.length !== this.props.pickedBrands.length){
            this.setState({collapse: true})
        }
    }
    showMore = () => {
        this.setState(prevState => ({collapse:!prevState.collapse}))
    }
    cancel = () => {
        this.setState(prevState => ({collapse: true}))
    }
    render() {
        const {label, data, selectBrand, selectAlphabet, saveBrand} = this.props;
        return <div>
            <Row>
                <Col xl={3} lg={5}>
                    {label}
                </Col>
                <Col xl={18} lg={14}>
                    {
                        !this.state.collapse &&  <AlphabetList selectAlphabet={selectAlphabet}/>
                    }
                </Col>
                <Col xl={3} lg={5}>
                    <ShowMore onClick={this.showMore}/>
                </Col>
            </Row>
            <StyledRow>
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 14, offset: 5 }}>
                    <BrandList data={data}
                               selectBrand={selectBrand}
                               collapse={this.state.collapse}
                               onSave={saveBrand}
                               onCancel={this.cancel}
                               {...this.props}/>
                </Col>
            </StyledRow>
        </div>
    }
}

BrandFilter.propTypes = propTypes;

export default BrandFilter;