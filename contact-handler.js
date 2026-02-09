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
        const response = await fetch('https://vtjmsbamwczbxrpaowko.supabase.co/rest/v1/contact_submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0am1zYmFtd2N6YnhycGFvd2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDQwMjcsImV4cCI6MjA4NjE4MDAyN30.4J23xlPMxjwKZS8bFExua1tSsnDoXmyhtbL2AipB3OQ',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0am1zYmFtd2N6YnhycGFvd2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDQwMjcsImV4cCI6MjA4NjE4MDAyN30.4J23xlPMxjwKZS8bFExua1tSsnDoXmyhtbL2AipB3OQ',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({ name, email, message })
        })
        
        if (!response.ok) {
            const error = await response.json()
            console.error('Supabase error:', error)
            throw new Error(error.message || 'Failed to send')
        }
        
        const data = await response.json()
        console.log('Success:', data)
        
        alert('Thank you! Your message has been sent successfully.')
        form.reset()
        
    } catch (error) {
        console.error('Error:', error)
        alert('Sorry, there was an error: ' + error.message)
    } finally {
        submitButton.textContent = originalButtonText
        submitButton.disabled = false
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form')
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit)
        console.log('Form handler attached')
    }
})