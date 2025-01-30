const form = document.querySelector('#contact-form form'); 
const result = document.getElementById('result');

if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent page reload
        console.log("✅ Contact Form submit event triggered!");

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // result.innerHTML = "Please wait...";

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const data = await response.json();
            console.log("📩 Server Response:", data);

            if (response.status === 200) {
                // result.innerHTML = `<p style="color: green;">✅ Your message was sent successfully!</p>`;
                alert("✅ Your message has been successfully sent!");
            } else {
                // result.innerHTML = `<p style="color: red;">❌ ${data.message}</p>`;
                alert("❌ Your message was not sent!");

            }

        } catch (error) {
            console.log("❌ Error:", error);
            result.innerHTML = "<p style='color: red;'>Something went wrong!</p>";
        }

        // Reset form after submission
        form.reset();

        setTimeout(() => {
            result.style.display = "none";
        }, 3000);
    });
} else {
    console.log("❌ Contact form not found!");
}
