import React from "react";
import PropTypes from 'prop-types';
import {Row, Col, Icon, Checkbox} from "antd";
import styled from "styled-components";
import ActionRow from './actionRow';
const BrandRow = styled.div`
  transition: max-height 300ms ease-in-out;
  overflow: hidden;
  max-height: ${props => (props.collapse ? "80px" : "1500px")};
`;

const StyledCheckBox = styled.span`
    cursor: pointer;
    font-size: 10px;
`;

const StyledCol = styled(Col)`
    border: ${props => props.picked ? '1px solid grey' : '1px solid #f5f5f5'};
    padding: 0 20px;
    margin: 15px 20px 0 0;
    text-align: center;
`;

const StyledIcon = styled(Icon)`
    position: absolute;
    right: -1px;
    bottom: -1px;
    font-size: 13px;
`;

const propTypes = {
    data: PropTypes.array.isRequired,
    selectBrand: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    pickedBrands: PropTypes.array.isRequired,
    collapse: PropTypes.bool.isRequired,
    saveBackground: PropTypes.string,
    cancelBackground: PropTypes.string,
}

const BrandList = ({data, selectBrand, collapse, ...props}) =>
    <BrandRow collapse={collapse}>
        <CheckboxSet
            setOptions={data}
            handleChecked={selectBrand}
            {...props}/>
        <ActionRow {...props}/>
    </BrandRow>;


const filter = (pickedBrands, brand) => {
    // console.log('pickedBrands', pickedBrands)
    return pickedBrands && pickedBrands.filter(data=> data.id === brand.id).length > 0
}
const CheckboxSet = (props) => {
    return (
        <Row>
            {props.setOptions.map((option, index) => {
                return (
                    <StyledCol key={option.id} xl={3} sm={5} xs={12} picked={filter(props.pickedBrands, option)}>
                        <div className="brand-name">
                            <input
                                id={option.id}
                                onChange={props.handleChecked}
                                type="checkbox"
                                value={JSON.stringify(option)}/>
                            <label
                                htmlFor={option.id}
                                key={option}>
                                <StyledCheckBox>
                                    <img src="http://via.placeholder.com/100x30" width='100%'/>
                                    <div>{option.name}</div>
                                    {filter(props.pickedBrands, option) && <StyledIcon type="check-square" />}
                                </StyledCheckBox>
                            </label>
                        </div>

                    </StyledCol>
                )
            })}
        </Row>
    );
}

BrandList.propTypes = propTypes
export default BrandList;
