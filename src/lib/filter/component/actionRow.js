import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import styled from "styled-components";
const StyledRow = styled(Row)`
  margin-top: 30px;
`;
const StyledButton = styled(Button)`
  min-width: 100px;
  color: #fff !important;
  &:hover{
    color: #fff !important;
  }
`;
const SaveButton = StyledButton.extend`
  background-color: ${props => props.background ? props.background : 'black'} !important;
`;
const CancelButton = StyledButton.extend`
  background-color: ${props => props.background ? props.background : 'black'} !important;
`;
const propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    saveBackground: PropTypes.string,
    cancelBackground:  PropTypes.string,
}

const ActionRow = ({ onSave, onCancel, saveBackground, cancelBackground }) =>
    <StyledRow type="flex" justify="center">
        <Col xxl={3} xl={4} sm={5}>
            <SaveButton background={saveBackground} onClick={onSave}>
                Save
            </SaveButton>
        </Col>
        <Col xxl={3} xl={4} sm={5}>
            <CancelButton background={cancelBackground} onClick={onCancel}>
                Cancel
            </CancelButton>
        </Col>
    </StyledRow>;

ActionRow.propTypes = propTypes;
export default ActionRow;
