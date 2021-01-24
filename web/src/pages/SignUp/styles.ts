import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: linear-gradient(
      64.28deg,
      #ff283d 0.01%,
      rgba(235, 150, 136, 0) 76.8%
    ),
    linear-gradient(
      232.07deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0.2) 0%,
      #ffffff 0.01%,
      rgba(246, 135, 99, 0) 66.59%
    ),
    linear-gradient(182.45deg, #f7c2a3 2.05%, rgba(251, 196, 173, 0) 98%),
    linear-gradient(108.1deg, #e55d87 0.66%, #ff9f4d 97.43%);

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 448px;

    width: 100%;
    height: 100%;
    padding: 40px 24px;
    border-radius: 20px;
    background: #ffffff;

    img {
      height: 40px;
      margin-bottom: 64px;
    }
  }
`;
