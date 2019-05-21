import React from 'react';

const MainFooter = () => {
  return (
    <footer>
      <p className="action-buttons">
        <button type="submit" id="test" className="btn btn-submit">Test</button>
        <button type="submit" id="replace" className="btn btn-submit">Replace</button>
        <button type="submit" id="reset" title="Clear all settings for" className="btn btn-right btn-reset">Reset</button>
        <a href="#" id="help" className="btn btn-icon btn-right btn-help" title="Help"><span className="sr-only">Help</span></a>
        <a href="#" id="settings" className="btn btn-icon btn-right btn-settings" title="Settings"><span className="sr-only">Settings</span></a>
      </p>
    </footer>
  );
};

export default MainFooter;
