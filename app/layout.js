import './globals.css'
import BottomNavBar from './components/BottomNavBar'
import TopHeader from './components/TopHeader'

export const metadata = {
  title: 'ConnectHub - Social App',
  description: 'Connect, Learn, Grow - Your multi-purpose social platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body className="device-frame-wrapper">
        {/* Mobile Device Frame */}
        <div className="device-frame">
          {/* Device Notch */}
          <div className="device-notch">
            <div className="device-speaker"></div>
            <div className="device-camera"></div>
          </div>

          {/* Device Screen */}
          <div className="device-screen">
            <TopHeader />
            <div className="device-content">
              {children}
            </div>
            <BottomNavBar />
          </div>

          {/* Device Home Indicator */}
          <div className="device-home-indicator"></div>
        </div>
      </body>
    </html>
  )
}
