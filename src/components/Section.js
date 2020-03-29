import React from 'react';

function Section({ children, explanation }) {
  return (
    <section className="app-section">
      <div>
        {children}
      </div>
      <div>
        {explanation}
      </div>
    </section>
  )
}

export default Section;
