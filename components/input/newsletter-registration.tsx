import React from "react";
import classes from "./newsletter-registration.module.css";
import { useRef } from "react";

function NewsletterRegistration() {
    const emailInput = useRef();
    function registrationHandler(event) {
        event.preventDefault();

        // fetch user input (state or refs)
        const email = emailInput.current.value;
        // optional: validate input
        if (email === "") {
            return;
        }
        // send valid data to API
        fetch("/api/user/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        });
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        ref={emailInput}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
