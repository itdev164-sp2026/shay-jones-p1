import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../layout"
import Seo from "../seo"

// Styled components
const PostContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`

const PostTitle = styled.h1`
  color: #d63384;
`

const PostCategory = styled.p`
  font-style: italic;
  font-weight: bold;
  color: #e278b4;
`

const PostBody = styled.div`
  margin-top: 20px;
  line-height: 1.6;
  font-size: 1rem;
`

const PostTags = styled.p`
  margin-top: 30px;
  font-size: 0.9rem;
  color: #555;
`

const BlogPostTemplate = ({ data }) => {
  const post = data.contentfulBlogPost

  return (
    <Layout>
      <PostContainer>
        {post.heroImage && (
          <img
            src={post.heroImage.file.url}
            alt={post.heroImage.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}
        <PostTitle>{post.title}</PostTitle>
        {post.category && <PostCategory>{post.category}</PostCategory>}
        {post.description?.description && <p>{post.description.description}</p>}
        {post.body?.body && <PostBody>{post.body.body}</PostBody>}
        <p style={{ fontSize: "0.8rem", color: "#555" }}>{post.publishDate}</p>
        {post.tags && <PostTags>Tags: {post.tags.join(", ")}</PostTags>}
      </PostContainer>
    </Layout>
  )
}

export const Head = ({ data }) => <Seo title={data.contentfulBlogPost.title} />

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      category
      description {
        description
      }
      body {
        body
      }
      heroImage {
        file {
          url
        }
        title
      }
      publishDate(formatString: "MMMM D, YYYY")
      tags
    }
  }
`

export default BlogPostTemplate