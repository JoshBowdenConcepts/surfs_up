import React from 'react';
import styled from 'styled-components'
import './App.css';

import Header from './Header'
import Location from './Location'

const AppComponent = styled.div`
  min-height: 100vh;

  /* UI Gradients:  https://uigradients.com/#Reef */
  background: #00d2ff;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #3a7bd5, #00d2ff);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #3a7bd5, #00d2ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  .locations {
    display: flex;
    justify-content: center;
    padding: 0px 10px;
  }
`

const App: React.FC = () => {
  return (
    <AppComponent>
      <Header />
      <div className="locations">
        <Location name="Nahant, MA" spotId={1091} />
        <Location name="Deveraux Beach" spotId={4792} />
      </div>
    </AppComponent>
  );
}

export default App;