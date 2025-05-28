export default function TitleCard() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="title-card max-w-4xl mx-auto px-8">
        {/* Main Title in classic Evangelion style */}
        <div className="eva-title-card text-5xl md:text-7xl mb-4">
          RAPHAEL BOULLAY--LE FUR
        </div>
        
        {/* Subtitle in Helvetica, compressed and properly centered */}
        <div className="font-helvetica text-nerv-light text-sm md:text-base text-center tracking-widest mb-3 eva-compressed-center">
          COMPUTER SCIENCE STUDENT - UNIVERSITY OF BORDEAUX
        </div>
        
        {/* Additional flavor text in true Evangelion style */}
        <div className="eva-flash-text text-xs md:text-sm mb-3 mx-auto max-w-lg">
          MOBILE & WEB DEVELOPMENT PORTFOLIO
        </div>
        
        {/* Bottom text with brackets */}
        <div className="eva-brackets nerv-ui text-xs text-nerv-red text-center opacity-75">
          INITIALIZING DEVELOPER PROFILE SYSTEM
        </div>
      </div>
    </div>
  )
}