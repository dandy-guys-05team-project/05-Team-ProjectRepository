# TrendKor React Application

This project was converted from HTML to React and contains the TrendKor landing page with Korean trend analysis features.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Navigate to the React project directory:
```bash
cd "/Volumes/Passport 3/공부/대학교 프로그래밍/충북대학교/3학년 2학기/오픈소스개발프로젝트/TrendKor/Source Codes/React"
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

## Building for Production

To create a production build:

```bash
npm run build
```

This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Project Structure

```
React/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── HeroSection.js  # Hero section with video
│   │   ├── WhyUsSection.js # Why us section
│   │   ├── OurPeopleSection.js # Team section
│   │   ├── NewsSection.js  # News section
│   │   └── Footer.js       # Footer component
│   ├── utils/
│   │   └── smoothScroll.js # Smooth scrolling utility
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## Key Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Scrolling**: Implemented using Lenis for smooth scroll experience
- **Video Background**: Hero section with autoplay video background
- **Modern UI**: Clean and modern user interface
- **Component-Based**: Modular React components for easy maintenance

## Important Notes

### Video Setup

The application expects a video file at `/public/videos/LandingPageVideo.mp4`. Make sure to:

1. Create the videos directory in the public folder:
```bash
mkdir -p public/videos
```

2. Copy your video file:
```bash
cp "../../src/Resources/LandingPageVideo.mp4" public/videos/
```

### CSS Variables

The application uses CSS variables defined in `src/index.css`. Key variables include:
- `--primary-700`: Main brand color (#7a081d)
- `--text--invert`: Inverted text color (white)
- `--text--secondary`: Secondary text color
- `--typography--body`: Body font family

## Customization

### Changing Content

Edit the respective component files in `src/components/` to modify content:
- Hero text: `HeroSection.js`
- Navigation links: `Navbar.js`
- Footer content: `Footer.js`

### Styling

Each component has its own CSS file. Modify these files to change the appearance:
- Component-specific styles: `src/components/*.css`
- Global styles: `src/index.css`
- App layout: `src/App.css`

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

Key dependencies include:
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `gsap`: ^3.13.0 (for animations)
- `@studio-freight/lenis`: ^1.0.42 (for smooth scrolling)

## Troubleshooting

### Video not playing
- Ensure the video file path is correct
- Check browser autoplay policies (video is muted by default to allow autoplay)
- Verify the video file format is supported (MP4 recommended)

### Styles not loading
- Clear browser cache
- Ensure all CSS files are properly imported
- Check for console errors

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is compatible

## Learn More

To learn more about the technologies used:

- [React documentation](https://reactjs.org/)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [GSAP documentation](https://greensock.com/docs/)
- [Lenis smooth scroll](https://github.com/studio-freight/lenis)

## License

This project is part of the TrendKor platform.
