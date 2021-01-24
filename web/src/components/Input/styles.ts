import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  & + div {
    margin-top: 24px;
  }

  input {
    width: 100%;
    height: 46px;
    /* height: 56px; */
    padding: 16px;

    background: #f3f3f3;
    border: 2px solid #f3f3f3;
    border-radius: 10px;

    &::placeholder {
      color: #aaa4ab;
    }
  }
`;
