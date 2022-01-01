module.exports = {
    services: [
        {
            name: 'dev', post: (blog) => {
                console.log(blog)
            }
        }
    ]
}