module.exports = {
    home: { url: "/" },
    about: { 
        url: "/about", 
        children: {
            about_me: { url: "/about-me" },
            resume: { url: "/resume" },
        }
    },
    contact: { url: "/contact" },
}