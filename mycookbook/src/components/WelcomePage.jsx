import { Link } from "react-router-dom"

/**
 * This is the welcome page component. This component displays 
 * to a user who is not logged in as the home page.
 */
export default function WelcomePage() {

    return (
        <main id="welcomePageMainElement">
            
            <img src="../../hero.jpg" alt="Hero Image" id="hero" />

            <section className="welcomePageCta">
                <h1>Welcome To MyCookbook!</h1>

                <p>Frustrated by lost online recipes or endless website ads? What about those precious handwritten recipes you want to keep safe digitally?</p>
                
                <p>MyCookbook offers a simple and elegant solution. Finally, you can effortlessly save, organize, and access all your favorite recipes in one ad-free place. From online discoveries to cherished family traditions, keep your entire culinary collection together.</p>

                <p>Ready to simplify your cooking? MyCookbook is free to use. Sign up quickly and start building your personalized digital cookbook today!</p>

                <Link to="/sign-up" className="defaultButton buttonBlue welcomePageCtaButton">Sign Up / Log In</Link>
            </section>

            <section id="welcomeCards">
                <article className="welcomePageCard">
                    <img src="../../homecard.jpg" alt="Hero Image" />
                    <div className="welcomePadding">
                        <h2>Share With Friends</h2>
                        <p>Soon, MyCookbook will let you easily print your favorite recipes or share them directly on social media. Imagine quickly sending Grandma that beloved brownie recipe as a printed card, and instantly messaging it to your brother. Sharing your culinary joy in any format will be a breeze!</p>
                    </div>
                </article>

                <article className="welcomePageCard">
                    <img src="../../homecard2.jpg" alt="Hero Image" />
                    <div className="welcomePadding">
                        <h2>Save Time</h2>
                        <p>Stop wasting minutes sifting through endless browser bookmarks or waiting for ad-heavy recipe websites to load. Tired of scrolling through lengthy narratives just to get to the ingredients? Once you discover a recipe you love, save it instantly in MyCookbook for quick and easy access, every time.</p>
                    </div>
                </article>

                <article className="welcomePageCard">
                    <img src="../../homecard3.jpg" alt="Hero Image" />
                    <div className="welcomePadding">
                        <h2>Protect Recipes You Love</h2>
                        <p>We understand the irreplaceable value of those handwritten recipes passed down through generations. Safeguard those culinary heirlooms right here in MyCookbook. By creating a digital backup, you ensure that those precious memories and flavors are protected from loss for years to come.</p>
                    </div>
                </article>
            </section>
        </main>
    )

}