const data = JSON.parse(
    localStorage.getItem("registrationData")
);


/* If there is no registration data,
   go back to the registration page */

if (!data) {

    alert("Registration data was not found. Please complete the registration again.");

    window.location.href = "register.html";

} else {

    /* SCHOOL DETAILS */

    document.getElementById("reviewSchool").textContent =
        data.school;

    document.getElementById("reviewTeacher").textContent =
        data.teacher;

    document.getElementById("reviewEmail").textContent =
        data.email;

    document.getElementById("reviewPhone").textContent =
        data.phone;


    /* EVENTS */

    const eventsContainer =
        document.getElementById("reviewEvents");

    eventsContainer.innerHTML = "";


    data.events.forEach(event => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${event.sport}</td>

            <td>${event.age}</td>

            <td>${event.quantity}</td>

            <td>
                ₹${event.amount.toLocaleString("en-IN")}
            </td>

        `;

        eventsContainer.appendChild(row);

    });


    /* TOTAL */

    document.getElementById("reviewTotal").textContent =
        `₹${data.total.toLocaleString("en-IN")}`;

}


/* BACK TO EDIT */

function goBack() {

    window.location.href =
        "register.html";

}


/* PROCEED TO PAYMENT */

function confirmRegistration() {

    const registrationId =
        "CD-" +
        new Date().getFullYear() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();


    localStorage.setItem(
        "registrationId",
        registrationId
    );


    localStorage.setItem(
        "registrationSubmitted",
        "true"
    );


    window.location.href =
        "payment.html";

}
