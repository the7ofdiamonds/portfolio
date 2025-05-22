import React from 'react';

interface MemberNavigationComponentProps {
  resume: string;
  portfolioElement: string;
}

const MemberNavigationComponent: React.FC<MemberNavigationComponentProps> = ({ resume, portfolioElement }) => {

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      const offsetTopPx = section.getBoundingClientRect().top + window.scrollY;
      const paddingTopPx = 137.5;
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );

      const paddingTopRem = paddingTopPx / 16;
      const paddingTopBackToPx = paddingTopRem * rootFontSize;
      const topPx = offsetTopPx - paddingTopBackToPx;

      window.scrollTo({
        top: topPx,
        behavior: 'smooth',
      });
    }
  };

  const openResumeInNewTab = () => {
    window.open('resume', '_blank');
  };

  return (
    <>
      {resume != null || portfolioElement != null ? (
        <nav className="author-nav">
          {portfolioElement ? (
            <>
              <button onClick={() => scrollToSection('author_intro')} id="founder_button">
                <h3 className="title">intro</h3>
              </button>

              <button
                onClick={() => scrollToSection('seven_tech_portfolio')}
                id="portfolio_button">
                <h3 className="title">PORTFOLIO</h3>
              </button>
            </>
          ) : (
            ''
          )}

          {resume ? (
            <button onClick={openResumeInNewTab}>
              <h3 className="title">RÉSUMÉ</h3>
            </button>
          ) : (
            ''
          )}
        </nav>
      ) : (
        ''
      )}
    </>
  );
}

export default MemberNavigationComponent;
