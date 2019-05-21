import React from 'react';
import MainHeader from './pureComponents/wrapper/MainHeader';
import MainFooter from './pureComponents/wrapper/MainFooter';

const App: React.FC = () => {
  return (
    <div>
      <MainHeader />
      <MainFooter />
    </div>
  );
}

export default App;
