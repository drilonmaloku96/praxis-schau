# Praxis Website - Setup Instructions

## How to View Your Website Locally

### Option 1: Python Simple Server (Recommended)
1. Open terminal/command prompt
2. Navigate to your website folder:
   ```bash
   cd /home/drilon/websiteproj
   ```
3. Start the server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to: `http://localhost:8000`

### Option 2: Node.js Live Server (if you have Node.js)
1. Install live-server globally:
   ```bash
   npm install -g live-server
   ```
2. Navigate to your website folder and run:
   ```bash
   live-server
   ```

### Option 3: VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

## How to Make Changes

1. Edit any HTML, CSS, or JS file
2. Save the file
3. Refresh your browser to see the changes
4. The website will automatically update

## Project Structure

```
websiteproj/
├── index.html              (Main page)
├── css/
│   └── style.css           (All styling)
├── js/
│   └── script.js           (Interactive features)
├── pages/
│   ├── kieferorthopadie.html
│   ├── cmd.html
│   ├── osas.html
│   └── kontakt.html
├── images/                 (Put your images here)
└── README.md              (This file)
```

## Easy Customization

### To add more Geschichte und Philosophie sections:
Edit `js/script.js` and add entries to the `contentBlocks` array.

### To change colors:
Edit the color variables at the top of `css/style.css`.

### To add images:
Place images in the `images/` folder and update the HTML file paths.