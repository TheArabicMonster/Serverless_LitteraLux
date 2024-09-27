<template>
    <div class="footer">
        <div class="section" id="follow-us">
            <p>Suivez-nous :</p>
            <div class="social-icons">
                <a href="https://www.facebook.com" aria-label="Facebook" target="_blank">
                    <img src="../assets/facebook.png" alt="Facebook">
                </a>
                <a href="https://www.twitter.com" aria-label="Twitter" target="_blank">
                    <img src="../assets/twitter.png" alt="Twitter">
                </a>
                <a href="https://www.instagram.com" aria-label="Instagram" target="_blank">
                    <img src="../assets/instagram.png" alt="Instagram">
                </a>
                <a href="https://www.linkedin.com/"aria-label="Linkedin" target="_blank">
                    <img src="../assets/linkedin.png" alt="Linkedin">
                </a>
            </div>
        </div>
        <div class="section" id="contact-us">
            <p>Contactez-nous :</p>
            <a href="mailto:mateen.khaiy@eduvaud.ch" id="email">mateen.khaiy@eduvaud.ch</a>
        </div>        
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3E6A52;
    padding: 20px;
    flex-wrap: nowrap;
    overflow-x: auto;
}

.section {
    display: flex;
    align-items: center;
    margin: 0 20px;
}

p {
    font-size: 34px;
    color: white;
    font-family: 'Roboto', sans-serif;
    margin: 0 10px 0 0;
}

a {
    font-size: 34px;
    color: white;
    font-family: 'Roboto', sans-serif;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.social-icons a {
    margin: 0 10px;
}

.social-icons img {
    width: 30px;
    height: 30px;
}

@media (max-width: 768px) {
    .footer {
        flex-direction: column;
        align-items: center;
    }

    .section {
        margin: 10px 0;
    }

    p, a {
        font-size: 24px;
    }

    .social-icons a {
        margin: 0 5px;
    }

    .social-icons img {
        width: 24px;
        height: 24px;
    }
}
</style>
