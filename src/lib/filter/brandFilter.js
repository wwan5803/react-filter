import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Col } from "antd";
import ShowMore from './component/showMore';
import BrandList from './component/brandList';
import AlphabetList from './component/alphabet';

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
                    <AlphabetList selectAlphabet={selectAlphabet}/>
                </Col>
                <Col xl={3} lg={5}>
                    <ShowMore onClick={this.showMore}/>
                </Col>
            </Row>
            <Row>
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 14, offset: 5 }}>
                    <BrandList data={data}
                               selectBrand={selectBrand}
                               collapse={this.state.collapse}
                               onSave={saveBrand}
                               onCancel={this.cancel}
                               {...this.props}/>
                </Col>
            </Row>
        </div>
    }
}

BrandFilter.propTypes = propTypes;

export default BrandFilter;