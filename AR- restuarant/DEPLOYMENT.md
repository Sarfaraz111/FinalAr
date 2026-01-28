# How to Deploy & Use AR

## 1. Deploying to Netlify (Free & Fast)
Since this project uses pure HTML/CSS/JS, it is static and easiest to deploy on Netlify.

1.  **Go to** [Netlify Drop](https://app.netlify.com/drop).
2.  **Drag and Drop** the entire `AR- restaurant` folder into the upload area.
3.  Wait for the upload to finish.
4.  **Done!** Netlify will give you a public URL (e.g., `https://glowing-sunshine-123456.netlify.app`).

### Deployment Fix (404 Error - GitHub Method)
If you connected Netlify to GitHub and see a 404:
1.  It is because your `index.html` is inside the `AR- restuarant` folder, not the main repository root.
2.  **Go to Netlify**:
    *   Select your site -> **Site configuration** -> **Build & deploy**.
    *   Look for **Build settings**.
    *   Click **Edit settings**.
    *   **Base directory**: Enter `AR- restuarant` (copy this exactly).
    *   **Publish directory**: Enter `AR- restuarant` (or leave blank if it defaults correctly).
    *   Click **Save**.
3.  **Trigger a new deploy**: Go to the "Deploys" tab and click "Trigger deploy" -> "Deploy site".

### Deployment Fix (404 Error - Drag & Drop Method)
If you see "Page Not Found", it means you uploaded the **Parent Folder** instead of the **Project Folder**.
- **WRONG**: Uploading `MyProjects/` (which contains `AR-restaurant/`).
- **RIGHT**: Open `AR-restaurant/`, select all files (`index.html`, `style.css`, etc.), and drag THEM to Netlify.
  OR: Drag the `AR-restaurant` folder itself directly. Ensure `index.html` is immediately inside it.

## 2. Using the AR System
This is a **WebAR** system. It relies on the phone's native AR capabilities (ARCore on Android, ARKit on iOS).

### On Mobile (Direct)
1.  Open the Netlify URL on your iPhone (Safari) or Android (Chrome).
2.  Tap on any food item card.
3.  Tap the **"View in 3D"** button.
4.  The camera will open, and you can place the burger/pizza on your real table!

### On Desktop (QR Code)
If a user opens the site on a desktop:
1.  They cannot see AR on a computer screen.
2.  You should simply print a QR Code of your Netlify URL and place it on restaurant tables.
3.  Customers scan the QR code -> Web App Opens -> They tap "View in 3D".

## Troubleshooting
-   **"Object not found"**: Ensure all `.glb` files are in the `models/` folder and names match exactly in `index.html`.
-   **"AR not working"**: AR requires HTTPS. Netlify provides this automatically. Do not test AR using `http://localhost` on a different device unless you configure port forwarding.
