import * as React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled, { createGlobalStyle } from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #fff0f5;
    margin: 0;
  }
`

const BlogContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  min-height: auto;
`
const BlogTitle = styled.h2`
  color: #e278b4;
`
const PostCard = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ba0069;
  border-radius: 8px;
  background-color: #f1acc3;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }`

const PostTitle = styled.h3`
  margin-top: 0;
  color: #020202;
`
const PostCategory = styled.p`
  font-style: italic;
  font-weight: bold;
  margin: 0.2rem 0;
`
const PostPreview = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
`

const ReadMoreLink = styled.a`
  color: #d80f81;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
const IndexPage = ({ data }) => {
  const posts = data.allContentfulBlogPost.nodes

  return (
  <Layout>
    <GlobalStyle />
    <div style={{ textAlign: "center", padding: "20px" }}>
      <StaticImage
          src="../images/example.png"
          loading="eager"
          width={64}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt=""
          style={{ marginBottom: `var(--space-3)` }}
     />

        <h1>Welcome to Shay's Blog</h1>
        <h1>This site pulls blog posts from Contentful CMS.</h1>
        <h2>Feel free to explore the posts below!</h2>
      </div>

      <BlogContainer>
        <BlogTitle>Blog Posts</BlogTitle>

     {posts.map(post => (
     <PostCard key={post.slug}>
      {post.heroImage && (
        <img
        src={post.heroImage.file.url}
          alt={post.heroImage.title}
        style={{ width: "100%", borderRadius: "8px" }}
        />
  )}

 <PostTitle>{post.title}</PostTitle>
   {post.category && <PostCategory>{post.category}</PostCategory>}
    {post.description?.description && (
      <PostPreview>{post.description.description}</PostPreview>
    )}
    {post.body?.body && (
    <PostPreview>{post.body.body.substring(0, 120)}...</PostPreview>
    )}
    <p style={{ fontSize: "0.8rem", color: "#555" }}>
     {post.publishDate}
    </p>
    <Link to={`/blog/${encodeURIComponent(post.slug)}`}>
     <ReadMoreLink>Read More!</ReadMoreLink>   
    </Link>
    </PostCard>
    ))}
  </BlogContainer>
</Layout>
)
}

export const query = graphql`
  query {
    allContentfulBlogPost {
      nodes {
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
  }
`

export const Head = () => <Seo title="Home" />

export default IndexPage