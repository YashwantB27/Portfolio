// contact-handler.js

async function handleContactSubmit(event) {
    event.preventDefault()

    const form = event.target
    const name = form.querySelector('[name="name"]').value
    const email = form.querySelector('[type="email"]').value
    const message = form.querySelector('[name="message"]').value

    const submitButton = form.querySelector('button[type="submit"]')
    const originalButtonText = submitButton.textContent

    submitButton.textContent = 'Sending...'
    submitButton.disabled = true

    try {
        const { data, error } = await window.supabaseClient
            .from('contact_submissions')
            .insert([{ name, email, message }])
            .select()

        if (error) throw error

        alert('Thank you! Your message has been sent successfully.')
        form.reset()

    } catch (error) {
        console.error('Error:', error)
        alert('Sorry, there was an error. Please try again.')
    } finally {
        submitButton.textContent = originalButtonText
        submitButton.disabled = false
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('form')
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit)
    }
})