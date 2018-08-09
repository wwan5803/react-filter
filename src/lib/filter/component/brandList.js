import React from "react";
import PropTypes from 'prop-types';
import {Row, Col, Icon} from "antd";
import styled from "styled-components";
import ActionRow from './actionRow';
const BrandRow = styled.div`
  transition: max-height 100ms ease-in-out, margin-top 100ms ease-in-out;
  overflow: hidden;
  max-height: ${props => (props.collapse ? "80px" : "1500px")};
  margin-top: ${props => (props.collapse ? "-35px" : 0)};
`;

const StyledCheckBox = styled.span`
    cursor: pointer;
    font-size: 10px;
`;

const StyledCol = styled.div`
    display: inline-block;
    border: ${props => props.picked ? '1px solid grey' : '1px solid #f5f5f5'};
    margin: 15px 20px 0 0;
    text-align: center;
`;

const BrandName = styled.div`
    margin: auto;
    overflow: hidden;
    width: 80px;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const FullName = styled.div`
    margin-top: -30px;
    background-color: white;
    position: absolute;
    padding: 3px;
`;

const StyledIcon = styled(Icon)`
    font-size: 13px;
    float: right;
    margin-right: -1px;
    margin-top: -7px;
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
class CheckboxSet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showFullNameId: undefined
        }
    }
    render(){
        const props = this.props;
        return <div>
            {props.setOptions.map((option, index) => {
                return (
                    <StyledCol onMouseLeave={() => this.setState({showFullNameId: undefined})} key={option.id} picked={filter(props.pickedBrands, option)}>
                        <div className="brand-name">
                            <input
                                id={option.id}
                                onChange={props.handleChecked}
                                type="checkbox"
                                value={JSON.stringify(option)}/>
                            <label
                                style={{marginBottom: -10}}
                                htmlFor={option.id}
                                key={option}>
                                <StyledCheckBox>
                                    <img src={option.logo_url ? option.logo_url : 'http://via.placeholder.com/90x30'} alt="brand" height={30}/>
                                    {
                                        this.state.showFullNameId === option.id && <FullName>
                                            {option.name}
                                        </FullName>
                                    }
                                    <BrandName id={option.id} onMouseOver={(e) => {console.log(e.target.id); this.setState({showFullNameId: Number(e.target.id)})}}>{option.name}</BrandName>
                                    {filter(props.pickedBrands, option) && <StyledIcon type="check-square" />}
                                </StyledCheckBox>
                            </label>
                        </div>

                    </StyledCol>
                )
            })}
        </div>
    }
}


BrandList.propTypes = propTypes
export default BrandList;
