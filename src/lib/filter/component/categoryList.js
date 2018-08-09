import React from "react";
import PropTypes from 'prop-types';
import { Row, Col, Checkbox } from "antd";
import styled from "styled-components";
import ActionRow from './actionRow';
const CheckboxGroup = Checkbox.Group;
const CategoryRow = styled.div.attrs({
    width: props => props.width || "500px"
})`
  transition: max-height 300ms ease-in-out;
  // width: ${props => props.width};
  overflow: hidden;
  max-height: ${props => (props.collapse ? "30px" : "1500px")};
`;
const StyledCol = styled.span`
  margin-right: 20px;
`;
const propTypes = {
    data: PropTypes.array.isRequired,
    selectCategory: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    collapse: PropTypes.bool.isRequired,
    saveBackground: PropTypes.string,
    cancelBackground:  PropTypes.string,
}

const CategoryList = ({ data, selectCategory, collapse, pickedCategoryIds, ...props }) =>
    <CategoryRow collapse={collapse}>

        <CheckboxGroup style={{lineHeight: '30px'}} value={pickedCategoryIds} onChange={selectCategory}>
            {data.map((d, index) => {
                return (
                    <StyledCol key={d.id}>
                        <Checkbox value={d.id} >
                            {d.name}
                        </Checkbox>
                    </StyledCol>
                );
            })}
        </CheckboxGroup>
        <ActionRow {...props}/>
    </CategoryRow>;

CategoryList.propType = propTypes;

export default CategoryList;
