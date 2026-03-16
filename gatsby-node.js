const path = require("path")

const blogPostTemplate = path.resolve("src/components/template/blog-post.js")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allContentfulBlogPost {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
    return
  }

  result.data.allContentfulBlogPost.nodes.forEach(post => {
    createPage({
      path: `/blog/${encodeURIComponent(post.slug)}/`,
      component: blogPostTemplate, // now points correctly
      context: {
        slug: post.slug,
      },
    })
  })
}
