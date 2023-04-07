import React, { useContext } from "react";
import classes from "./newsletter-registration.module.css";
import { useRef } from "react";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
    const emailInput = useRef();
    const notificationCtx = useContext(NotificationContext);

    function registrationHandler(event) {
        event.preventDefault();
        notificationCtx.showNotification({
            title: "Signing Up",
            message: "Register for newsletter",
            status: "pending",
        });
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
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then((data) => {
                    throw new Error(data.message || "Something went wrong");
                });
            })
            .then((data) => {
                notificationCtx.showNotification({
                    title: "Success!",
                    message: "Successfully registered for newsletter",
                    status: "success",
                });
            })
            .catch((error) => {
                notificationCtx.showNotification({
                    title: "Error!",
                    message: error.message || "Something went wrong",
                    status: "error",
                });
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
