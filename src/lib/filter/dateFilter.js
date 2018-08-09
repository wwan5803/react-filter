import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col, DatePicker } from "antd";
import styled from 'styled-components';
import Moment from 'moment';
const StyledRow = styled(Row)`
    padding-bottom: 10px;
    margin: 10px 0;
`;
const {RangePicker} = DatePicker;
const propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    startDate: PropTypes.string,
    endDate:  PropTypes.string,
}

class DateFilter extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        const {label, onChange, startDate, endDate} = this.props;
        return <StyledRow>
            <Col xl={3} lg={5}>
                {label}
            </Col>
            <Col xl={18} lg={14}>
                <RangePicker value={startDate && endDate ? [Moment(startDate), Moment(endDate)] : []} style={{marginLeft: 5}} onChange={onChange}/>
            </Col>
        </StyledRow>
    }
}

DateFilter.propTypes = propTypes;

export default DateFilter;