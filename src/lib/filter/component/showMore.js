import React, {Fragment} from 'react';
import { Icon  } from 'antd';
import styled from 'styled-components';
const MyLink = styled.a`
  color: grey;
  &:hover {
    text-decoration: none;
    color: grey;
  }
  &:focus {
    text-decoration: none;
    color: grey;
  }
`;
const ShowMore =  ({onClick}) =>
    <MyLink href="#" onClick={(e) => {e.preventDefault(); onClick()}}>
        More<Icon type="down" />
    </MyLink>



export default ShowMore;