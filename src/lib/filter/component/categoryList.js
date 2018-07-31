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
  max-height: ${props => (props.collapse ? "20px" : "1500px")};
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

const CategoryList = ({ data, selectCategory, collapse, ...props }) =>
  <CategoryRow collapse={collapse}>

      <CheckboxGroup onChange={selectCategory}>
          <Row>
              {data.map((d, index) => {
                  return (
                      <Col xl={3} sm={5} key={d.id}>
                          <Checkbox value={d} >
                              {d.name}
                          </Checkbox>
                      </Col>
                  );
              })}
          </Row>
      </CheckboxGroup>
      <ActionRow {...props}/>
  </CategoryRow>;

CategoryList.propType = propTypes;

export default CategoryList;
