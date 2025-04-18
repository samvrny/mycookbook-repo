import { Link } from "react-router-dom"

export default function WelcomePage() {

    return (
        <main id="welcomePageMainElement">
            
            <img src="../../public/hero.jpg" alt="Hero Image" id="hero" />

            <section className="welcomePageCta">
                <h1>Welcome To MyCookbook!</h1>

                <p>Hello and welcome! Were happy you are here. MyCookbook is your one stop digital solution for all your recipe saving needs. Tired of looking for a recipe you found on the web and love, but can't seem to find again? Record it and save it here! Or maybe you don't want to have to wait for all the ads to load over and over on a recipe website. Perhaps you have dozens of old (and valuable!) paper recipes written down, but want a digital copy to back them up. Or perhaps you just in general want a good place to record all your regularly used recipes in a single easy to use place. Well look no further, we are here to help!</p>

                <p>MyCookbook is free to use. Simply sign up and start saving recipes right away!</p>

                <Link to="/sign-up">Sign Up / Log In</Link>
            </section>

            <section id="welcomeCards">
                <article className="welcomePageCard">
                    <img src="../../public/homecard.jpg" alt="Hero Image" />
                    <div className="welcomePadding">
                        <h2>Share With Friends</h2>
                        <p>Mycookbook allows you to print recipes or post and share them on social media, so you can share recipes with freinds and families in multiple formats. A paper copy of the family brownie recipe for your grandma, and an IM of it for your younger brother.</p>
                    </div>
                </article>

                <article className="welcomePageCard">
                    <img src="../../public/homecard2.jpg" alt="Hero Image" />
                    <div className="welcomePadding">
                        <h2>Save Time</h2>
                        <p>Don't waste time sorting through browser bookmarks or waiting for recipe pages with loads of ads to load. And reading 5 mile long stories before even getting to the recipe? Who has the time. Once you find a recipe you love, save it here for easy access.</p>
                    </div>
                </article>

                <article className="welcomePageCard">
                    <img src="../../public/homecard3.jpg" alt="Hero Image" />
                    <div className="welcomePadding">
                        <h2>Protect Recipes You Love</h2>
                        <p>We can understand the sentimental and human value of those old recipes your grandmother has written on an old index card. Save those recipes here too, in case it happens to be lost so not to lose treasured history!</p>
                    </div>
                </article>
            </section>
        </main>
    )

}